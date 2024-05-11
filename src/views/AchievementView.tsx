import { Box, SxProps, Typography, Backdrop } from "@mui/material";
import React, {
	createRef,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { AiFillTrophy } from "react-icons/ai";
import { BiMedal } from "react-icons/bi";
import { AchievmentsContext } from "../contexts/AchievmentsContext";
import { Achievment, ACHIEVMENTS } from "../types";

const containerStyle: SxProps = {
	display: "flex",
	flexDirection: "column",
	padding: "2rem",
	justifyContent: "center",

	color: "white",
};

const iconStyle = {
	display: "inline-block",
	verticalAlign: "middle",
	paddingBottom: "1rem",
};

const AchievementView: React.FC<{}> = () => {
	const { achievmentsMap, currentKey } = useContext(AchievmentsContext);
	const [currentAchievment, setCurrentAchievment] = useState<Achievment>({
		descriptor: "",
		key: "bottom3",
		title: "",
	});
	const [toFadeOut, setToFadeOut] = useState(false);
	const [first, setFirst] = useState("");
	const [second, setSecond] = useState("");
	const [third, setThird] = useState("");

	useEffect(() => {
		setToFadeOut(true);
		// Reset class names to non trigger

		setTimeout(() => {
			setFirst("");
			setSecond("");
			setThird("");
			// Set some states
			console.log("CHANGING CURRENT ACHIEVMENT");
			setCurrentAchievment(
				ACHIEVMENTS.find((ach) => ach.key == currentKey)!
			);
			setToFadeOut(false);
			setTimeout(() => {
				// Set class names to trigger class
				setFirst("trigger-pedistal");
				setSecond("trigger-pedistal");
				setThird("trigger-pedistal");
			}, 300);
		}, 3000);
	}, [currentKey]);

	const getScoreFromPlacement = (index: number): string => {
		if (currentAchievment.isPercentageBased) {
			return (
				(achievmentsMap.get(currentAchievment.key)![index].score * 100)
					.toFixed(1)
					.toString() + "%"
			);
		}
		return achievmentsMap
			.get(currentAchievment.key)!
			[index].score.toString();
	};

	return (
		<Backdrop
			open={true}
			sx={{
				color: "#fff",
				zIndex: (theme) => theme.zIndex.drawer + 1,
				backgroundColor: "rgba(0, 0, 0, 0.4)",
			}}
		>
			<Box
				className={toFadeOut ? "trigger-fade-out" : "trigger-fade-in"}
				sx={{
					display: "flex",
					margin: "6rem",
					// justifyContent: "center",
					overflow: "hidden",
				}}
				height="70vh"
			>
				<Box
					className="trigger-title-in"
					display={"flex"}
					flexDirection="column"
					width="60%"
					justifyContent={"center"}
				>
					<Typography
						variant="h1"
						color="white"
						sx={{ fontSize: "180px", fontWeight: "bold" }}
					>
						{currentAchievment.title}
					</Typography>
					<Typography sx={{ color: "white" }} variant="h3">
						{currentAchievment.descriptor}
					</Typography>
				</Box>
				<Box sx={containerStyle}>
					<Box sx={{ padding: "4rem", width: "fit-content" }}>
						<Typography className={`first ${first}`} variant="h1">
							<AiFillTrophy style={iconStyle} />
							{achievmentsMap.get(currentAchievment.key)![0].name}
							: {getScoreFromPlacement(0)}
						</Typography>
						<Typography className={`second ${second}`} variant="h1">
							<BiMedal style={iconStyle} />
							{achievmentsMap.get(currentAchievment.key)![1].name}
							: {getScoreFromPlacement(1)}
						</Typography>
						<Typography className={`third ${third}`} variant="h1">
							<BiMedal style={iconStyle} />
							{achievmentsMap.get(currentAchievment.key)![2].name}
							: {getScoreFromPlacement(2)}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Backdrop>
	);
};

export default AchievementView;
