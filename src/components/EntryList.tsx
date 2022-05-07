import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography, Modal } from "@mui/material";
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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

type EntryProps = {
    participant: Participant,
}

const Entry: React.FC<EntryProps> = ({participant}) => {
    const {user, setUser} = useContext(UserContext);
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
    }

    return(
        <Box sx={{...containerStyle , flexDirection:"row", justifyContent:"space-between"}} 
            onClick={() => onEntryPress()}
        >
            <Box sx={{...flexStyle}}>
                <Box sx={ orderStyle }>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4">{ toStringWithZeroPadding(participant.order+1) }</Typography>
                </Box>
                <Box sx={boxStyle}>
                    <Typography sx ={{color: "green", fontWeight:"bold", margin:"0", lineHeight: "1",}}variant="subtitle1">{participant.country}</Typography>
                    <Typography sx={{ fontWeight:"bold", lineHeight: "1",}} variant="h6">{participant.title}</Typography>
                    <Typography sx={{  lineHeight: "1",}} variant="subtitle1">{participant.artist}</Typography>
                </Box>
            </Box>

            <Box sx={{...boxStyle, }}>
                <Typography variant="h5" color="#E6A600" display={"flex"} sx={{ fontWeight:"bold", padding:"0 1rem", alignItems:"center"}}><MdStar/>
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
        <>
            {previouslyPlayedParticipants.map((participant: Participant, i: number) => {
                return <Entry key={i} participant={participant} />
            }, [])}
            <Modal
                open={selectedParticipant != null}
                onClose={handleModalClose}
            >
                <Box sx={style}>
                    <CurrentlyPlaying participant={selectedParticipant!}/>
                </Box>
            </Modal>
        </>
    )
}

export default EntryList;