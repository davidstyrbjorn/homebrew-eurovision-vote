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

const HomeView: React.FC<{}> = () => {
    const { user, isMax } = useContext(UserContext);
    const { currentlyPlaying } = useContext(ParticipantContext);
    const {questionActive} = useContext(QuestionContext);

    if(isMax) return <AdminView/>
    if(user.name == "") return <LoginView/>
    return ( 

        





        <>
            {currentlyPlaying && 
                <Box sx={{maxWidth:"600px", margin:"auto"}}>
                    {questionActive && 
                        <QuestionSubmitPrompt/>
                    }
                    <Typography variant="subtitle1" color="white" padding="1rem 1rem 0rem 1rem">Currently Playing</Typography>
                    <CurrentlyPlaying participant={currentlyPlaying}/>  
                    <Typography variant="subtitle1" color="white" padding="1rem 1rem 0rem 1rem">Previously Played</Typography>
                    <EntryList/>
                </Box>
            }      
        </>
     );
}

export default HomeView;