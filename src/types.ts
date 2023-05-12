import React from "react";

export type User = {
	name: string;
	votes: Map<string, number>; // country to rating
};

export type Participant = {
	artist: string;
	block: string;
	country: string;
	language: string;
	region: string;
	title: string;
	order: number;
};

export type UserContextType = {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	loginAsUser: (name: string) => Promise<void>;
	isMax: boolean;
	setIsMax: React.Dispatch<React.SetStateAction<boolean>>;
	isAch: boolean;
	setIsAch: React.Dispatch<React.SetStateAction<boolean>>;
	users: User[];
};

export type ParticipantContextType = {
	participants: Array<Participant>;
	currentlyPlaying: Participant | undefined;
	selectedParticipant: Participant | null;
	setSelectedParticipant: React.Dispatch<
		React.SetStateAction<Participant | null>
	>;
};

export type QuestionSubmission = {
	answer: string;
	groupName: string;
	timeRemaining: number;
};

export type QuestionContextType = {
	questionActive: boolean;
	questionStartTime: number;
	allowedSecondsToAnswer: number;
	submitAnswer: (qs: QuestionSubmission) => void;
};

export type AchievmentContextType = {
	achievmentsMap: Map<KEY, PlayerAndScore[]>;
	currentKey: KEY;
	switchKey: (key: KEY) => void;
};

export type FirebaseResult = {
	code?: number;
	message?: string;
};

// ACHIEVMENT RELATED
export type KEY =
	| "drunk"
	| "snol"
	| "racist"
	| "kultur"
	| "hipster"
	| "basicBitch"
	| "worstTaste"
	| "top3"
	| "bottom3";

export type Achievment = {
	key: KEY;
	title: string;
	descriptor: string;
};

export type AchievmentResult = {
	// Ordered as 0,1,2 is place 1,2,3
	names: Array<string>; // Player names/song names
	scores: Array<number>; // Score
};

export const ACHIEVMENTS: Achievment[] = [
	{
		key: "drunk",
		title: "Har druckit för mycket 🍻",
		descriptor: "Spelaren som gav mest poäng overall",
	},
	{
		key: "snol",
		title: "Snålaste jäveln 💰",
		descriptor: "Spelaren som gav minst poäng overall",
	},
	{
		key: "racist",
		title: "Din jävla jäkel 😡",
		descriptor:
			"Spelaren som gav minst poäng till bidrag som inte framträdes på engelska",
	},
	{
		key: "kultur",
		title: "Kultur tanten 👵",
		descriptor:
			"spelaren som gav mest poäng till låtar som inte sjungs på engelska",
	},
	{
		key: "basicBitch",
		title: "Basic Bitch",
		descriptor:
			"Spelaren som gav mest poäng till låtarna i top halvan av bettingen",
	},
	{
		key: "hipster",
		title: "Hipster",
		descriptor:
			"Spelaren som gav mest poäng till låtarna i top halvan av bettingen",
	},
	{
		key: "top3",
		title: "Våra vinnare! 🏅🏅🏅",
		descriptor: "Låtarna med högt poäng overall",
	},
	{
		key: "bottom3",
		title: "Våra losers! 🦀🦀🦀",
		descriptor: "Låtarna med minst poäng overall",
	},
	{
		key: "worstTaste",
		title: "Sämst smak 🤮",
		descriptor: "personen med mest annorlunda score från mig (max)",
	},
];

export type PlayerAndScore = {
	name: string;
	score: number;
};
