import { ExpandCircleDown } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ParticipantContext } from '../contexts/ParticipantContext';
import { UserContext } from '../contexts/UserContext';
import { calculateAllAchievments } from '../firebase/achievments';
import { activateQuestion, deactivateQuestion, updateCurrentlyPlaying } from '../firebase/admin';
import { Participant, User } from '../types';

const containerStyle = {
    margin:"3rem 3rem",
    padding:" 1rem 1rem",

}

const top = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: "20px",

}

const AdminView: React.FC = () => {
    const {participants, currentlyPlaying} = useContext(ParticipantContext);
    const {users} = useContext(UserContext);
    // Allowed time to answer, used when submitting a question
    const [duration, setDuration] = useState<number>(30);

    const handleOnQuestionSubmit = () => {
        activateQuestion(duration);
    }

    const participantEntry = (p: Participant, i: number) => {
        const isCurrentlyPlaying = currentlyPlaying && (currentlyPlaying.country == p.country)
        return (
            <Box key={i}>
                <ListItem onClick={() => {
                    updateCurrentlyPlaying(p.country);
                }} sx={{background: isCurrentlyPlaying ? 'rgb(0, 200, 10)' : 'white'}}>
                    <ListItemText primary={p.artist} secondary={p.country} />
                    <Button>SELECT</Button>
                </ListItem>
                <Divider/>
            </Box>
        );
    }

    const userEntry = (u: User, i: number) => {
        const numberOfCountries = participants.length;
        const numberOfVotes = Object.entries(u.votes).length
        return (
            <Box key={i}>
                <ListItem sx={{width: "100%"}}>
                    <Accordion sx={{width: "100%"}}>
                        <AccordionSummary
                            expandIcon={<ExpandCircleDown/>}
                        >
                            <Typography>{u.name} Antal: {numberOfVotes} / {numberOfCountries}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* LIST ALL VOTES FOR THIS USER */}
                            {Object.keys(u.votes).map((key, i) => {
                                // @ts-ignore
                                const rating = u.votes[key];
                                return <Typography>{key} : {rating}</Typography>
                            })}
                        </AccordionDetails>
                    </Accordion>
                </ListItem>
            </Box>
        )
    }

    const getQuestionView = () => {
        return (
            <Box bgcolor={'white'} marginTop={16} padding={4} display='flex' justifyContent={'space-around'}>
                <Box>
                    <Typography>Antal Sekunder: </Typography>
                    <TextField value={duration} onChange={(e) => setDuration(Number.parseInt(e.target.value ?? 0))} type={'number'} />
                </Box>
                <Button size='large' color='success' variant='contained' onClick={() => handleOnQuestionSubmit()}>SKICKA</Button>
                <Button size='large' color='error' variant='contained' onClick={() => deactivateQuestion()}>STÄNG AV</Button>
            </Box>
        )
    }

    const getAchievmentsView = () => {
        return (
            <Box bgcolor={'white'} marginTop={16} padding={4} display='flex' justifyContent={'space-around'}>
                <Button size='large' color='warning' variant='contained' onClick={() => calculateAllAchievments()}>BERÄKNA ACHIEVMENTS (KAN TA NÅGRA SEKUNDER)</Button>
            </Box>
        )
    }

    return (
        <Box sx={containerStyle}>
            <Box sx={top}>
                <Box>
                    <Typography textAlign={'center'} variant='h4'>NUVARANDE LÅT</Typography>
                    {/* Section for selecting nuvarande låt */}
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {participants.map((p, i: number) => {
                            return participantEntry(p, i);
                        })}
                    </List>
                </Box>
                <Box>
                    <Typography textAlign={'center'} variant='h4'>FOLKS RÖSTER</Typography>
                    {/* Section for selecting nuvarande låt */}
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {users.map((u, i: number) => {
                            return userEntry(u, i);
                        })}
                    </List>
                </Box>
            </Box>
            {getQuestionView()}
            {getAchievmentsView()}
        </Box>
    );
}

export default AdminView;