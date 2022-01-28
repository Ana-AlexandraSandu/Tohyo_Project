
import './App.css';
import theme from "./commons/themes";
import Home from "./modules/Home/Home";
import Room from "./modules/Room/Room";
import {ThemeProvider} from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import {BrowserRouter} from "react-router-dom";
import {useState} from "react";
import io from "socket.io-client";
import React from 'react'

function App(defaultValue)
{const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const handleRoom = (roomSelect, username) =>{
    setRoom(roomSelect);
    setUsername(username);
  }
  const SocketContext = React.createContext(defaultValue);

  return <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<Room room={room} username={username}/>}
               path={'/room/:name'}
               component={Room}
        />
        <Route element={<Home handleRoom={handleRoom}/>}
               path={'/'}
               component={Home}
        />
      </ Routes>
    </BrowserRouter>
  </ThemeProvider>;

}

export default App;
