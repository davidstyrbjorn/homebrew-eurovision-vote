import React, { useContext } from "react";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { UserContext } from "../contexts/UserContext";
import CurrentlyPlaying from "./../components/CurrentlyPlaying";
import EntryList from "./../components/EntryList";
import AdminView from "./AdminView";
import LoginView from "./LoginView";

const HomeView: React.FC<{}> = () => {
    const { user, isMax } = useContext(UserContext);
    const { currentlyPlaying } = useContext(ParticipantContext);

    if(isMax) return <AdminView/>
    if(user.name == "") return <LoginView/>
    return ( 
        <>
            {currentlyPlaying && 
            <Box sx={{maxWidth:"600px", margin:"auto"}}>
                <CurrentlyPlaying participant={currentlyPlaying}/>  
                <EntryList/>
            </Box>
            }      
        </>
     );
}

export default HomeView;