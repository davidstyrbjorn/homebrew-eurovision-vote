import { Button, Slider, Chip, Grid, Input, Box, TextField, Typography, Snackbar, Alert } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const containerStyle = {
    borderRadius: "20px",
    backgroundColor: "#fafafa",
    margin:"1rem 0.5rem",
    padding:" 1rem 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const addedButtonStyle = {
    width:"100%",
    margin:"0.5rem 0",
}

const LoginView: React.FC<{}> = () => {
    const {loginAsUser, setIsMax} = useContext(UserContext);
    const [name, setName] = useState<string>("");
    const [foundStoredName, setFoundStoredName] = useState<boolean>(false);
    const [secretPhrase, setSecretPhrase] = useState<string>("");
    const SECRET = "102ep12dp3fj2ffjp4j"

    const onSubmit = () => {
        if(name == "") return;
        // Update local storage
        localStorage.setItem("name", name);
        // This will do alot of stuff and eventually update user context state
        loginAsUser(name); 
    }

    // Called when the user changes name, update state
    const onNameChange = (event: any) => {
        setName(event.target.value);
    }

    const onSecretChange = (event: any) => {
        setSecretPhrase(event.target.value);
        if(event.target.value == SECRET){
            setIsMax(true);
        }
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        setFoundStoredName(false);
    }

    useEffect(() => {
        // Check if local storage has a name already!
        const storedName = localStorage.getItem("name")
        if(storedName != null){
            setName(storedName);
            setFoundStoredName(true);
        }
    }, []);

    return ( 
        <Box sx={containerStyle}>
            <Typography variant="h5" sx={{ fontWeight:'bold'}}>Welcome to Euro</Typography>
            <Typography variant="subtitle1">Please enter a username to continue</Typography>
            <TextField  sx={addedButtonStyle} id="outlined-basic"label="Username" value={name} onChange={onNameChange} variant="outlined" required/>
            <Button     sx={addedButtonStyle} variant="contained" onClick={onSubmit}>CONTINUE</Button>
            <TextField  sx={addedButtonStyle} id="outlined-basic"label="FÖR MAX ÖGON ENDAST" value={secretPhrase} onChange={onSecretChange} variant="outlined"/>

            <Snackbar
                open={foundStoredName}
                onClose={handleClose}
                autoHideDuration={6000}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Found a stored name!
                </Alert>
            </Snackbar>
        </Box>
     );
}

export default LoginView