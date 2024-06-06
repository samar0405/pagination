import "./login.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault;
    const { username, password } = form;
    if (username === "Samariddin" && password === "samar0405") {
      navigate("/main");
    } else {
      alert("404");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-6 offset-3">
            <div className="card">
              <div className="card-header">
                <h1 className="text-center">Login</h1>
              </div>
              <div className="card-body">
                <form id="submit" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="username"
                    className="form-control my-2"
                    name="username"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="password"
                    className="form-control my-2"
                    name="password"
                    onChange={handleChange}
                  />
                </form>
              </div>
              <div className="card-footer">
                <button
                  type="submit"
                  form="submit"
                  className="btn btn-success"
                  onSubmit={handleSubmit}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
