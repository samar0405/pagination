
import React, { useEffect, useState } from "react";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=50")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos!", error);
      });
  }, []);

  
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const handleNextPage = () => {
    if (currentPage < Math.ceil(todos.length / todosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  const handleTodosPerPageChange = (event) => {
    setTodosPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h1>TODOS</h1>
      <div className="mb-3">
        <label htmlFor="todosPerPage" className="form-label">Todos per page:</label>
        <select
          id="todosPerPage"
          className="form-select"
          value={todosPerPage}
          onChange={handleTodosPerPageChange}
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
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {currentTodos.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.completed ? "Yes" : "No"}</td>
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

export default Todos;
