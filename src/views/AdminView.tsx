import { ExpandCircleDown } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { ParticipantContext } from '../contexts/ParticipantContext';
import { UserContext } from '../contexts/UserContext';
import { updateCurrentlyPlaying } from '../firebase/admin';
import { Participant, User } from '../types';

const containerStyle = {
    borderRadius: "20px",
    backgroundColor: "#fafafa",
    margin:"3rem 3rem",
    padding:" 1rem 1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
}

const AdminView: React.FC = () => {
    const {participants, currentlyPlaying} = useContext(ParticipantContext);
    const {users} = useContext(UserContext);

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
        return (
            <Box key={i}>
                <ListItem sx={{width: "100%"}}>
                    <Accordion sx={{width: "100%"}}>
                        <AccordionSummary
                            expandIcon={<ExpandCircleDown/>}
                        >
                            <Typography>{u.name}</Typography>
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
            <TextField></TextField>
        )
    }

    return (
        <Box>
            <Box sx={containerStyle}>
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
        </Box>
    );
}

export default AdminView;