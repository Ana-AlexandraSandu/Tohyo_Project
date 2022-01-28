import {Box, Paper, Typography} from "@mui/material";
import React from "react";


const Cards = (props) =>{
    const {number} = props;
    const handleClick = () =>{
        console.log("Heei");
    }
    return (
        <Paper elevation={3} onClick={() => handleClick()}>
            <Typography sx={{fontSize: '35px', textAlign: "center"} } >{number}</Typography>
        </Paper>
    );
}
export default Cards;