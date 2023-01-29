import React, { useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({setIsAuth}) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null)

    const signUp = () => {
        Axios.post("http://localhost:3001/signup", user).then((res) => {
            const { token, userId, YourName, Username, Email, hashedPassword } = res.data;

            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("Username", Username);
            cookies.set("YourName", YourName);
            cookies.set("Email", Email);
            cookies.set("hashedPassword", hashedPassword);
            setIsAuth(true);
        });
    };

  return (
    <div className="SignUp">
        <label>Create account</label>
        <input placeholder='Type your name here' onChange={(event) => {
            setUser({...user, YourName: event.target.value });
        }}
        />
        <input placeholder='Type your username here' onChange={(event) => {
            setUser({...user, Username: event.target.value });
        }}/>
        <input placeholder='Type your email here' onChange={(event) => {
            setUser({...user, Email: event.target.value });
        }}/>
        <input placeholder='Type your password here' onChange={(event) => {
            setUser({...user, Password: event.target.value });
        }}/>

        <button onClick={signUp}>Register</button>

    </div>
  )
}

export default SignUp;