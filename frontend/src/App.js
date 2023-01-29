
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { StreamChat} from "stream-chat";
import {Chat} from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from 'react';
import JoinGame from "./components/JoinGame";


function App() {
  const api_key = "4dkbmnz7jrem";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      YourName: cookies.get('YourName'),
      Email: cookies.get("Email"),
      hashedPassword: cookies.get("hashedPassword")
    },
    token
    ).then((user) => {
      setIsAuth(true);
    });
  }



  return (
    <div className="App">
      {isAuth ? (
      <Chat client={client}>
      <JoinGame/>
      </Chat>) : (
        <>
      <SignUp setIsAuth ={setIsAuth} />
      <Login setIsAuth ={setIsAuth} />
      </>
      )}
    </div>
  );
}

export default App;
