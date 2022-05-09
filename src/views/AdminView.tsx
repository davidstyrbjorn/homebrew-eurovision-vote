import { ExpandCircleDown } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
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
                <ListItem>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandCircleDown/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>{u.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {/* {u.votes.values} */}
                            HAHAHA BAJS
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </ListItem>
            </Box>
        )
    }

    return (
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
                <Typography textAlign={'center'} variant='h4'>POÄNG</Typography>
                {/* Section for selecting nuvarande låt */}
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {users.map((u, i: number) => {
                        return userEntry(u, i);
                    })}
                </List>
            </Box>
        </Box>
    );
}

export default AdminView;