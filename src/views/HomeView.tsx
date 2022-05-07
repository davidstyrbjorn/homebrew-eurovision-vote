import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


const boxStyle ={
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}

const flexStyle ={
    display: "flex",
}

const containerStyle = {
    borderRadius: "20px",
    backgroundColor: "#fafafa",
    margin:"1rem 0.5rem",
    padding:" 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const addedButtonStyle = {
    width:"100%",
    margin:"0.5rem 0",
}
const orderStyle = {
    display: "inline-block",
    background:"#1F2B8F",
    
}

const CurrentlyPlaying: React.FC<{}> = () => {
    return ( 
        <Box sx={containerStyle}>
            <Box sx={flexStyle}>
                <Box>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4"><span style={orderStyle}>01</span>Hold mde Closer</Typography>
                    <Typography variant="subtitle2"> Sweden</Typography>
                    <Typography variant="subtitle2">Julia Jacobs</Typography>
                </Box>
            </Box>

            <Box sx={{
                marginTop:"1rem",
                padding:"1rem",
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Box sx={boxStyle}>
                    <Typography>Star</Typography> 
                    <Typography>Rating</Typography> 
                </Box>    
                <Box sx={{

                }}>
                    <Typography>What would you rate this entry?</Typography> 
                    <Slider
                        aria-label="Vote"
                        defaultValue={5}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                        />
                </Box>    
            </Box>
            

        </Box>
     );
}

const LoginWindow: React.FC<{}> = () => {
    return ( 
        <Box sx={containerStyle}>
            <Typography variant="h5" sx={{ fontWeight:'bold'}}>Welcome to Euro</Typography>
            <Typography variant="subtitle1">Please enter a username to continue</Typography>
            <TextField  sx={addedButtonStyle} id="outlined-basic"label="Username" variant="outlined" required/>
            <Button     sx={addedButtonStyle} variant="contained">SIGN ME IN</Button>
        </Box>
     );
}




const HomeView: React.FC<{}> = () => {
    return ( 
        <LoginWindow />
        
     );
}

export default HomeView;