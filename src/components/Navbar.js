import React from "react";
import { Link ,useHistory} from "react-router-dom";
import { signout,isAuthenticated } from "./helper";

function Navbar() {
const history=useHistory()
  
  return (
    <>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <h5 className="text-light mr-3 mt-2">
         Alumini Scheduler
        </h5>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
          {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              
              className="nav-link"
              to="/"
            >
              Login
              </Link>
          </li>
        </>
      )}
           {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link btn text-danger"
            onClick={() => {
              signout(() => {
                //since we have a next() in signout() we can use callback function to redirect them to new page
                history.push(`/`)
              })
            }}
          >
            Signout
          </span>
        </li>
      )}
          
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
