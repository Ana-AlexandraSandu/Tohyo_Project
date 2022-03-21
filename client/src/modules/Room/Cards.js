import { Paper, Typography} from "@mui/material";
import React from "react";


const Cards = (props) =>{
    const {number, sendMessage, setCurrentMessage} = props;
    const handleClick = () =>{
        setCurrentMessage(number);
        sendMessage();
    }
    return (
        <Paper elevation={3} onClick={() => handleClick()}>
            <Typography sx={{fontSize: '35px', textAlign: "center"} } >{number}</Typography>
        </Paper>
    );
}
export default Cards;