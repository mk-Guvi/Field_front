import React from "react";
import { BrowserRouter, Switch, Route,useHistory } from "react-router-dom";
import Alumini from "./components/Alumini";
import AluminiRoute from "./components/AluminiRoutes";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoutes";
import Signup from "./components/Signup";
import Student from "./components/Student";

function App() {
 
  return (
    <BrowserRouter>
      <Switch>
<PrivateRoute path="/student" exact component={Student}/>
       <AluminiRoute path="/alumini" exact component={Alumini}/>
        <Route path="/"exact component={Login} />
        
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
