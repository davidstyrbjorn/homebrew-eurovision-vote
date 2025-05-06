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

export type Group = {
	name: string;
	answer: string;
	timeRemaining: number;
	score: number;
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
	prompt: string;
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
	| "bottom3"
	| "girlboss"
	| "mansgris"
	| "progressiv";

export type Achievment = {
	key: KEY;
	title: string;
	descriptor: string;
	isPercentageBased?: boolean;
	showAll: boolean;
};

export const ACHIEVMENTS: Achievment[] = [
	{
		key: "girlboss",
		title: "Girlsboss 👯",
		descriptor: "Mest pooäng till bidrag framförd av en/flera kvinnor",
		isPercentageBased: true,
		showAll: false,
	},
	{
		key: "mansgris",
		title: "Mansgris 🐷🐖",
		descriptor: "Mest pooäng till bidrag framförd av en/flera män",
		isPercentageBased: true,
		showAll: false,
	},
	{
		key: "progressiv",
		title: "Progressiv 🌈🏳️‍🌈",
		descriptor:
			"Mest poäng till bidrag framförda av icke binära artister eller grupper med blandade kön",
		isPercentageBased: true,
		showAll: false,
	},
	{
		key: "drunk",
		title: "En för många 🍻",
		descriptor: "De som gav mest poäng overall är...",
		isPercentageBased: false,
		showAll: false,
	},
	{
		key: "snol",
		title: "Tuffaste kritikern 🥇",
		descriptor: "De som gav minst poäng overall är...",
		isPercentageBased: false,
		showAll: false,
	},
	{
		key: "racist",
		title: "Gillar Engelska",
		descriptor:
			"De som gav minst andel poäng till bidrag utförda på andra språk",
		isPercentageBased: true,
		showAll: false,
	},
	{
		key: "kultur",
		title: "Kulturerad 🌏🧺",
		descriptor:
			"De som gav störst andel av sina poäng till låtar som inte sjungs på engelska",
		isPercentageBased: true,
		showAll: false,
	},
	{
		key: "basicBitch",
		title: "ICA Basic 😂",
		descriptor: "Gav mest poäng till låtarna i top halvan av bettingen",
		isPercentageBased: true,
		showAll: false,
	},
	{
		key: "hipster",
		title: "Hipster 🪕",
		descriptor: "Gav mest poäng till låtarna i botten halvan av bettingen",
		isPercentageBased: true,
		showAll: false,
	},
	{
		key: "bottom3",
		title: "Förlorarna 🤢",
		descriptor: "Bidragen med minst total poäng är...",
		isPercentageBased: false,
		showAll: true,
	},
	{
		key: "top3",
		title: "Våra vinnare! 🏅🏅🏅",
		descriptor: "Bidragen med högst total poäng är...",
		isPercentageBased: false,
		showAll: true,
	},
	{
		key: "worstTaste",
		title: "Smaklös 🤮",
		descriptor: "Individen med mest annorlunda score från Max",
		isPercentageBased: false,
		showAll: false,
	},
];

export type PlayerAndScore = {
	name: string;
	score: number;
};
