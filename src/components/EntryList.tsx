import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdStar } from "react-icons/md";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { Participant } from "../types";
import {toStringWithZeroPadding } from "../utility";

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

type EntryProps = {
    participant: Participant
}

const Entry: React.FC<EntryProps> = ({participant}) => {
    return(
        <Box sx={{...containerStyle , flexDirection:"row", justifyContent:"space-between"}}>
            <Box sx={{...flexStyle}}>
                <Box sx={ orderStyle }>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4">{ toStringWithZeroPadding(participant.order) }</Typography>
                </Box>
                <Box sx={boxStyle}>
                    <Typography sx ={{color: "green", fontWeight:"bold", margin:"0", lineHeight: "1",}}variant="subtitle1">{participant.country}</Typography>
                    <Typography sx={{ fontWeight:"bold", lineHeight: "1",}} variant="h6">{participant.title}</Typography>
                    <Typography sx={{  lineHeight: "1",}} variant="subtitle1">{participant.artist}</Typography>
                </Box>
            </Box>

            <Box sx={{...boxStyle, }}>
                <Typography variant="h5" color="#E6A600" display={"flex"} sx={{ fontWeight:"bold", padding:"0 1rem", alignItems:"center"}}><MdStar/>10</Typography>
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
    const { participants } = useContext(ParticipantContext);

    return(
        <>
            {participants.map((participant: Participant) => {
                return <Entry participant={participant} />
            }, [])}
        </>
    )
}

export default EntryList;