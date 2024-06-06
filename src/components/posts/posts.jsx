import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=40")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="posts">
        <h1>POSTS</h1>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="btn btn-primary"
          >
            Previous
          </button>
          <span className="mx-2">
            Page {currentPage} of {Math.ceil(posts.length / postsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
