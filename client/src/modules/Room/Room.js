import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import socket from "../../index";
import {Box, Paper, Typography} from "@mui/material";
import Cards from "./Cards";
import CoffeeIcon from '@mui/icons-material/Coffee';

const Room = ({room, username }) =>{
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    //const socket = io.connect("http://localhost:3001");
    console.log(room);
    console.log(username);
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);
    const handleSelectCard = () =>{

    }


    /* return (
         <div className="chat-window">
             <div className="chat-header">
                 <p>Live Chat</p>
             </div>
             <div className="chat-body">
                     {messageList.map((messageContent) => {
                         return (
                             <div key={messageContent.id}
                                 className="message"
                                 id={username === messageContent.author ? "you" : "other"}
                             >
                                 <div>
                                     <div className="message-content">
                                         <p>{messageContent.message}</p>
                                     </div>
                                     <div className="message-meta">
                                         <p id="time">{messageContent.time}</p>
                                         <p id="author">{messageContent.author}</p>
                                     </div>
                                 </div>
                             </div>
                         );
                     })}
             </div>
             <div className="chat-footer">
                 <input
                     type="text"
                     value={currentMessage}
                     placeholder="Hey..."
                     onChange={(event) => {
                         setCurrentMessage(event.target.value);
                     }}
                     onKeyPress={(event) => {
                         event.key === "Enter" && sendMessage();
                     }}
                 />
                 <button onClick={sendMessage}>&#9658;</button>
             </div>
         </div>
     );*/
    return (
        <>
            <Typography variant="h3" component="h3" margin={'10px'} align={"center"}>
                Tohyo
            </Typography>
            <Typography variant="h6" component="h3" margin={'10px'} mb={4} align={"center"}>
                Room: {room}
            </Typography>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': {
                    m: 1,
                    width: 60,
                    height: 90,
                },
            }}>
                <Cards number={1} onClick={handleSelectCard}/>
                <Cards number={2} onClick={handleSelectCard}/>
                <Cards number={3} onClick={handleSelectCard}/>
                <Cards number={5} onClick={handleSelectCard}/>
                <Cards number={8} onClick={handleSelectCard}/>
                <Cards number={13} onClick={handleSelectCard}/>
                <Cards number={20} onClick={handleSelectCard}/>
                <Cards number={40} onClick={handleSelectCard}/>
                <Cards number={100} onClick={handleSelectCard}/>
                <Cards number={'?'} onClick={handleSelectCard}/>
                <Cards number={<CoffeeIcon/>} onClick={handleSelectCard}/>
            </Box>
            <Box>
                <Typography>{username}</Typography>
            </Box>
        </>
    );
}

export default Room;