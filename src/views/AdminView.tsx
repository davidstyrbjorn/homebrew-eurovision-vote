import { signInAnonymously } from "@firebase/auth";
import {
	collection,
	doc,
	onSnapshot,
	query,
	updateDoc,
} from "@firebase/firestore";
import { ExpandCircleDown } from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import QuestionSubmitPrompt from "../components/QuestionSubmitPrompt";
import { AchievmentsContext } from "../contexts/AchievmentsContext";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { UserContext } from "../contexts/UserContext";
import { auth, db } from "../firebase.config";
import { calculateAllAchievments } from "../firebase/achievments";
import {
	activateQuestion,
	deactivateQuestion,
	updateCurrentlyPlaying,
} from "../firebase/admin";
import { ACHIEVMENTS, Group, Participant, User } from "../types";

const containerStyle = {
	margin: "3rem 3rem",
	padding: " 1rem 1rem",
};

const top = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-evenly",
};

const AdminView: React.FC = () => {
	const { participants, currentlyPlaying } = useContext(ParticipantContext);
	const { users } = useContext(UserContext);
	// Allowed time to answer, used when submitting a question
	const [duration, setDuration] = useState<number>(30);
	const [prompt, setPrompt] = useState<string>("");
	const { switchKey, currentKey } = useContext(AchievmentsContext);
	const [groups, setGroups] = useState<Group[]>([]);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (!user) signInAnonymously(auth);
		});

		const q = query(collection(db, "groups"));
		const unsub = onSnapshot(q, (snapshot) => {
			setGroups(
				snapshot.docs.map((doc) => {
					return doc.data() as Group;
				})
			);
		});
		return unsub;
	}, []);

	const handleOnQuestionSubmit = () => {
		activateQuestion(duration, prompt);
	};

	const exportToCSV = () => {
		// Fetch all users and their votes
		const q = query(collection(db, "users"));
		const unsub = onSnapshot(q, (snapshot) => {
			const users = snapshot.docs.map((doc) => {
				return doc.data() as User;
			});
			// Convert to CSV format
			let csvContent = "data:text/csv;charset=utf-8,";
			csvContent += "Name,Country,Score\n"; // Header row
			users.forEach((user) => {
				Object.entries(user.votes).forEach(([country, score]) => {
					csvContent += `${user.name},${country},${score}\n`;
				});
			});
			// Create a link and download the CSV file
			const encodedUri = encodeURI(csvContent);
			const link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "votes.csv");
			document.body.appendChild(link); // Required for FF
			link.click();
		});
		return unsub;
	};

	const participantEntry = (p: Participant, i: number) => {
		const isCurrentlyPlaying =
			currentlyPlaying && currentlyPlaying.country == p.country;
		return (
			<Box key={i}>
				<ListItem
					onClick={() => {
						updateCurrentlyPlaying(p.country);
					}}
					sx={{
						background: isCurrentlyPlaying
							? "rgb(0, 200, 10)"
							: "white",
					}}
				>
					<ListItemText primary={p.artist} secondary={p.country} />
					<Button>SELECT</Button>
				</ListItem>
				<Divider />
			</Box>
		);
	};

	const groupsEntry = (g: Group, i: number) => {
		return (
			<Box key={i}>
				<ListItem sx={{ width: "100%" }}>
					<Accordion sx={{ width: "100%" }}>
						<AccordionSummary expandIcon={<ExpandCircleDown />}>
							<Typography>{g.name}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{/* Map out grup name, answer and timeRemaining here */}
							<Typography>Name: {g.name}</Typography>
							<Typography>Answer: {g.answer}</Typography>
							<Typography>
								Time Remaining: {g.timeRemaining}
							</Typography>
							<Typography>Score: {g.score}</Typography>
							{/* Button to increment score */}
							<Button
								onClick={() => {
									// @ts-ignore
									const newScore = g.score + 1;
									const ref = doc(db, "groups", g.name);
									updateDoc(ref, {
										score: newScore,
									});
								}}
							>
								<Typography>INCREMENT SCORE</Typography>
							</Button>
						</AccordionDetails>
					</Accordion>
				</ListItem>
			</Box>
		);
	};

	const userEntry = (u: User, i: number) => {
		const numberOfCountries = participants.length;
		const numberOfVotes = Object.entries(u.votes).length;
		return (
			<Box key={i}>
				<ListItem sx={{ width: "100%" }}>
					<Accordion sx={{ width: "100%" }}>
						<AccordionSummary expandIcon={<ExpandCircleDown />}>
							<Typography>
								{u.name} Antal: {numberOfVotes} /{" "}
								{numberOfCountries}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{/* LIST ALL VOTES FOR THIS USER */}
							{Object.keys(u.votes).map((key, i) => {
								// @ts-ignore
								const rating = u.votes[key];
								return (
									<Typography>
										{key} : {rating}
									</Typography>
								);
							})}
						</AccordionDetails>
					</Accordion>
				</ListItem>
			</Box>
		);
	};

	const getQuestionView = () => {
		return (
			<Box
				bgcolor={"white"}
				marginTop={16}
				padding={4}
				display="flex"
				justifyContent={"space-around"}
			>
				<QuestionSubmitPrompt />
				<Box>
					<Typography>Antal Sekunder: </Typography>
					<TextField
						value={duration}
						onChange={(e) =>
							setDuration(Number.parseInt(e.target.value ?? 0))
						}
						type={"number"}
					/>
					<Typography>Prompt'N: </Typography>
					<TextField
						value={prompt}
						onChange={(e) => {
							setPrompt(e.target.value);
						}}
						type={"text"}
						placeholder="Vad är din fråga?"
					></TextField>
				</Box>
				<Button
					size="large"
					color="success"
					variant="contained"
					onClick={() => handleOnQuestionSubmit()}
				>
					SKICKA
				</Button>
				<Button
					size="large"
					color="error"
					variant="contained"
					onClick={() => deactivateQuestion()}
				>
					STÄNG AV
				</Button>
			</Box>
		);
	};

	const getAchievmentsView = () => {
		return (
			<Box
				bgcolor={"white"}
				marginTop={16}
				padding={4}
				display="flex"
				justifyContent={"space-around"}
				flexDirection={"column"}
			>
				<Button
					size="large"
					color="warning"
					variant="contained"
					onClick={() => calculateAllAchievments()}
				>
					BERÄKNA ACHIEVMENTS (KAN TA NÅGRA SEKUNDER)
				</Button>
				{ACHIEVMENTS.map((ach) => {
					return (
						<Button
							color={
								ach.key == currentKey ? "primary" : "secondary"
							}
							onClick={() => switchKey(ach.key)}
						>
							{ach.key}
						</Button>
					);
				})}
			</Box>
		);
	};

	const getExportView = () => {
		return (
			<Box
				bgcolor={"white"}
				marginTop={16}
				padding={4}
				display="flex"
				justifyContent={"space-around"}
				flexDirection={"column"}
			>
				<Button
					size="large"
					color="warning"
					variant="contained"
					onClick={() => exportToCSV()}
				>
					SVERIGE, VI HAR ETT RESULTAT
				</Button>
			</Box>
		);
	};

	return (
		<Box sx={containerStyle}>
			<Box sx={top}>
				<Box>
					<Typography textAlign={"center"} variant="h4">
						NUVARANDE LÅT
					</Typography>
					{/* Section for selecting nuvarande låt */}
					<List
						sx={{
							width: "100%",
							maxWidth: 360,
							bgcolor: "background.paper",
						}}
					>
						{participants.map((p, i: number) => {
							return participantEntry(p, i);
						})}
					</List>
				</Box>
				<Box>
					<Typography textAlign={"center"} variant="h4">
						FOLKS RÖSTER
					</Typography>
					{/* Section for selecting nuvarande låt */}
					<List
						sx={{
							width: "100%",
							maxWidth: 360,
							bgcolor: "background.paper",
						}}
					>
						{users.map((u, i: number) => {
							return userEntry(u, i);
						})}
					</List>
				</Box>
				<Box>
					<Typography textAlign={"center"} variant="h4">
						GROUPS
					</Typography>
					{/* Section for selecting nuvarande låt */}
					<List
						sx={{
							width: "100%",
							maxWidth: 360,
							bgcolor: "background.paper",
						}}
					>
						{groups.map((g, i: number) => {
							return groupsEntry(g, i);
						})}
					</List>
				</Box>
			</Box>
			{getQuestionView()}
			{getExportView()}
			{getAchievmentsView()}
		</Box>
	);
};

export default AdminView;
