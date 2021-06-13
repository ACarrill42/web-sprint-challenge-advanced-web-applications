import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import "./styles.scss";
import { axiosWithAuth } from "./helpers/axiosWithAuth";

function App() {
  const logout = () => {
    axiosWithAuth().post('/login')
    .then(res => {
      localStorage.removeItem('token')
      window.location.href = '/login'
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#">logout</a>
        </header> 
        <Switch>
          <PrivateRoute exact path = "/BubblePage" component = {BubblePage}/>
          <Route exact path="/" component={Login} />          
        </Switch>

      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.