import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { signup } from "./helper";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",

    error: "",
    loading: false,
    success: false,
  });

  const { name, email, password, error, success, loading } = values;
  //As you know isAuthenticated returns an jwt object. we are storing it in a var

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({ name, email, password })
      .then((data) => {
        //data.errors-its from backend
        if (data.errors) {
          setValues({
            ...values,
            error: data.errors,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",

            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch((e) => console.log(e, "Error in signup"));
  };
  const signupform = () => {
    return (
      <div className="container mt-5 mw-25 border ">
        <h1 className="mt-3 mb-3">Signup</h1>
        {successMessage()}
        {errorMessage()}
        <form>
          <div className="form-group">
            <label htmlFor="fname">Name</label>
            <input
              value={name}
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              id="fname"
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              onChange={handleChange("email")}
              value={email}
              type="email"
              className="form-control"
              required
              id="email"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>

          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-secondary mb-5"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div className="row ">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success w-100"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/login">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger w-100"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />

      {signupform()}
    </div>
  );
}

export default Signup;
