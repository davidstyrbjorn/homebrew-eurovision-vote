import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { syncParticipantsWithFirestore } from "../firebase/participants";

const containerStyle = {
	width: "85%",
	backgroundColor: "#fafafa",
	padding: " 1rem 1rem",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	maxWidth: "600px",
	margin: "auto",
	overflowX: "hidden",
	marginTop: "1rem",
};

const addedButtonStyle = {
	width: "100%",
	margin: "0.5rem 0",
};

const LoginView: React.FC<{}> = () => {
	const { loginAsUser, setIsMax, setIsAch } = useContext(UserContext);
	const [name, setName] = useState<string>("");
	const [foundStoredName, setFoundStoredName] = useState<boolean>(false);
	const [secretPhrase, setSecretPhrase] = useState<string>("");
	const SECRET = "super-max";

	const onSubmit = () => {
		if (name == "") return;
		// Update local storage
		localStorage.setItem("name", name);
		loginAsUser(name);
	};

	// Called when the user changes name, update state
	const onNameChange = (event: any) => {
		setName(event.target.value);
	};

	const onSecretChange = (event: any) => {
		setSecretPhrase(event.target.value);
		if (event.target.value == SECRET) {
			setIsMax(true);
		} else if (event.target.value == "ach") {
			setIsAch(true);
		}
	};

	useEffect(() => {
		// Check if local storage has a name already!
		const storedName = localStorage.getItem("name");
		if (storedName != null) {
			setName(storedName);
			setFoundStoredName(true);
		}
	}, []);

	return (
		<Box sx={containerStyle}>
			<Typography variant="h5" sx={{ fontWeight: "bold" }}>
				MARREVISION 2024
			</Typography>
			<Typography variant="subtitle1">
				{foundStoredName
					? "Hittade sparat namn! Använda gärna samma TACK (:"
					: "Skriv in ditt användarnamn (andra kommer se det senare)"}
			</Typography>
			<TextField
				sx={addedButtonStyle}
				id="outlined-basic"
				label="Username"
				value={name}
				onChange={onNameChange}
				variant="outlined"
				required
			/>
			<Button
				sx={addedButtonStyle}
				variant="contained"
				onClick={onSubmit}
			>
				TILL RÖSTNING!
			</Button>
			<TextField
				sx={addedButtonStyle}
				id="outlined-basic"
				label="FÖR MAX ÖGON ENDAST"
				value={secretPhrase}
				onChange={onSecretChange}
				variant="outlined"
			/>
		</Box>
	);
};

export default LoginView;
