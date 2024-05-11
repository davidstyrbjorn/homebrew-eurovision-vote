import {
	Box,
	Button,
	SxProps,
	TextField,
	Theme,
	Typography,
	LinearProgress,
	Snackbar,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MdTimer } from "react-icons/md";
import { QuestionContext } from "../contexts/QuestionContext";

const containerStyle: SxProps<Theme> = {
	color: "white",

	background: "rgba(255, 255, 255, 0.1)",
	boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
	backdropFilter: "blur(100px)",
	margin: "1rem 0.5rem",
	padding: " 1rem 1rem 1rem",
	marginBottom: "1rem",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
};

const addedButtonStyle = {
	width: "100%",
	margin: "0.5rem 0",
	color: "white",
};

const style = {
	transform: "translate(-10%, 14%)",
};

const QuestionSubmitPrompt: React.FC = () => {
	const {
		submitAnswer,
		questionActive,
		questionStartTime,
		allowedSecondsToAnswer,
	} = useContext(QuestionContext);
	const [answer, setAnswer] = useState("");
	const [group, setGroup] = useState("");
	const [remove, setRemove] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [open, setOpen] = useState<boolean>(false);

	const onSubmit = () => {
		// Save group name to local storage
		localStorage.setItem("group", group);

		if (timeRemaining <= 0) return;
		setRemove(!remove);
		submitAnswer({
			answer,
			groupName: group,
			timeRemaining: timeRemaining,
		});
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			// console.log(questionStartTime);
			let elapsed = (Date.now() - questionStartTime) / 1000;
			elapsed = Math.round(elapsed);
			const remaining = allowedSecondsToAnswer - elapsed;
			setTimeRemaining(remaining > 0 ? remaining : 0);
		}, 1000);

		return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
	}, [questionStartTime, allowedSecondsToAnswer]);

	useEffect(() => {
		if (!group && localStorage.getItem("group")) {
			setGroup(localStorage.getItem("group")!);
		}
	}, []);

	return (
		<>
			<Box
				className={questionActive ? "question" : "question-out"}
				sx={containerStyle}
			>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						<MdTimer style={style} />
						SVARA!
					</Typography>
					<Typography variant="h4">{timeRemaining}s</Typography>
				</Box>

				<LinearProgress
					variant="determinate"
					value={(1 - timeRemaining / allowedSecondsToAnswer) * 100}
					sx={{ margin: "1rem 0", paddin: "1rem" }}
				/>
				<TextField
					color="primary"
					sx={{ ...addedButtonStyle, background: "white" }}
					value={answer}
					onChange={(e) => setAnswer(e.target.value)}
					id="outlined-basic"
					label="Svar"
					variant="filled"
					required
				/>
				<TextField
					sx={{ ...addedButtonStyle, background: "white" }}
					value={group}
					onChange={(e) => setGroup(e.target.value)}
					id="outlined-basic"
					label="Grupp Namn"
					variant="filled"
					required
				/>
				<Button
					sx={addedButtonStyle}
					color={timeRemaining > 0 ? "info" : "error"}
					variant="contained"
					onClick={() => onSubmit()}
				>
					{timeRemaining > 0 ? "SEND" : "TOO LATE"}
				</Button>
			</Box>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={open}
				onClose={handleClose}
				message="SKICKAT!"
				color="green"
				autoHideDuration={3000}
			/>
		</>
	);
};

export default QuestionSubmitPrompt;
