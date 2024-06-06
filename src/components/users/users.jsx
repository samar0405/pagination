// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
//       console.log(response);
//       setUsers(response.data);
//     });
//   });
//   return (
//     <div className="users">
//       <h1>USERS</h1>
//       <table className="table table-bordered table-hover table-striped">
//         <thead>
//           <tr>
//             <th>T/R</th>
//             <th>Name</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Address zipcode</th>
//             <th>Address suite</th>
//             <th>Address city</th>
//             <th>Address street</th>
//             <th>Address geo lat</th>
//             <th>Address geo lng</th>
//             <th>phone</th>
//             <th>website</th>
//             <th>Company name</th>
//             <th>Company catchPhrase</th>
//             <th>Company bs</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((item, index) => (
//             <tr key={index}>
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.username}</td>
//               <td>{item.email}</td>
//               <td>{item.address.zipcode}</td>
//               <td>{item.address.suite}</td>
//               <td>{item.address.city}</td>
//               <td>{item.address.street}</td>
//               <td>{item.address.geo.lat}</td>
//               <td>{item.address.geo.lng}</td>
//               <td>{item.phone}</td>
//               <td>{item.website}</td>
//               <td>{item.company.name}</td>
//               <td>{item.company.catchPhrase}</td>
//               <td>{item.company.bs}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;
import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  // Calculate the indexes of the first and last user to be displayed
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="users">
      <h1>USERS</h1>
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>T/R</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address zipcode</th>
            <th>Address suite</th>
            <th>Address city</th>
            <th>Address street</th>
            <th>Address geo lat</th>
            <th>Address geo lng</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company name</th>
            <th>Company catchPhrase</th>
            <th>Company bs</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.address.zipcode}</td>
              <td>{item.address.suite}</td>
              <td>{item.address.city}</td>
              <td>{item.address.street}</td>
              <td>{item.address.geo.lat}</td>
              <td>{item.address.geo.lng}</td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
              <td>{item.company.name}</td>
              <td>{item.company.catchPhrase}</td>
              <td>{item.company.bs}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;

