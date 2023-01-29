import React, { useState } from 'react';
import Axios from "axios";
import Cookies from 'universal-cookie';

function Login({setIsAuth}) {
    
    const [username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const cookies = new Cookies();
    const Login = () => {
      Axios.post('http://localhost:3001/login', {
        username, Password,}).then((res) => {
          const {YourName, Email, username, token, userId } = res.data;
          cookies.set("token", token);
          cookies.set("userId", userId);
          cookies.set("username", username);
          cookies.set("YourName", YourName);
          cookies.set("Email", Email);
          setIsAuth(true);
        });
    };

  return (
    <div className="Login">
        <label>Login</label>

        <input placeholder='Type your username here' onChange={(event) => {
            setUsername(event.target.value);
        }}/>

        <input placeholder='Type your password here' onChange={(event) => {
            setPassword(event.target.value);
        }}/>

        <button onClick={Login}>Login</button>

    </div>
  )
}

export default Login;