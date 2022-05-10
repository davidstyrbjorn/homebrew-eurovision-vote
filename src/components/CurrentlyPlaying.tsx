import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdStar } from "react-icons/md";
import { Participant } from "../types";
import { updateVotesInUser } from "../firebase/user";
import { toStringWithZeroPadding } from "../utility";

const boxStyle ={
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}

const flexStyle ={
    display: "flex",
}

const containerStyle = {
    color: "white",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(100px)",
    WebkitBackdropFilter:  "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding:" 1rem 1rem",
    margin:"0.5rem 0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
     
}


// const containerStyle = {
//     color: "white",
//     borderRadius: "20px",
//     background: "rgba(255, 255, 255, 0.1)",
//     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
//     backdropFilter: "blur(100px)",
//     "-webkit-backdrop-filter": "blur(5px)",
//     border: "1px solid rgba(255, 255, 255, 0.3)",
//     margin:"1rem 0.5rem",
//     padding:" 1rem 1rem",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
// }

const orderStyle = {
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding:"1rem",
    margin:"0.5rem 1rem 0 0",
    background: "#2196f3",
    borderRadius:"20px",
    color:"white",
}

type Props = {
    participant: Participant,
    modal?: boolean,
}

const CurrentlyPlaying: React.FC<Props> = ({participant, modal}) => {
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        // Check if the user has voted for this country
        if(user && !user.votes.has(participant.country)){
            // Copy map, add, and set state
            const copy = new Map(user.votes);
            copy.set(participant.country, 5);
            setUser({...user, votes: copy});
        }
    }, []);

    const onSliderChange = (e: any) => {
        // Grab slider value
        const value = e.target.value as number;
        // Update state
        // console.log(user.votes);
        const copy = new Map(user.votes);
        copy.set(participant.country, value);
        setUser({...user, votes: copy});
    }

    return ( 
        <Box sx={!modal ? {...containerStyle} : {...containerStyle, background:"#fafafa", color:"black"}}>
            <Box sx={{...flexStyle}}>
                <Box sx={ {...orderStyle}}>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4">{toStringWithZeroPadding(participant.order+1)}</Typography>
                </Box>
                <Box>
                    <Typography sx ={{color: "#9ccc65", fontWeight:"bold", lineHeight:"1.2"}}variant="h5">{participant.country}</Typography>
                    <Typography sx={{ fontWeight:"bold", lineHeight:"1.2"}} variant="h4">{participant.title}</Typography>
                    <Typography sx={{lineHeight:"1.2",color: "#ff9800"}}variant="subtitle1">By {participant.artist}</Typography>
                </Box>
            </Box>
            <Box sx={{
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(100px)",
                // "-webkit-backdrop-filter": "blur(5px)",
                WebkitBackdropFilter:  "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                marginTop:"1rem",
                padding:"0.5rem",
                
            }}>
            <Typography variant="subtitle1" sx={{
                textAlign:"center",
            }}>What did you think about this entry?</Typography>
                <Box sx={flexStyle}>
                    <Typography variant="h4" color="#E6A600" display={"flex"} sx={{ fontWeight:"bold"}} width="120px"><MdStar/>
                        {user.votes.get(participant.country) ?? 5}
                    </Typography>
                    <Slider 
                        sx={{
                            margin:"0 1rem",
                            color:"#E6A600",
                        }}
                        onChange={onSliderChange}
                        value={user.votes.get(participant.country) ?? 5}
                        onChangeCommitted={(_e) => {updateVotesInUser(user)}}
                        aria-label="Vote"
                        defaultValue={5}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(x) => x + " stars"}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        />
                </Box>
            </Box>
           
        </Box>
     );
}
export default CurrentlyPlaying;