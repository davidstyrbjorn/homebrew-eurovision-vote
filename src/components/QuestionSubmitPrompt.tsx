import {
	Box,
	Button,
	SxProps,
	TextField,
	Theme,
	Typography,
	LinearProgress,
	Dialog,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MdTimer } from "react-icons/md";
import { QuestionContext } from "../contexts/QuestionContext";

const containerStyle: SxProps<Theme> = {
	background: "rgba(255, 255, 255, 0.1)",
	boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
	backdropFilter: "blur(100px)",
	margin: "1rem 0.5rem",
	padding: "1rem",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
};

const QuestionSubmitPrompt: React.FC = () => {
	const {
		submitAnswer,
		questionActive,
		questionStartTime,
		allowedSecondsToAnswer,
		prompt,
	} = useContext(QuestionContext);

	const [answer, setAnswer] = useState("");
	const [group, setGroup] = useState(localStorage.getItem("group") || "");
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (questionActive) {
			setOpen(true);
			const adjustedStartTime = questionStartTime; // Add 1 extra second to start time
			const elapsed = Math.round((Date.now() - adjustedStartTime) / 1000);
			setTimeRemaining(Math.max(allowedSecondsToAnswer - elapsed, 0));

			interval = setInterval(() => {
				const elapsed = Math.round((Date.now() - adjustedStartTime) / 1000);
				const remaining = Math.max(allowedSecondsToAnswer - elapsed, 0);
				setTimeRemaining(remaining);

				if (remaining === 0) {
					setOpen(false); // Close the dialog when timer reaches 0
				}
			}, 1000);
		} else {
			setOpen(false); // Close the modal when questionActive is false
			setAnswer(""); // Reset answer
			setGroup(localStorage.getItem("group") || ""); // Reset group to stored value
			setTimeRemaining(0); // Reset timer
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [questionActive, questionStartTime, allowedSecondsToAnswer]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		if (timeRemaining > 0) {
			localStorage.setItem("group", group);
			submitAnswer({ answer, groupName: group, timeRemaining });
			setOpen(false);
		}
	};

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	return (
		<>
		<Dialog open={open} onClose={handleClose} fullWidth>
			<Box sx={containerStyle}>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						<MdTimer style={{ transform: "translate(-10%, 14%)" }} />
						{prompt}
					</Typography>
					<Typography variant="h4">{timeRemaining}s</Typography>
				</Box>

				<LinearProgress
					variant="determinate"
					value={(1 - (timeRemaining) / allowedSecondsToAnswer) * 100}
					sx={{ margin: "1rem 0" }}
				/>

				<TextField
					sx={{ margin: "0.5rem 0", background: "white" }}
					value={answer}
					onChange={(e) => setAnswer(e.target.value)}
					label="Answer"
					variant="filled"
					required
				/>

				<TextField
					sx={{ margin: "0.5rem 0", background: "white" }}
					value={group}
					onChange={(e) => setGroup(e.target.value)}
					label="Group Name"
					variant="filled"
					required
				/>

				<Button
					sx={{ margin: "0.5rem 0", width: "100%" }}
					color={timeRemaining > 0 ? "info" : "error"}
					variant="contained"
					onClick={handleSubmit}
				>
					{timeRemaining > 0 ? "SEND" : "TOO LATE"}
				</Button>
			</Box>
		</Dialog>
		
		{timeRemaining > 0 && (
			<Box sx={{ margin: "1rem 1rem", background: "rgba(30, 30, 30, 0.85)", borderRadius: 2, p: 2 }}>
				<Typography variant="body1" sx={{ fontWeight: "bold", color: "#fff" }}>
					Given Answer: <span style={{ color: "#90caf9" }}>{answer || "No answer yet"}</span>
				</Typography>
				<Button
					sx={{
						margin: "0.5rem 0",
						width: "100%",
						backgroundColor: "#1976d2",
						color: "#fff",
						"&:hover": {
							backgroundColor: "#1565c0",
						},
					}}
					color="info"
					variant="contained"
					onClick={() => setOpen(true)}
				>
					Edit Answer
				</Button>
			</Box>
		)}
		</>
		
	);
};

export default QuestionSubmitPrompt;
