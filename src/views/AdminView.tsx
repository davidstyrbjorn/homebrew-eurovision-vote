import { Box, Button, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { ParticipantContext } from '../contexts/ParticipantContext';
import { updateCurrentlyPlaying } from '../firebase/admin';
import { Participant } from '../types';

const containerStyle = {
    borderRadius: "20px",
    backgroundColor: "#fafafa",
    margin:"1rem 0.5rem",
    padding:" 1rem 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const AdminView: React.FC = () => {
    const {participants, currentlyPlaying} = useContext(ParticipantContext);

    const participantEntry = (p: Participant, i: number) => {
        const isCurrentlyPlaying = currentlyPlaying && (currentlyPlaying.country == p.country)
        return (
            <ListItem key={i} onClick={() => {
                updateCurrentlyPlaying(p.country);
            }} sx={{background: isCurrentlyPlaying ? 'rgb(0, 200, 10)' : 'white'}}>
                <ListItemText primary={p.artist} secondary={p.country} />
                <Button>SELECT</Button>
            </ListItem>
        );
    }

    return (<Box sx={containerStyle}>
        <Typography variant='h2'>VÄLJ NUVARANDE LÅT</Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {participants.map((p, i: number) => {
                return participantEntry(p, i);
            })}
        </List>
    </Box>);
}

export default AdminView;