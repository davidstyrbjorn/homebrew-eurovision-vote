import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import QuestionSubmitPrompt from "../components/QuestionSubmitPrompt";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { QuestionContext } from "../contexts/QuestionContext";
import { UserContext } from "../contexts/UserContext";
import CurrentlyPlaying from "./../components/CurrentlyPlaying";
import EntryList from "./../components/EntryList";
import AdminView from "./AdminView";
import LoginView from "./LoginView";
import AchievementView from "./AchievementView";



const HomeView: React.FC<{}> = () => {
    const { user, isMax, isAch } = useContext(UserContext);
    const { currentlyPlaying } = useContext(ParticipantContext);
    const { questionActive } = useContext(QuestionContext);

    if(isAch) return <AchievementView/>
    if(isMax) return <AdminView/>
    if(user.name == "") return <LoginView/>
    return ( 
        <>
            {currentlyPlaying && 
                <Box sx={{maxWidth:"600px", margin:"auto", overflowX:"hidden"}}>
                    <QuestionSubmitPrompt/>
                    <Typography className="questionRoom" variant="subtitle1" color="white" padding="0rem 1rem 0rem 1rem" marginTop={questionActive ? "0":"-340px"}></Typography>
                    <CurrentlyPlaying participant={currentlyPlaying!}/>  
                    <EntryList/>
                </Box>
            }      
        </>
     );
}

export default HomeView;