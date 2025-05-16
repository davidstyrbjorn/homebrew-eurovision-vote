import { Backdrop, Box, SxProps, Typography, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AiFillTrophy } from "react-icons/ai";
import { BiMedal } from "react-icons/bi";
import { AchievmentsContext } from "../contexts/AchievmentsContext";
import { Achievment, ACHIEVMENTS } from "../types";

const containerStyle: SxProps = {
	display: "flex",
	flexDirection: "column",
	padding: { xs: "0.5rem", md: "1.5rem 2.5rem" },
	justifyContent: "center",
	alignItems: "center",
	color: "white",
	gap: { xs: 1, md: 2 },
};

const iconStyle = {
	display: "inline-block",
	verticalAlign: "middle",
	paddingBottom: "0.25rem",
	fontSize: 40,
};

const podiumColors = [
	"#FFD700", // gold
	"#C0C0C0", // silver
	"#CD7F32", // bronze
];

const cardStyle: SxProps = {
	background: "rgba(255,255,255,0.10)",
	borderRadius: "1.25rem",
	boxShadow: "0 2px 12px 0 rgba(0,0,0,0.18)",
	padding: { xs: "0.7rem 0.7rem", md: "1.1rem 1.7rem" },
	margin: { xs: "0.3rem", md: "0.7rem" },
	minWidth: { xs: 120, md: 180 },
	maxWidth: { xs: 180, md: 260 },
	textAlign: "center",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: { xs: "0.3rem", md: "0.7rem" },
};

const AchievementView: React.FC<{}> = () => {
	const { achievmentsMap, currentKey } = useContext(AchievmentsContext);
	const [currentAchievment, setCurrentAchievment] = useState<Achievment>({
		descriptor: "",
		key: "bottom3",
		title: "",
		showAll: true,
	});
	const [toFadeOut, setToFadeOut] = useState(false);
	const [first, setFirst] = useState("");
	const [second, setSecond] = useState("");
	const [third, setThird] = useState("");
	const isMobile = useMediaQuery("(max-width:600px)");

	useEffect(() => {
		setCurrentAchievment(ACHIEVMENTS.find((ach) => ach.key == currentKey)!);
		let newAchievment = ACHIEVMENTS.find((ach) => ach.key == currentKey)!;
		if (newAchievment.showAll) {
			setToFadeOut(true);
			setTimeout(() => {
				setToFadeOut(false);
			}, 1200);
		} else {
			setToFadeOut(true);
			setTimeout(() => {
				setFirst("");
				setSecond("");
				setThird("");
				setToFadeOut(false);
				setTimeout(() => {
					setFirst("trigger-pedistal");
					setSecond("trigger-pedistal");
					setThird("trigger-pedistal");
				}, 300);
			}, 1200);
		}
	}, [currentKey]);

	const getScoreFromPlacement = (index: number): string => {
		if (currentAchievment.isPercentageBased) {
			return (
				(achievmentsMap.get(currentAchievment.key)![index].score * 100)
					.toFixed(1)
					.toString() + "%"
			);
		}
		return achievmentsMap.get(currentAchievment.key)![index].score.toString();
	};

	const renderPodium = () => {
		const data = achievmentsMap.get(currentAchievment.key) || [];
		return (
			<Box
				display="flex"
				flexDirection={isMobile ? "column" : "row"}
				alignItems="flex-end"
				justifyContent="center"
				gap={isMobile ? 1.5 : 4}
				mb={isMobile ? 1 : 2}
			>
				{/* 2nd place */}
				{data[1] && (
					<Box
						sx={{
							...cardStyle,
							background: podiumColors[1],
							color: "#222",
							minHeight: 120,
							zIndex: 1,
						}}
						className={`second ${second}`}
					>
						<BiMedal style={{ ...iconStyle, color: podiumColors[1] }} />
						<Typography variant="h4" fontWeight="bold">
							{data[1].name}
						</Typography>
						<Typography variant="h5">{getScoreFromPlacement(1)}</Typography>
						<Typography variant="subtitle2">2nd</Typography>
					</Box>
				)}
				{/* 1st place */}
				{data[0] && (
					<Box
						sx={{
							...cardStyle,
							background: podiumColors[0],
							color: "#222",
							minHeight: 160,
							transform: isMobile ? undefined : "scale(1.15)",
							zIndex: 2,
						}}
						className={`first ${first}`}
					>
						<AiFillTrophy style={{ ...iconStyle, color: podiumColors[0] }} />
						<Typography variant="h3" fontWeight="bold">
							{data[0].name}
						</Typography>
						<Typography variant="h4">{getScoreFromPlacement(0)}</Typography>
						<Typography variant="subtitle2">1st</Typography>
					</Box>
				)}
				{/* 3rd place */}
				{data[2] && (
					<Box
						sx={{
							...cardStyle,
							background: podiumColors[2],
							color: "#222",
							minHeight: 100,
							zIndex: 1,
						}}
						className={`third ${third}`}
					>
						<BiMedal style={{ ...iconStyle, color: podiumColors[2] }} />
						<Typography variant="h5" fontWeight="bold">
							{data[2].name}
						</Typography>
						<Typography variant="h6">{getScoreFromPlacement(2)}</Typography>
						<Typography variant="subtitle2">3rd</Typography>
					</Box>
				)}
			</Box>
		);
	};

	const renderAll = () => {
		const data = achievmentsMap.get(currentAchievment.key) || [];
		if (data.length > 3) {
			// Render as a multi-column stack with reveal animation, no header, all entries same size
			const columns = isMobile ? 1 : data.length > 12 ? 3 : 2;
			const rowsPerCol = Math.ceil(data.length / columns);
			const columnsArr = Array.from({ length: columns }, (_, colIdx) =>
				data.slice(colIdx * rowsPerCol, (colIdx + 1) * rowsPerCol)
			);
			return (
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: 2,
						width: "100%",
						maxHeight: { xs: "55vh", md: "60vh" },
						overflowY: "auto",
						padding: { xs: "0.5rem 0", md: "1rem 0" },
						justifyContent: "center",
					}}
				>
					{columnsArr.map((col, colIdx) => (
						<Box key={colIdx} sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
							{col.map((toDisplay, i) => {
								const globalIdx = colIdx * rowsPerCol + i;
								return (
									<Box
										key={globalIdx}
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											background:
												globalIdx < 3
													? podiumColors[globalIdx]
													: "rgba(255,255,255,0.08)",
											color: globalIdx < 3 ? "#222" : "#fff",
											borderRadius: "0.7rem",
											mb: 0,
											px: 2,
											py: 1.2,
											boxShadow:"0 2px 12px 0 rgba(0,0,0,0.18)",
											animation: `fadeInUp 0.5s ease ${2 + globalIdx * 0.25}s both`,
											minHeight: 48,
											maxHeight: 48,
										}}
									>
										
										<Typography sx={{ flex: 0.5, textAlign: "center", fontSize: 22, fontWeight: "bold" }}>
											{globalIdx + 1}
										</Typography>
										
										
										<Typography
											sx={{
												flex: 2,
												textAlign: "left",
												
												fontSize: 16,
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
											}}
										>
											{toDisplay.name}
										</Typography>
										<Typography
											sx={{
												flex: 1,
												textAlign: "center",
												fontSize: 16,
											}}
										>
											{getScoreFromPlacement(globalIdx)}
										</Typography>
									</Box>
								);
							})}
						</Box>
					))}
					<style>{`
			@keyframes fadeInUp {
				0% { opacity: 0; transform: translateY(30px); }
				100% { opacity: 1; transform: translateY(0); }
			}`}</style>
				</Box>
			);
		}
		// Fallback to card grid for 3 or fewer
		return (
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: { xs: 1, md: 2 },
					maxHeight: { xs: "55vh", md: "60vh" },
					overflowY: "auto",
					width: "100%",
					padding: { xs: "0.5rem 0", md: "1rem 0" },
				}}
			>
				{data.map((toDisplay, i) => (
					<Box
						key={i}
						sx={{
							...cardStyle,
							background: i < 3 ? podiumColors[i] : "rgba(255,255,255,0.08)",
							color: i < 3 ? "#222" : "#fff",
							border: i < 3 ? `2px solid ${podiumColors[i]}` : "1px solid #444",
							boxShadow: (i < 3 ? "0 8px 32px 0 rgba(0,0,0,0.35)" : "0 4px 24px 0 rgba(0,0,0,0.25)") as any,
						}}
					>
						{i === 0 && <AiFillTrophy style={{ ...iconStyle, color: podiumColors[0], fontSize: 36 }} />}
						{i === 1 && <BiMedal style={{ ...iconStyle, color: podiumColors[1], fontSize: 32 }} />}
						{i === 2 && <BiMedal style={{ ...iconStyle, color: podiumColors[2], fontSize: 32 }} />}
						<Typography variant={i < 3 ? "h5" : "body1"} fontWeight={i < 3 ? "bold" : undefined}>
							{toDisplay.name}
						</Typography>
						<Typography variant={i < 3 ? "h6" : "body2"}>{getScoreFromPlacement(i)}</Typography>
						{i < 3 && <Typography variant="subtitle2">{i + 1}st</Typography>}
					</Box>
				))}
			</Box>
		);
	};

	return (
		<Backdrop
			open={true}
			sx={{
				color: "#fff",
				zIndex: (theme) => theme.zIndex.drawer + 1,
				background: "linear-gradient(120deg, #1a1a40 60%, #4a148c 100%)",
			}}
		>
			<Box
				className={toFadeOut ? "trigger-fade-out" : "trigger-fade-in"}
				sx={{
					...containerStyle,
					margin: isMobile ? "0.5rem" : "3rem auto",
					borderRadius: "1.5rem",
					boxShadow: "0 4px 24px 0 rgba(0,0,0,0.35)",
					background: "rgba(30, 30, 60, 0.97)",
					padding: { xs: "0.5rem", md: "2rem 2.5rem" },
				}}
				height={isMobile ? undefined : "65vh"}
			>
				<Box
					className="trigger-title-in"
					display={"flex"}
					flexDirection="column"
					alignItems="center"
					mb={isMobile ? 1 : 2}
				>
					<Typography
						variant={isMobile ? "h4" : "h2"}
						color="white"
						sx={{ fontWeight: "bold", textAlign: "center", letterSpacing: 1.5, mb: isMobile ? 0.5 : 1 }}
					>
						{currentAchievment.title}
					</Typography>
					<Typography sx={{ color: "#e0e0e0", textAlign: "center", fontSize: isMobile ? 16 : 22 }} variant="h5">
						{currentAchievment.descriptor}
					</Typography>
				</Box>
				{currentAchievment.showAll ? renderAll() : renderPodium()}
			</Box>
		</Backdrop>
	);
};

export default AchievementView;
