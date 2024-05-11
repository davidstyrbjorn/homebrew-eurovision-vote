import {
	Button,
	Slider,
	Chip,
	Grid,
	Input,
	Box,
	TextField,
	Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdStar } from "react-icons/md";
import { Participant } from "../types";
import { fillUserVotes, updateVotesInUser } from "../firebase/user";
import { toStringWithZeroPadding } from "../utility";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { calculateAllAchievments } from "../firebase/achievments";
import { Height, Padding } from "@mui/icons-material";

const flexStyle = {
	display: "flex",
};

const containerStyle = {
	color: "white",
	backgroundSize: "cover",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	padding: "1rem",
};

const songOrderStyle = {
	flex: "1",
	display: "flex",
	background: "#F3DC14",
	textAlign: "center",
	flexDirection: "column",
	justifyContent: "center",
};

const songDetailsStyle = {
	flex: "4",
	padding: "1rem 1rem",
	color: "white",
	background: "#6528BC",
};

const starsStyle = {
	background: "#1DC0DF",
};

const orderStyle = {
	height: "fit-content",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	padding: "1rem",
	margin: "0.5rem 1rem 0 0",
	color: "white",
};

type Props = {
	participant: Participant;
	modal?: boolean;
};

const CurrentlyPlaying: React.FC<Props> = ({ participant, modal }) => {
	const { user, setUser } = useContext(UserContext);
	const { participants } = useContext(ParticipantContext);

	const getRating = () => {
		if (user.votes.get) return user.votes.get(participant.country) ?? 5;
		return 5;
	};

	const onSliderChange = (e: any) => {
		// Grab slider value
		const value = e.target.value as number;
		// Update state
		const copy = new Map(user.votes);
		copy.set(participant.country, value);
		setUser({ ...user, votes: copy });
	};

	return (
		<Box sx={{ ...containerStyle }}>
			<Box sx={{ ...flexStyle }}>
				<Box sx={{ ...songOrderStyle }}>
					<Typography sx={{ fontWeight: "bold" }} variant="h4">
						{toStringWithZeroPadding(participant.order + 1)}
					</Typography>
				</Box>
				<Box sx={{ ...songDetailsStyle }}>
					<Typography
						sx={{ fontWeight: "bold", lineHeight: "1.2" }}
						variant="h5"
					>
						{participant.country}
					</Typography>
					<Typography
						sx={{ fontWeight: "bold", lineHeight: "1.2" }}
						variant="h4"
					>
						{participant.title}
					</Typography>
					<Typography variant="subtitle1">
						Artist: {participant.artist}
					</Typography>
				</Box>
			</Box>
			<Box sx={{ padding: "0.5rem", ...starsStyle }}>
				<Typography variant="subtitle1" sx={{ textAlign: "center" }}>
					Vad tyckte du om detta bidrag?
				</Typography>
				<Box sx={{ ...flexStyle }}>
					<Typography
						variant="h4"
						color="#E6A600"
						display={"flex"}
						sx={{ fontWeight: "bold" }}
						width="120px"
					>
						<MdStar />
						{getRating()}
					</Typography>
					<Slider
						sx={{
							margin: "0 1rem",
							color: "#E6A600",
							borderRadius: "0",
						}}
						onChange={onSliderChange}
						value={getRating()}
						onChangeCommitted={(_e) => {
							updateVotesInUser(user);
						}}
						aria-label="Vote"
						defaultValue={5}
						valueLabelDisplay="auto"
						valueLabelFormat={(x) => x + " stars"}
						step={1}
						marks
						min={1}
						max={10}
					/>
				</Box>
			</Box>
		</Box>
	);
};
export default CurrentlyPlaying;
