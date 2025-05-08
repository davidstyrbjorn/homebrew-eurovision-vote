import {
	Box,
	Typography,
	Divider,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdStar } from "react-icons/md";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { Participant } from "../types";
import { toStringWithZeroPadding } from "../utility";

import { updateVotesInUser } from "../firebase/user";

// Styles
const styles = {
	flexStyle: {
		display: "flex",
	},
	boxStyle: {
		display: "flex",
		gap: "0.25rem",
		flexDirection: "column",
		justifyContent: "center",
	},
	starsSectionStyle: {
		position: "relative",
	},
	orderContainerStyle: {
		color: "#000",
	},
	orderStyle: {
		marginRight: "0.5rem",
		fontWeight: "bold",
		fontSize: "1.2rem",
		color: "#000",
	},
	textStyle: {
		color: "#000",
	},
	modalStyle: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "90%",
		maxWidth: 500,
		background: "#fff",
		padding: "1rem",
		borderRadius: "4px",
	},
};

type EntryProps = {
	participant: Participant;
	id: number;
};

const Entry: React.FC<EntryProps> = ({ participant, id }) => {
	const { user, setUser } = useContext(UserContext);
	const [isFading, setIsFading] = useState(false);

	useEffect(() => {
		// Check if the user has voted for this country
		if (user && !user.votes.has(participant.country)) {
			// Copy map, add, and set state
			const copy = new Map(user.votes);
			copy.set(participant.country, 5);
			setUser({ ...user, votes: copy });
		}
	}, []);

	const handleMove = (clientX: number) => {
		const entryDiv = document.querySelector(`[data-entry-id="${id}"]`) as HTMLElement | null;
		if (!entryDiv) return;

		const rect = entryDiv.getBoundingClientRect();
		const divWidth = rect.width;
		const offsetX = clientX - rect.left;

		const ratingValue = Math.min(10, Math.max(1, Math.floor((offsetX / divWidth) * 11)));

		const copy = new Map(user.votes);
		copy.set(participant.country, ratingValue);
		const updatedUser = { ...user, votes: copy };
		setUser(updatedUser);
		updateVotesInUser(updatedUser);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		const touch = e.touches[0];
		handleMove(touch.clientX);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (e.buttons === 1) {
			handleMove(e.clientX);
		}
	};

	const handleStart = () => {
		setIsFading(true);
	};

	const handleEnd = () => {
		setIsFading(false);
	};

	return (
		<Box
			sx={{ position: "relative", userSelect: "none", WebkitUserSelect: "none" }} // Prevent text selection
		>
			<Box
				sx={{
					padding: "0.5rem",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					opacity: isFading ? 0.2 : 1,
					transition: "opacity 0.3s ease",
					position: "relative",
				}}
				onMouseDown={(e) => {
					const startY = e.clientY;
					const timeout = setTimeout(() => handleStart(), 100); // Require pressing for 500ms
					(Box as any).mouseDownTimeout = timeout;
					(Box as any).startY = startY;
				}}
				onMouseMove={(e) => {
					if (e.buttons === 1) {
						const startY = (Box as any).startY;
						if (Math.abs(e.clientY - startY) > 10) {
							clearTimeout((Box as any).mouseDownTimeout);
						}
						if (isFading) handleMouseMove(e);
					}
				}}
				onMouseUp={() => {
					clearTimeout((Box as any).mouseDownTimeout);
					handleEnd();
				}}
				onTouchStart={(e) => {
					if (e.touches.length === 1) {
						const startY = e.touches[0].clientY;
						const timeout = setTimeout(() => handleStart(), 100); // Require pressing for 500ms
						(Box as any).touchStartTimeout = timeout;
						(Box as any).startY = startY;
					}
				}}
				onTouchMove={(e) => {
					if (e.touches.length === 1) {
						const startY = (Box as any).startY;
						if (Math.abs(e.touches[0].clientY - startY) > 10) {
							clearTimeout((Box as any).touchStartTimeout);
						}
						if (isFading) handleTouchMove(e);
					}
				}}
				onTouchEnd={(e) => {
					if (e.changedTouches.length === 1) {
						clearTimeout((Box as any).touchStartTimeout);
						handleEnd();
					}
				}}
				onMouseLeave={() => {
					clearTimeout((Box as any).mouseDownTimeout);
					handleEnd();
				}}
			>
				{/* Touchable overlay */}
				<Box
					data-entry-id={id}
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "85%",
						height: "100%",
						zIndex: 10,
					}}
				/>

				<Box sx={{ ...styles.flexStyle }}>
					<Box sx={styles.orderStyle}>
						<Box sx={styles.orderContainerStyle}>
							<Box>
								<Typography
									sx={{
										...styles.orderStyle,
										fontWeight: "bold",
										fontSize: "2rem",
										padding: "1rem",
									}}
									variant="h4"
								>
									{toStringWithZeroPadding(participant.order + 1)}
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box sx={styles.boxStyle}>
						<Typography
							sx={{
								color: "gray",
								fontWeight: "bold",
								margin: "0",
								lineHeight: "1",
							}}
							variant="subtitle1"
						>
							{participant.country}
						</Typography>
						<Typography
							sx={{
								color: "black",
								fontWeight: "bold",
								lineHeight: "1",
							}}
							variant="h5"
						>
							{participant.title}
						</Typography>
						<Typography
							sx={{ color: "gray", lineHeight: "1" }}
							variant="subtitle1"
						>
							{participant.artist}{" "}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						...styles.boxStyle,
						...styles.starsSectionStyle,
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							position: "relative",
							width: "3rem",
							height: "3rem",
							marginRight: "0.5rem",
						}}
					>
						<svg
							viewBox="0 0 36 36"
							style={{
								position: "absolute",
								transform: "rotate(-90deg)",
								width: "100%",
								height: "100%",
							}}
						>
							<circle
								cx="18"
								cy="18"
								r="15.9155"
								fill="none"
								stroke="#e0e0e0"
								strokeWidth="3"
							/>
							<circle
								cx="18"
								cy="18"
								r="15.9155"
								fill="none"
								stroke={
									(user.votes.get(participant.country) ?? 5) > 9
										? "gold"
										: (user.votes.get(participant.country) ?? 5) > 6
										? "green"
										: (user.votes.get(participant.country) ?? 5) > 3
										? "orange"
										: "red"
								}
								strokeWidth="3"
								strokeDasharray={`${(user.votes.get(participant.country) ?? 5) * 10}, 100`}
								strokeLinecap="round"
							/>
						</svg>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "2rem",
								height: "2rem",
							}}
						>
							<Typography
								variant="h6"
								color="textPrimary"
								sx={{
									fontWeight: "bold",
									fontSize: "1.25rem",
								}}
							>
								{user.votes.get(participant.country) ?? 5}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>

			{isFading && (
				<Box
					sx={{
						width: "85%",
						display: "flex",
						justifyContent: "start",
						position: "absolute",
						pointerEvents: "none",
						boxSizing: "border-box",
						margin: "0 2rem",
						top: 0,
					}}
				>
					{Array.from({ length: 10 }).map((_, index) => (
						<Box
							key={index}
							sx={{
								width: "10%",
								maxWidth: "10%",
								boxSizing: "border-box",
								aspectRatio: "1/1",
								borderRadius: "50%",
							}}
						>
							<MdStar
								style={{
									boxSizing: "border-box",
									width: "100%",
									color: index < (user.votes.get(participant.country) ?? 5) ? "gold" : "lightgray",
								}}
							/>
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
};
{/* value={user.votes.get(participant.country) ?? 5} */}

const EntryList: React.FC = () => {
	const { participants, currentlyPlaying } = useContext(ParticipantContext);
	const [previouslyPlayedParticipants, setPreviouslyPlayedParticipants] = useState<Participant[]>([]);

	useEffect(() => {
		if (!currentlyPlaying || !participants) return;

		// Get participants that have already been played
		const playedParticipants = participants.filter(
			(p) => p.order < currentlyPlaying.order
		);

		setPreviouslyPlayedParticipants(playedParticipants);
	}, [participants, currentlyPlaying]);

	return (
		<Box sx={{ minHeight: "60vh", padding: "0rem" }}>
			{previouslyPlayedParticipants.map((participant, index) => (
				<React.Fragment key={participant.order}>
					<Entry participant={participant} id={index} />
					<Divider sx={{ width: "95%", margin: "0.5rem auto", backgroundColor: "#ccc" }} />
				</React.Fragment>
			))}
		</Box>
	);
};

export default EntryList;
