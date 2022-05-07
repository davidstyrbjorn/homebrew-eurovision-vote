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
    borderRadius: "20px",
    backgroundColor: "#fafafa",
    margin:"1rem 0.5rem",
    padding:" 1rem 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const orderStyle = {
    height: "100p%",
    display: "flex",
    borderRight: "6px solid #1F2B8F",
    flexDirection: "column",
    justifyContent: "center",
    padding:"0.5rem",
    margin:"0 0.5rem 0 0",
}

type Props = {
    participant: Participant
}

const CurrentlyPlaying: React.FC<Props> = ({participant}) => {
    const [stars, setStars] = useState(0);
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
        <Box sx={containerStyle}>
            <Box sx={{...flexStyle}}>
                <Box sx={ orderStyle }>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4">{toStringWithZeroPadding(participant.order)}</Typography>
                </Box>
                <Box>
                    <Typography sx ={{color: "green", fontWeight:"bold"}}variant="h5">{participant.country}</Typography>
                    <Typography sx={{ fontWeight:"bold"}} variant="h4">{participant.title}</Typography>
                    <Typography variant="subtitle1">By {participant.artist}</Typography>
                </Box>
            </Box>
            <Box sx={{
                borderRadius: "20px",
                backgroundColor: "white",
                border: "2px solid silver",
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