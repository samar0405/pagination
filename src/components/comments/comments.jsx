// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Comments = () => {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/comments?_limit=50")
//       .then((response) => {
//         console.log(response);
//         setComments(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the todos!", error);
//       });
//   }, []);

//   return (
//     <div className="container mt-5">
//       <div className="todos">
//         <h1>COMMENTS</h1>
//         <table className="table table-bordered table-hover table-striped">
//           <thead>
//             <tr>
//               <th>T/R</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Body</th>
//             </tr>
//           </thead>
//           <tbody>
//             {comments.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{item.body}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Comments;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments?_limit=50")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the comments!", error);
      });
  }, []);

  // Calculate the indexes of the first and last comment to be displayed
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle next and previous buttons
  const handleNextPage = () => {
    if (currentPage < Math.ceil(comments.length / commentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle change in number of items per page
  const handleCommentsPerPageChange = (event) => {
    setCommentsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h1>COMMENTS</h1>
      <div className="mb-3">
        <label htmlFor="commentsPerPage" className="form-label">Comments per page:</label>
        <select
          id="commentsPerPage"
          className="form-select"
          value={commentsPerPage}
          onChange={handleCommentsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="comments">
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Name</th>
              <th>Email</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {currentComments.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.body}</td>
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

export default Comments;
