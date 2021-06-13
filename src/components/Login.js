import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState({
    credentials: {
      username: '',
      password: ''
    },
    error: ''
  });
  let history = useHistory();

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth().post('/login', state.credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      history.push('/BubblePage')
    })
    .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  // const error = "";
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Log in Here!</h2>
        <form onSubmit = {login}>
          <input 
            type = 'text'
            data-testid = 'username'
            name = 'username'
            value = {state.credentials.username}
            onChange = {handleChange}
          />
          <input 
            type = 'text'
            datatest-id = 'password'
            name = 'password'
            value = {state.credentials.password}
            onChange = {handleChange}
          />
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{state.error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.