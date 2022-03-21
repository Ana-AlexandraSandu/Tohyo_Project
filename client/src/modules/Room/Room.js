import React, { useEffect, useState } from "react";
import socket from "../../index";
import {Box, Typography} from "@mui/material";
import Cards from "./Cards";
import CoffeeIcon from '@mui/icons-material/Coffee';

const Room = ({room, username }) =>{
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    //const socket = io.connect("http://localhost:3001");
    console.log(room);
    console.log(username);
    const sendMessage = async () => {
        console.log(currentMessage);
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
    const handleSelectCard = (message) =>{
        setCurrentMessage(message);
        sendMessage();
    }
console.log(messageList);
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
                <Cards number={1} sendMessage={sendMessage} setCurrentMessage={setCurrentMessage}/>
                <Cards number={2} sendMessage={sendMessage} setCurrentMessage={setCurrentMessage}/>
                <Cards number={3} sendMessage={sendMessage} setCurrentMessage={setCurrentMessage}/>
                <Cards number={5} sendMessage={sendMessage} setCurrentMessage={setCurrentMessage}/>
                <Cards number={8} sendMessage={sendMessage} setCurrentMessage={setCurrentMessage}/>
                <Cards number={13} sendMessage={sendMessage} setCurrentMessage={setCurrentMessage}/>
                <Cards number={20} sendMessage={sendMessage} setCurrentMessage={setCurrentMessage}/>
                <Cards number={40} sendMessage={sendMessage} setCurrentMessage={setCurrentMessage}/>
                <Cards number={100} sendMessage={sendMessage} setCurrentMessage={setCurrentMessage}/>
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