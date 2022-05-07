import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography, Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { UserContext } from "../contexts/UserContext";
import { Participant } from "../types";

import CurrentlyPlaying from "./../components/CurrentlyPlaying";
import EntryList from "./../components/EntryList";

import LoginView from "./LoginView";

const HomeView: React.FC<{}> = () => {
    const { user } = useContext(UserContext);
    const { currentlyPlaying, selectedParticipant, setSelectedParticipant } = useContext(ParticipantContext);

    const handleModalClose = () => {
        setSelectedParticipant(null);
    }

    if(user.name == "") return <LoginView/>
    return ( 
        <>
            {currentlyPlaying && 
            <>
                <CurrentlyPlaying participant={currentlyPlaying}/>  
                <EntryList/>
            </>
            }      
        </>
     );
}

export default HomeView;