import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import logo from "../Eurovision_Song_Contest.png";

const LoginView: React.FC<{}> = () => {
	const { loginAsUser, setIsMax, setIsAch } = useContext(UserContext);
	const [name, setName] = useState<string>("");
	const [foundStoredName, setFoundStoredName] = useState<boolean>(false);
	const [secretPhrase, setSecretPhrase] = useState<string>("");
	const SECRET = "super-max";

	const onSubmit = () => {
		if (name === "") return;
		localStorage.setItem("name", name);
		loginAsUser(name);
	};

	const onNameChange = (event: any) => {
		setName(event.target.value);
	};

	const onSecretChange = (event: any) => {
		setSecretPhrase(event.target.value);
		if (event.target.value === SECRET) {
			setIsMax(true);
		} else if (event.target.value === "ach") {
			setIsAch(true);
		}
	};

	useEffect(() => {
		const storedName = localStorage.getItem("name");
		if (storedName != null) {
			setName(storedName);
			setFoundStoredName(true);
		}
	}, []);

	return (
		<Box
			sx={{
				
				textAlign: "center",
				margin: "1rem auto",
				padding: "0.6rem 1rem",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				background: "linear-gradient(100deg, #e0e0e0 100%)",
				backgroundSize: "1250px",
				borderRadius: "4px",
				border: "2px solid #d2d2d2",
				maxWidth: "600px",
			}}
		>
			<img src={logo}></img>
			<Typography
				variant="subtitle1"
				sx={{
					color: "rgba(0, 0, 0, 0.8)",
					textAlign: "center",
					marginBottom: "1rem",
					textShadow: "1px 1px 3px rgba(255, 255, 255, 0.1)",
					fontFamily: "'Roboto', sans-serif",
				}}
			>
				{foundStoredName
					? "We found your saved name! Feel free to use it again. Thank you!"
					: "Enter your username (others will see it later)"}
			</Typography>
			<TextField
				sx={{
					width: "100%",
					margin: "0.5rem 0",
					backgroundColor: "#1a1a1a",
					border: "1px solid  #d3d3d3", // Light gray border
					boxShadow: "0px 2px 10px rgba(255, 255, 255, 0.1)",
					input: { color: "#ffffff" },
					label: { color: "#d1d1d1" },
				}}
				id="outlined-basic"
				label="Username"
				value={name}
				onChange={onNameChange}
				variant="filled"
				required
			/>
			<Button
				sx={{
					width: "100%",
					margin: "0.5rem 0",
					backgroundColor: "rgba(126, 0, 160, 1)",
					color: "#ffffff",
					fontWeight: "bold",
					padding: "0.75rem",
					border: "1px solid #d3d3d3", // Light gray border
					boxShadow: "0px 4px 15px rgba(126, 0, 160, .2)",
					fontFamily: "'Roboto', sans-serif",
					"&:hover": {
						backgroundColor: "#4d4d4d",
					},
				}}
				variant="contained"
				onClick={onSubmit}
				disabled={name === ""}
			>
				PROCEED TO VOTING
			</Button>
			<TextField
				sx={{
					width: "100%",
					margin: "0.5rem 0",
					backgroundColor: "#1a1a1a",
					border: "1px solid #d3d3d3", // Light gray border
					boxShadow: "0px 2px 10px rgba(255, 255, 255, 0.1)",
					input: { color: "#ffffff" },
					label: { color: "#d1d1d1" },
				}}
				id="outlined-basic"
				label="FOR MAX'S EYES ONLY"
				value={secretPhrase}
				onChange={onSecretChange}
				variant="filled"
			/>
		</Box>
	);
};

export default LoginView;
