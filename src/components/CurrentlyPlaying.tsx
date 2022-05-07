import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
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
    padding:" 0.5rem 0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const orderStyle = {
    background:"#1F2B8F",
    width:"fit-content",
    height:"fit-content",
    padding:"0.5rem",
    margin:"0 0.5rem 0 0",
    color:"#fff",
    borderRadius:"20px",
}

const CurrentlyPlaying: React.FC<{}> = () => {
    return ( 
        <Box sx={containerStyle}>
            <Box sx={flexStyle}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "begin",
                }}>
                    <Typography sx={{ ...orderStyle, fontWeight:"bold"}}  variant="h4">01</Typography>
                </Box>
                <Box>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4">Hold mde Closer</Typography>
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
export default CurrentlyPlaying;