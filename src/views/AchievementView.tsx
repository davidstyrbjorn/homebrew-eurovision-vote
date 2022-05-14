import { Box, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import React, { useContext } from "react";
import { AiFillTrophy } from "react-icons/ai";
import { BiMedal } from "react-icons/bi";
import QuestionSubmitPrompt from "../components/QuestionSubmitPrompt";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { QuestionContext } from "../contexts/QuestionContext";
import { UserContext } from "../contexts/UserContext";
import CurrentlyPlaying from "./../components/CurrentlyPlaying";
import EntryList from "./../components/EntryList";
import AdminView from "./AdminView";
import LoginView from "./LoginView";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    padding:"2rem",
    justifyContent:"center", 
   
    color:"white"
}

const iconStyle = {
    display: "inline-block",
    verticalAlign: "middle",
    paddingBottom: "1rem"
}

const AchievementView: React.FC<{}> = () => {
    



    const toFadeOut = false;
    return ( 
        <Box className={toFadeOut ? "fade-out":""} sx={{display:"flex",margin:"6rem", justifyContent:"center"}} height="70vh">
            <Box className="title-in" display={"flex"} flexDirection="column" width="60%" justifyContent={"center"}>
                <Typography variant="h1" color="white" sx={{fontSize:"180px" ,fontWeight:"bold"}}>RYSK SPION</Typography>
                <Typography sx={{ color:"white"}} variant="h3">Spelaren som gav mest poäng till "vi hatar varandra men röstar ändo på varandra" gruppen</Typography>
            </Box>
            <Box sx={containerStyle}>
                <Box sx={{padding:"2rem", width:"fit-content"}}>
                    <Typography className="first"  variant="h1"><AiFillTrophy   style={iconStyle}/>Emil</Typography>
                    <Typography className="second" variant="h1"><BiMedal        style={iconStyle}/>David</Typography>
                    <Typography className="third"  variant="h1"><BiMedal        style={iconStyle}/>Ruben</Typography>
                </Box>
            </Box>

        </Box>
     );
}

export default AchievementView;