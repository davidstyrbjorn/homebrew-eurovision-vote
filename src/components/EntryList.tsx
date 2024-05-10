import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography, Modal, Divider, colors } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdStar } from "react-icons/md";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { Participant } from "../types";
import {toStringWithZeroPadding } from "../utility";
import CurrentlyPlaying from "./CurrentlyPlaying";

const flexStyle ={
    display: "flex",
}

const boxStyle ={
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const starsStyle = {
    
}

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
   
    
}
const orderContainerStyle = {
    color: "white",
    background: "url(/eurovision.gif)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
}

const bgGradient1 = 
{
    background: "linear-gradient(90deg, rgba(101,42,179,1) 0%, rgba(254,71,222,1) 20%, rgba(101,42,179,1) 100%)",  
}
const bgGradient2 = 
{
    background: "linear-gradient(90deg, rgba(101,42,179,1) 0%, rgba(254,71,222,1) 35%, rgba(101,42,179,1) 100%)",  
}
const bgGradient3 = 
{
    background: "linear-gradient(90deg, rgba(101,42,179,1) 0%, rgba(254,71,222,1) 50%, rgba(101,42,179,1) 100%)",  
}
const bgGradient4 = 
{
    background: "linear-gradient(90deg, rgba(101,42,179,1) 0%, rgba(254,71,222,1) 65%, rgba(101,42,179,1) 100%)",  
}
const bgGradient5 = 
{
    background: "linear-gradient(90deg, rgba(101,42,179,1) 0%, rgba(254,71,222,1) 80%, rgba(101,42,179,1) 100%)",  
}

const orderStyle = {
    background: "rgba(0,0,0,0.1)",
    marginRight: "1rem",
}

const textStyle = {
    background: "linear-gradient(211deg, rgba(223,29,197,1) 0%, rgba(255,233,70,1) 7%, rgba(241,52,226,1) 68%, rgba(223,131,29,1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

const gradientList = [bgGradient1, bgGradient2, bgGradient3, bgGradient4, bgGradient5, bgGradient4, bgGradient3, bgGradient2];

type EntryProps = {
    participant: Participant,
    id: number
}

const Entry: React.FC<EntryProps> = ({participant, id}) => {
    const { user, setUser } = useContext(UserContext);
    const { setSelectedParticipant } = useContext(ParticipantContext);

    useEffect(() => {
        // Check if the user has voted for this country
        if(user && !user.votes.has(participant.country)){
            // Copy map, add, and set state
            const copy = new Map(user.votes);
            copy.set(participant.country, 5);
            setUser({...user, votes: copy});
        }
    }, []);
    
    const onEntryPress = () => {
        setSelectedParticipant(participant);
        console.log(id);
    }
    
    return(
        <Box sx={{...containerStyle, ...gradientList[id%gradientList.length], flexDirection:"row", justifyContent:"space-between"}} 
            onClick={() => onEntryPress()}
        >
            <Box sx={{...flexStyle}}>
                <Box sx={orderStyle}>
                <Box sx={orderContainerStyle}>
                    <Box>
                        <Typography sx={{orderStyle,  fontWeight:"bold", fontSize:"2rem", padding:"1rem"}} variant="h4">{ toStringWithZeroPadding(participant.order+1) }</Typography>
                    </Box>
                </Box>
                </Box>
                <Box sx={boxStyle}>
                    <Typography sx ={{ color:"orange",fontWeight:"bold", margin:"0", lineHeight: "1",}}variant="subtitle1">{participant.country}</Typography>
                    <Typography sx ={{ color:"white",fontWeight:"bold", lineHeight: "1",}} variant="h5">{participant.title}</Typography>
                    <Typography sx ={{ color:"silver", lineHeight: "1"}} variant="subtitle1">{participant.artist} </Typography>
                </Box>
            </Box>
            <Box sx={{...boxStyle, ...starsStyle }}>
                <Typography variant="h5" color="#ffb300" display={"flex"} sx={{ fontWeight:"bold", padding:"0 1rem", alignItems:"center"}}><MdStar/>
                    {user.votes.get(participant.country) ?? 5}
                </Typography>
            </Box>
        </Box>
    )
}

const EntryList: React.FC = () => {
    const { participants, currentlyPlaying, setSelectedParticipant, selectedParticipant } = useContext(ParticipantContext);
    const [ previouslyPlayedParticipants, setPreviouslyPlayedParticipants ] = useState<Participant[]>([]);

    useEffect(() => {
        if(!currentlyPlaying || !participants) return;

        // Filter out so that we list every entry that's behind in order from currently playing
        const temp: Participant[] = [];
        participants.forEach((p) => {
            if(p.order < currentlyPlaying?.order){
                temp.push(p);
            }
        });

        setPreviouslyPlayedParticipants(temp);
    }, [participants, currentlyPlaying]);

    const handleModalClose = () => {
        setSelectedParticipant(null);
    }

    return(
        <Box sx={{ minHeight: "60vh"}}>
            {previouslyPlayedParticipants.map((participant: Participant, i: number) => {
                return <>
                    <Entry key={i} participant={participant} id={i} />
                    {/* <Divider sx={{width:"95%", margin:"auto", background:""}} /> */}
                </>
            }, [])}
            <Modal
                open={selectedParticipant != null}
                onClose={handleModalClose}
            >
                <Box sx={style}>
                    <CurrentlyPlaying participant={selectedParticipant!} modal/>
                </Box>
            </Modal>
        </Box>
    )
}

export default EntryList;