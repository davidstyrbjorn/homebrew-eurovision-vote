import { Box, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import React, { useContext } from "react";
import QuestionSubmitPrompt from "../components/QuestionSubmitPrompt";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { QuestionContext } from "../contexts/QuestionContext";
import { UserContext } from "../contexts/UserContext";
import CurrentlyPlaying from "./../components/CurrentlyPlaying";
import EntryList from "./../components/EntryList";
import AdminView from "./AdminView";
import LoginView from "./LoginView";

const containerStyle = {
    borderRadius: "20px",
    backgroundColor: "#fafafa",
    display: "flex",
    padding:"2rem",
    justifyContent:"space-between", 
}


const AchievementView: React.FC<{}> = () => {
    
    return ( 
        <Box sx={{display:"flex",margin:"6rem", justifyContent:"center"}} height="60vh">
            
            <Box display={"flex"} flexDirection="column" width="70%" justifyContent={"center"}>
                <Typography variant="h1" color="white" sx={{fontSize:"200px" ,fontWeight:"bold"}}>RYSK SPION</Typography>
                <Typography sx={{width:"50%", color:"white"}} variant="h3">Spelaren som gav mest poäng till "vi hatar varandra men röstar ändo på varandra" gruppen</Typography>
            </Box>
            <Box sx={containerStyle}>
                <Box>
                    <Typography className="firstPlace"  variant="h3" >Emil</Typography>
                    <Typography className="secondPlace" variant="h3">David</Typography>
                    <Typography className="thirdPlace"  variant="h3" >Ruben</Typography>
                </Box>
            </Box>

        </Box>
     );
}

export default AchievementView;