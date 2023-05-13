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
	isPercentageBased?: boolean;
};

export type AchievmentResult = {
	// Ordered as 0,1,2 is place 1,2,3
	names: Array<string>; // Player names/song names
	scores: Array<number>; // Score
};

export const ACHIEVMENTS: Achievment[] = [
	{
		key: "drunk",
		title: "En för många bärtz 🍻",
		descriptor: "De som gav mest poäng overall är...",
	},
	{
		key: "snol",
		title: "Tuffaste kritikern 🥇",
		descriptor: "De som gav minst poäng overall är...",
	},
	{
		key: "racist",
		title: "Big fan av Engelska 😡",
		descriptor:
			"De som gav minst andel av sina poäng till bidrag som inte sjungs på engelska",
		isPercentageBased: true,
	},
	{
		key: "kultur",
		title: "Kulturerad 🌏🧺",
		descriptor:
			"De som gav störst andel av sina poäng till låtar som inte sjungs på engelska",
		isPercentageBased: true,
	},
	{
		key: "basicBitch",
		title: "ICA Basic 😂",
		descriptor: "Gav mest poäng till låtarna i top halvan av bettingen",
		isPercentageBased: true,
	},
	{
		key: "hipster",
		title: "Hipsterino 🪕",
		descriptor: "Gav mest poäng till låtarna i top halvan av bettingen",
		isPercentageBased: true,
	},
	{
		key: "bottom3",
		title: "Våra losers! 🦀🦀🦀",
		descriptor: "Bidragen med minst total poäng är...",
	},
	{
		key: "top3",
		title: "Våra vinnare! 🏅🏅🏅",
		descriptor: "Bidragen vi gillade mest...",
	},
	{
		key: "worstTaste",
		title: "Smaklös 🤮",
		descriptor: "Individen med mest annorlunda score från mig (Max)",
	},
];

export type PlayerAndScore = {
	name: string;
	score: number;
};
