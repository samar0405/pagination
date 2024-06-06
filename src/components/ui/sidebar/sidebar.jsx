import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/main" className="navlink" activeClassName="active">
        Cars
      </NavLink>
      <NavLink to="/main/users" className="navlink" activeClassName="active">
        Users
      </NavLink>
      <NavLink to="/main/todos" className="navlink" activeClassName="active">
        Todos
      </NavLink>
      <NavLink to="/main/photos" className="navlink" activeClassName="active">
        Photos
      </NavLink>
      <NavLink to="/main/albums" className="navlink" activeClassName="active">
        Albums
      </NavLink>
      <NavLink to="/main/posts" className="navlink" activeClassName="active">
        Posts
      </NavLink>
      <NavLink to="/main/comments" className="navlink" activeClassName="active">
        Comments
      </NavLink>
      <NavLink to="/" className="navlink" activeClassName="active">
        Log out
      </NavLink>
    </div>
  );
};

export default Sidebar;
