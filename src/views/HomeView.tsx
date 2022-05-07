import { Button, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


const containerStyle = {
    borderRadius: "10px",
    backgroundColor: "#fafafa",
    margin:"2rem 1rem",
    padding:"1rem",
    display: "flex",
    flexDirection: "column",
    
    justifyContent: "center",
}

const addedButtonStyle = {
    width:"100%",
    margin:"0.5rem 0",
}

const LoginWindow: React.FC<{}> = () => {
    return ( 
        <Box sx={containerStyle}>
            <Typography variant="h5" sx={{ fontWeight:'bold'}}>Welcome to Euro</Typography>
            <Typography variant="subtitle1">Please enter a username to continue</Typography>
            <TextField  style={addedButtonStyle} id="outlined-basic"label="Username" variant="outlined" required/>
            <Button     style={addedButtonStyle} variant="contained">SIGN ME IN</Button>
        </Box>
     );
}

const CurrentlyPlating: React.FC<{}> = () => {
    return ( 
        <Box sx={containerStyle}>
            <Typography variant="h5" sx={{ fontWeight:'bold'}}>Welcome to Euro</Typography>
            <Typography variant="subtitle1">Please enter a username to continue</Typography>
            <TextField  style={addedButtonStyle} id="outlined-basic"label="Username" variant="outlined" required/>
            <Button     style={addedButtonStyle} variant="contained">SIGN ME IN</Button>
        </Box>
     );
}

const HomeView: React.FC<{}> = () => {
    return ( 
        <LoginWindow />
     );
}

export default HomeView;