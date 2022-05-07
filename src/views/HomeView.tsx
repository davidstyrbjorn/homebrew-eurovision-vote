import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import CurrentlyPlaying from "./../components/CurrentlyPlaying";
import LoginView from "./LoginView";

const HomeView: React.FC<{}> = () => {
    const { user } = useContext(UserContext);

    return ( 
        <>
            {user.name == "" ? <LoginView/> : <CurrentlyPlaying/>}        
        </>
     );
}

export default HomeView;