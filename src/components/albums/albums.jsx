
import React, { useEffect, useState } from "react";
import axios from "axios";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage, setAlbumsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums?_limit=40")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the albums!", error);
      });
  }, []);

 
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(albums.length / albumsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAlbumsPerPageChange = (event) => {
    setAlbumsPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(albums.length / albumsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h1>ALBUMS</h1>
      <div className="mb-3">
        <label htmlFor="albumsPerPage" className="form-label">Albums per page:</label>
        <select
          id="albumsPerPage"
          className="form-select"
          value={albumsPerPage}
          onChange={handleAlbumsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="todos">
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {currentAlbums.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-primary">
            Previous
          </button>
          <span className="mx-2">
            Page {currentPage} of {pageNumbers.length}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === pageNumbers.length} className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Albums;
