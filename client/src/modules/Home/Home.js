import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import io from 'socket.io-client';
import Room from "../Room/Room";
import React from 'react';
import {Notify} from "notiflix";
import { useNavigate } from 'react-router-dom'
import socket from "../../index";

const Home = (props) =>
{
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const {handleRoom} = props;
    const [newRoom, setNewRoom] = useState(false);

    //ToDO de facut un array pentru a retine camerele in front si petru a le sterge dupa ce nimeni nu mai este prezent

    const joinRoom = () => {
        //if(!activeRooms.includes(room)){
        Notify.failure('Camera nu exista!');
        // }else {
        socket.emit("join_room", room)
        return navigate('/room/' + room);
        //}


    }
    const createRoom = () => {
        //if(!activeRooms.includes(room)){
        // setShowRoom(true);
        //socket.emit("join_room", room)
        //for (let i = 0; i < socket.roomsNumber.length; i++)
        //{
        // let room = socket.roomsNumber[i];
        //if (values.indexOf(room[1]) === -1) values.push(room[1]);
        //console.log(socket.id);
        // }

        socket.emit("join_room", room);
        handleRoom(room, username);
        return navigate('/room/' + room);
        // }else {
        // Notify.failure('Camera este deja existenta!');
        //}
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 4,
        minWidth: '900px',
        maxHeight: '1300px',
        opacity: 0.8,
    };
    return(
        <>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItem={"center"}
            >
                <Paper elevation={0}
                       sx={style}

                >
                    <Typography variant="h3" component="h3" margin={'10px'} align={"center"}>
                        Tohyo HOME
                    </Typography>
                    <Stack display="flex" justifyContent="center" marginTop={'50px'} spacing={2} direction="row">
                        <TextField id="filled-size-small" label="Name" variant="outlined" size="small" onChange={(event)=> {setUsername(event.target.value)}}/>
                        <TextField id="filled-size-small" label="Room name" variant="outlined" size="small" onChange={(event)=> {setRoom(event.target.value)}}/>
                        <Button variant="outlined" size={"large"} onClick={joinRoom}>Join room</Button>
                    </Stack>
                    <Stack display="flex" justifyContent="center" marginTop={'50px'} spacing={2} direction="row">
                        <TextField id="filled-size-small" label="Name" variant="outlined" size="small" onChange={(event)=> {setUsername(event.target.value)}}/>
                        <TextField id="filled-size-small" label="New room" variant="outlined" size="small" onChange={(event)=> {setRoom(event.target.value)}}/>
                        <Button onClick={createRoom} variant="outlined" size={"large"}>Create room</Button>
                    </Stack>
                </Paper>
            </Box>
        </>)
};
export default Home;