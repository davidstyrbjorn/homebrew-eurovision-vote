import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import QuestionSubmitPrompt from "../components/QuestionSubmitPrompt";
import { ParticipantContext } from "../contexts/ParticipantContext";
import { QuestionContext } from "../contexts/QuestionContext";
import { UserContext } from "../contexts/UserContext";
import CurrentlyPlaying from "./../components/CurrentlyPlaying";
import EntryList from "./../components/EntryList";
import AdminView from "./AdminView";
import LoginView from "./LoginView";
import AchievementView from "./AchievementView";

const HomeView: React.FC<{}> = () => {
	const { user, isMax, isAch } = useContext(UserContext);
	const { currentlyPlaying } = useContext(ParticipantContext);
	const { questionActive } = useContext(QuestionContext);

	if (isAch) return <AchievementView />;
	if (isMax) return <AdminView />;
	if (user.name == "") return <LoginView />;
	return (
		<>
			{currentlyPlaying && (
				<Box
					sx={{
						maxWidth: "600px",
						margin: "auto",
						overflowX: "hidden",
					}}
				>
					<QuestionSubmitPrompt />

					<Typography
						className="questionRoom"
						variant="subtitle1"
						color="white"
						padding="0rem 1rem"
						marginTop={questionActive ? "0" : "-340px"}
					/>

					<Box
						sx={{
							margin: "2rem",
							animation: "beat 1s infinite",
							"@keyframes beat": {
								"0%, 100%": {
									transform: "scale(1)",
									boxShadow: "0 0 10px #FFD700", // Gold
								},
								"50%": {
									transform: "scale(1.01)",
									boxShadow: "0 0 20px #FF69B4", // Hot Pink
								},
							},
						}}
					>
						<CurrentlyPlaying participant={currentlyPlaying!} />
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							border: "2px solid #d2d2d2",
							borderRadius: "4px",
							background: "linear-gradient(100deg, rgb(242, 242, 242) 100%)",
						}}
					>
						<EntryList />
					</Box>
				</Box>
			)}
		</>
	);
};

export default HomeView;
