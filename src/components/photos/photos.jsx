
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./photos.css";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 4; 

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?_limit=20")
      .then((response) => {
        setPhotos(response.data);
      });
  }, []);

  
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(photos.length / photosPerPage); i++) {
    pageNumbers.push(i);
  }

  let cards = currentPhotos?.map((el) => (
    <div key={el.id} className="col-md-4 mb-4">
      <div className="foto card h-100">
        <img src={el.thumbnailUrl} className="card-img-top" alt={el.title} />
        <div className="card-body">
          <h5 className="card-title">{el.title}</h5>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <h1>PHOTOS</h1>
      <div className="row mt-2">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Photos</h1>
            </div>
            <div className="card-body">
              <div className="row">{cards}</div>
            </div>
            <div className="card-footer">
              <nav>
                <ul className="pagination justify-content-center">
                  {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                      <button onClick={() => paginate(number)} className="page-link">
                        {number}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photos;
