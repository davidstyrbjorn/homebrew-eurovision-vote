import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdStar } from "react-icons/md";

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
    padding:" 1rem 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const orderStyle = {
    height: "100p%",
    display: "flex",
    borderRight: "6px solid #1F2B8F",
    flexDirection: "column",
    justifyContent: "center",
    padding:"0.5rem",
    margin:"0 0.5rem 0 0",
    }

const CurrentlyPlaying: React.FC<{}> = () => {
    const [stars, setStars] = useState(0);



    return ( 
        <Box sx={containerStyle}>
            <Box sx={{...flexStyle}}>
                <Box sx={ orderStyle }>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4">01</Typography>
                </Box>
                <Box>
                    <Typography sx ={{color: "green", fontWeight:"bold"}}variant="h5"> Sweden</Typography>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4">Hold me closer</Typography>
                    <Typography variant="subtitle1">By Julia Jacobs</Typography>
                </Box>
            </Box>
            <Box sx={{
                borderRadius: "20px",
                backgroundColor: "white",
                border: "2px solid silver",
                marginTop:"1rem",
                padding:"0.5rem",
            }}>
            <Typography variant="subtitle1" sx={{
                textAlign:"center",
            }}>What did you think about this entry?</Typography>
                <Box sx={flexStyle}>
                
                    <Typography variant="h4" color="#E6A600" display={"flex"} sx={{ fontWeight:"bold"}} width="120px"><MdStar/>{stars}</Typography>
                    <Slider 
                        sx={{
                            margin:"0 1rem",
                            color:"#E6A600",
                        }}
                        onChange={(event: any) => setStars(event.target.value)}
                        value={stars}
                        aria-label="Vote"
                        defaultValue={5}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(x) => x + " stars"}
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