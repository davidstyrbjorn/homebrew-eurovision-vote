import {
	Button,
	Slider,
	Chip,
	Grid,
	Input,
	Box,
	TextField,
	Typography,
	Rating,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdStar } from "react-icons/md";
import { Participant } from "../types";
import { fillUserVotes, updateVotesInUser } from "../firebase/user";
import { toStringWithZeroPadding } from "../utility";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { calculateAllAchievments } from "../firebase/achievments";

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
		<Box
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				maxWidth: "600px",
				border: "2px solid #d3d3d3",
				boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.1)",
				overflowX: "hidden",
				background: "rgba(0, 0, 0, 0.1)",
			}}
		>
			<Box style={{ display: "flex", width: "100%", }}>
				<Box
					style={{
						padding: "0 2rem",
						display: "flex",
						textAlign: "center",
						flexDirection: "column",
						justifyContent: "center",
						border: "1px solid #d3d3d3",
						boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.1)",
					}}
				>
					<Typography style={{ fontWeight: "bold", color:"white" }} variant="h4">
						{toStringWithZeroPadding(participant.order + 1)}
					</Typography>
				</Box>
				<Box
					style={{
						flex: "3",
						padding: "1rem 1rem",
						color: "white",
						border: "1px solid #d3d3d3",
						boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.1)",
					}}
				>
					<Typography
						style={{ fontWeight: "bold", lineHeight: "1.2" }}
						variant="h5"
					>
						{participant.country}
					</Typography>
					<Typography
						style={{ fontWeight: "bold", lineHeight: "1.2" }}
						variant="h4"
					>
						{participant.title}
					</Typography>
					<Typography variant="subtitle1">
						Artist: {participant.artist}
					</Typography>
				</Box>
			</Box>
			<Box
				style={{
					width: "100%",
					padding: "0.5rem",
					alignItems: "center",
					border: "1px solid #d3d3d3",
					boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.1)",
				}}
			>
				{/* <Typography variant="subtitle1" style={{ textAlign: "center" }}>
					Vad tyckte du om detta bidrag?
				</Typography> */}
				<Box style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
					<Rating
						name="simple-controlled"
						onChange={(_e, value) => {
							const ratingValue = value || 5; // Default to 5 if value is null
							const copy = new Map(user.votes);
							copy.set(participant.country, ratingValue);
							const updatedUser = { ...user, votes: copy };
							setUser(updatedUser);
							updateVotesInUser(updatedUser);
						}}
						value={getRating()}
						max={10}
						sx={{
							"& .MuiRating-iconEmpty": {
								color: "white",
							},
						}}
					/>
					<Typography
						variant="h4"
						color="white"
						display={"flex"}
						style={{ fontWeight: "bold", textAlign: "center", lineHeight: "3rem", marginLeft: "1rem" }}
					>
						{getRating()}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
export default CurrentlyPlaying;
