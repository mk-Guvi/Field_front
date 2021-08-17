import React, { useState } from "react";
import Navbar from "./Navbar";
import { Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated,isAlumini } from './helper'

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    didRedirect: false,
  })

  const { email, password, error, loading, didRedirect } = values
  //As you know isAuthenticated returns an jwt object. we are storing it in a var
  

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    )
  }
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    )
  }
  const onSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, error: false, loading: true })
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false })
        } else {
       

          authenticate(data, () => {
            setValues({ ...values, didRedirect: true })
          })
        }
      })
      .catch((e) => console.log(e))
  }
  const performRedirect = () => {
    if (didRedirect) {
      if (isAuthenticated()&&isAlumini()) {
        return <Redirect to="/alumini" />
      }
      else if(isAuthenticated()){
        return <Redirect to="/student" />
      }
    }
  
  }


  const loginform=()=>{
    return(
      <div className="container mt-5 mw-25 border ">
      <h1 className="mt-3 mb-3">Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={handleChange('email')}
            value={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
          value={password}
          onChange={handleChange('password')}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        {loading ? (
        <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
        ) : (
          <button type="submit" onClick={onSubmit} className="btn btn-secondary mb-5">
          Submit
        </button>
        )}
    
        {loadingMessage()}
      </form>
    </div>

    )
  }
  if (isAuthenticated()&&isAlumini()) {
    return <Redirect to="/alumini" />
  }
  else if(isAuthenticated()){
    return <Redirect to="/student" />
  }
  else{
    return (
      <div>
        <Navbar />
        
        {errorMessage()}
        {loginform()}
        {performRedirect()}
      </div>
    );
  }

}

export default Login;
