import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { UserContext } from "../contexts/UserContext";

import CurrentlyPlaying from "./../components/CurrentlyPlaying";
import EntryList from "./../components/EntryList";

import LoginView from "./LoginView";

const HomeView: React.FC<{}> = () => {
    const { user } = useContext(UserContext);
    const { participants } = useContext(ParticipantContext);

    return ( 
        <>
            {user.name == "" ? <LoginView/> : <><CurrentlyPlaying/><EntryList/></>}        
        </>
     );
}

export default HomeView;