import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import CurrentlyPlaying from "./../components/CurrentlyPlaying";

const HomeView: React.FC<{}> = () => {
    return ( 
        <CurrentlyPlaying />
     );
}

export default HomeView;