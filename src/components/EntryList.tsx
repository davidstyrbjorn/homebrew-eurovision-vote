import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdStar } from "react-icons/md";

const flexStyle ={
    display: "flex",
}

const boxStyle ={
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const containerStyle = {
    borderRadius: "20px",
    backgroundColor: "#fafafa",
    margin:"1rem 0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const orderStyle = {
    height: "100p%",
    display: "flex",
    background: "#1F2B8F",
    flexDirection: "column",
    justifyContent: "center",
    padding:"1rem",
    margin:"0 0.5rem 0 0",
    color:"white",
    borderRadius: "18px",
    
    }

    type Entry = {
        title: string;
        artist: string;
        country: string;
    }

const Entry: React.FC<Entry> = ({title, artist, country}) => {

    
    
    return(
        <Box sx={containerStyle}>
            <Box sx={{...flexStyle}}>
                <Box sx={ orderStyle }>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4">01</Typography>
                </Box>
                <Box sx={boxStyle}>
                    <Typography sx ={{color: "green", fontWeight:"bold", margin:"0", lineHeight: "1",}}variant="subtitle1"> Sweden</Typography>
                    <Typography sx={{ fontWeight:"bold", lineHeight: "1",}} variant="h6">Hold me closer</Typography>
                    <Typography sx={{  lineHeight: "1",}} variant="subtitle1">By Julia Jacobs</Typography>
                </Box>
            </Box>
        </Box>
    )
}


const mockData = [
    {
    "title": "Hold me closer",
    "artist": "Julia Jacobs",
    "country": "Sweden",
    }
]

const EntryList: React.FC<{}> = () => {

    const [entries, setEntries] = useState(mockData);
    return(
        <>
            {entries.map((entry) => (
                <Entry />
            ))}   
        </>
    )
}

export default EntryList;