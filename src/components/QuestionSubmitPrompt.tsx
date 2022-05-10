import { Box, Button, SxProps, TextField, Theme, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { QuestionContext } from "../contexts/QuestionContext";

const containerStyle: SxProps<Theme> = {
    color: "white",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(100px)",
    WebkitBackdropFilter:  "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding:" 1rem 1rem 1rem",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",    
}

const addedButtonStyle = {
    width:"100%",
    margin:"0.5rem 0",
    color: 'white'
}

const QuestionSubmitPrompt: React.FC = () => {
    const {questionPrompt, submitAnswer} = useContext(QuestionContext);
    const [answer, setAnswer] = useState("");
    const [group, setGroup] = useState("");

    const onSubmit = () => {
        submitAnswer({
            answer,
            groupName: group,
            submitTime: new Date()
        });
    }

    return (
        <Box sx={containerStyle} >
            <Typography variant="h4" sx={{ fontWeight:'bold'}}>RIDDLE ME THIS</Typography>
            <Typography variant="h6">{questionPrompt}</Typography>
            <TextField sx={addedButtonStyle} value={answer} onChange={(e) => setAnswer(e.target.value)} id="outlined-basic"label="Answer" variant="outlined" required/>
            <TextField sx={addedButtonStyle} value={group} onChange={(e) => setGroup(e.target.value)} id="outlined-basic"label="Group Name" variant="outlined" required/>
            <Button    sx={addedButtonStyle} variant="contained" onClick={() => onSubmit()}>SEND</Button>
        </Box>
    )
}

export default QuestionSubmitPrompt;