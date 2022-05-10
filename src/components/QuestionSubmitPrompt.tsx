import { Box, Button, SxProps, TextField, Theme, Typography, LinearProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { MdTimer } from "react-icons/md";
import { QuestionContext } from "../contexts/QuestionContext";


const containerStyle: SxProps<Theme> = {
    color: "white",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(100px)",
    WebkitBackdropFilter:  "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    margin: "1rem 0.5rem",
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

const style = {
    transform: 'translate(-10%, 14%)',
};

const QuestionSubmitPrompt: React.FC = () => {
    const {questionPrompt, submitAnswer, questionActive} = useContext(QuestionContext);
    const [answer, setAnswer] = useState("");
    const [group, setGroup] = useState("");

  

    const [remove, setRemove] = useState(false);

    const onSubmit = () => {

        setRemove(!remove);

        submitAnswer({
            answer,
            groupName: group,
            submitTime: new Date()
        });
    }
    return (
        <Box className={questionActive ? "question": "question-out" } sx={containerStyle} >

            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Typography variant="h4" sx={{ fontWeight:'bold'}}><MdTimer style={style} />Question!</Typography>
                <Typography variant="h4" >30s</Typography>
            </Box>

            <LinearProgress variant="determinate" value={36} sx={{margin:"1rem 0", paddin:"1rem"}} />
            <TextField color='primary' sx={{...addedButtonStyle, background:"white"}} value={answer} onChange={(e) => setAnswer(e.target.value)} id="outlined-basic"label="Answer" variant="filled" required/>
            <TextField sx={{...addedButtonStyle, background:"white"}} value={group} onChange={(e) => setGroup(e.target.value)} id="outlined-basic"label="Group Name" variant="filled" required/>
            <Button    sx={addedButtonStyle} variant="contained" onClick={() => onSubmit()}>SEND</Button>
        </Box>
    )
}

export default QuestionSubmitPrompt;