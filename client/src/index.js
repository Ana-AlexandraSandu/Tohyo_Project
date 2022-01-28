import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import io from "socket.io-client";

/*document.body.style.backgroundImage = "url('samurai_background.png')";*/
document.body.style.backgroundColor = "success.main";
document.body.style.backgroundSize = "cover";
document.body.style.width = '100vw';
document.body.style.height = '100vh';
let socket = io.connect("http://localhost:3001");

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

export default socket;
