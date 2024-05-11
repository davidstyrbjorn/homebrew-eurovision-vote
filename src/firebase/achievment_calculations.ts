// All our functions for calculating achievments

import { KEY, Participant, PlayerAndScore, User } from "../types";

// Helpers
// this gives descending order i.e 0 is highst
// a.score < b.score ? 1 : -1
const sortForHighest = (list: PlayerAndScore[]): PlayerAndScore[] => {
	// Sort descending
	return list.sort((a, b) => (a.score > b.score ? -1 : 1));
};

// this gives ascending order i.e 0 is lowest
// a.score > b.score ? 1 : -1
const sortForLowest = (list: PlayerAndScore[]): PlayerAndScore[] => {
	// Sort ascending
	return list.sort((a, b) => (a.score > b.score ? 1 : -1));
};

const roundToDecimal3Points = (num: number) => {
	return Math.round(num * 1000) / 1000;
};

const mostDrunk = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let playersAndTheirTotal: PlayerAndScore[] = [];

	for (let i = 0; i < users.length; i++) {
		const newTotal: PlayerAndScore = {
			name: users[i].name,
			score: 0,
		};
		// Go through each participant, get total score given, then save
		participants.forEach((p) => {
			newTotal.score += users[i].votes.get(p.country)!;
		});
		playersAndTheirTotal.push(newTotal);
	}

	// Sort to easily get top 3
	playersAndTheirTotal = sortForHighest(playersAndTheirTotal);

	return playersAndTheirTotal;
};

// Lowest overall
const snolJavel = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let playersAndTheirTotal: PlayerAndScore[] = [];

	for (let i = 0; i < users.length; i++) {
		const newTotal: PlayerAndScore = {
			name: users[i].name,
			score: 0,
		};
		// Go through each participant, get total score given, then save
		participants.forEach((p) => {
			newTotal.score += users[i].votes.get(p.country)!;
		});
		playersAndTheirTotal.push(newTotal);
	}

	// Sort to easily get bottom 3
	playersAndTheirTotal = sortForLowest(playersAndTheirTotal);

	return playersAndTheirTotal;
};

// Rasisten : spelaren som gav minst poäng till låtar som inte sjungs på engelska
const racist = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	// calc calc
	let playersAndTheirTotal: PlayerAndScore[] = [];

	for (let i = 0; i < users.length; i++) {
		const newTotal: PlayerAndScore = {
			name: users[i].name,
			score: 0,
		};
		let totalGivenScore = 0;
		// Go through each participant, get total score given, then save
		participants.forEach((p) => {
			// Only take songs that are NOT in english into account
			if (p.language.toLocaleLowerCase() != "english")
				newTotal.score += users[i].votes.get(p.country)!;
			totalGivenScore += users[i].votes.get(p.country)!;
		});

		// Normalize against their total given score
		newTotal.score /= totalGivenScore;
		newTotal.score = roundToDecimal3Points(newTotal.score);
		playersAndTheirTotal.push(newTotal);
	}

	// Sort for bottom 3
	playersAndTheirTotal = sortForLowest(playersAndTheirTotal);

	return playersAndTheirTotal;
};

// Kultur tanten : spelaren som gav mest poäng till låtar som inte sjungs på engelska
const kulturTanten = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let playersAndTheirTotal: PlayerAndScore[] = [];

	for (let i = 0; i < users.length; i++) {
		const newTotal: PlayerAndScore = {
			name: users[i].name,
			score: 0,
		};
		let totalGivenScore = 0;
		// Go through each participant, get total score given, then save
		participants.forEach((p) => {
			// Only take songs that are NOT in english into account
			if (p.language.toLocaleLowerCase() != "english")
				newTotal.score += users[i].votes.get(p.country)!;
			totalGivenScore += users[i].votes.get(p.country)!;
		});
		newTotal.score /= totalGivenScore;
		newTotal.score = roundToDecimal3Points(newTotal.score);
		playersAndTheirTotal.push(newTotal);
	}

	playersAndTheirTotal = sortForHighest(playersAndTheirTotal);

	return playersAndTheirTotal;
};

// Sverige vänn : spelaren som gav mest poäng till slick svensk röv gruppen
const sverigeVan = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let playersAndTheirTotal: PlayerAndScore[] = [];

	for (let i = 0; i < users.length; i++) {
		const newTotal: PlayerAndScore = {
			name: users[i].name,
			score: 0,
		};
		let totalGivenScore = 0;
		// Go through each participant, get total score given, then save
		participants.forEach((p) => {
			// Only take songs that are in the group "slick svensk röv gruppen"
			if (p.block.toLocaleLowerCase() == "slicka svensk röv")
				newTotal.score += users[i].votes.get(p.country)!;
			totalGivenScore += users[i].votes.get(p.country)!;
		});

		newTotal.score /= totalGivenScore;
		newTotal.score = roundToDecimal3Points(newTotal.score);
		playersAndTheirTotal.push(newTotal);
	}

	playersAndTheirTotal = sortForHighest(playersAndTheirTotal);

	return playersAndTheirTotal;
};

const basicBitch = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let playersAndTheirTotal: PlayerAndScore[] = [];

	users.forEach((u) => {
		let newTotal: PlayerAndScore = {
			name: u.name,
			score: 0,
		};
		let totalGivenScore = 0;
		for (let i = 0; i < participants.length; i++) {
			if (participants[i].block == "Top 13") {
				newTotal.score += u.votes.get(participants[i].country)!;
			}
			totalGivenScore += u.votes.get(participants[i].country)!;
		}

		newTotal.score /= totalGivenScore;
		newTotal.score = roundToDecimal3Points(newTotal.score);
		playersAndTheirTotal.push(newTotal);
	});

	playersAndTheirTotal = sortForHighest(playersAndTheirTotal);
	return playersAndTheirTotal;
};

const hipster = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let playersAndTheirTotal: PlayerAndScore[] = [];

	users.forEach((u) => {
		let newTotal: PlayerAndScore = {
			name: u.name,
			score: 0,
		};
		let totalGivenScore = 0;
		for (let i = 0; i < participants.length; i++) {
			if (participants[i].block == "Bot 13") {
				newTotal.score += u.votes.get(participants[i].country)!;
			}
			totalGivenScore += u.votes.get(participants[i].country)!;
		}

		newTotal.score /= totalGivenScore;
		newTotal.score = roundToDecimal3Points(newTotal.score);
		playersAndTheirTotal.push(newTotal);
	});

	playersAndTheirTotal = sortForHighest(playersAndTheirTotal);
	return playersAndTheirTotal;
};

// Sämst smak :puke: : personen med mest annorlunda score från mig (max),
const worstTaste = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	const maxName = "max";
	// Find max from users and extract
	const indexMax = users.findIndex((u) => u.name == maxName);
	const max = [...users].splice(indexMax)[0];

	// Calculate max total
	let maxTotal = 0;
	participants.forEach((p) => {
		maxTotal += max.votes.get(p.country)!;
	});

	// Calculate every other players total and the difference from max total score
	let playersAndTheirDiff: PlayerAndScore[] = [];

	// Go through each player, accumulate their scores and calc their difference from max then save that
	users.forEach((u) => {
		let acc = 0;
		participants.forEach((p) => {
			acc += u.votes.get(p.country)!;
		});
		// Record diff
		let diff = Math.abs(acc - maxTotal);
		playersAndTheirDiff.push({
			name: u.name,
			score: diff,
		});
	});

	playersAndTheirDiff = sortForHighest(playersAndTheirDiff);

	return playersAndTheirDiff;
};

// Vår vinnare! : låten med mest poäng
const top3Songs = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let songAndTheirTotal: PlayerAndScore[] = [];

	// Go through each sont and accumulate their points from each participant
	participants.forEach((p) => {
		let song: PlayerAndScore = {
			name: p.artist + " | " + p.country,
			score: 0,
		};
		users.forEach((u) => {
			song.score += u.votes.get(p.country)!;
		});
		// Add to array
		songAndTheirTotal.push(song);
	});

	// Sort and return
	songAndTheirTotal = sortForHighest(songAndTheirTotal);

	return songAndTheirTotal;
};

// Våra förlorare! : låtarna med minst poäng
const bottom3Songs = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let songAndTheirTotal: PlayerAndScore[] = [];

	// Go through each sont and accumulate their points from each participant
	participants.forEach((p) => {
		let song: PlayerAndScore = {
			name: p.artist + " | " + p.country,
			score: 0,
		};
		users.forEach((u) => {
			song.score += u.votes.get(p.country)!;
		});
		// Add to array
		songAndTheirTotal.push(song);
	});

	// Sort and return
	songAndTheirTotal = sortForLowest(songAndTheirTotal);

	return songAndTheirTotal;
};

const girlsboss = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let playersAndTheirTotal: PlayerAndScore[] = [];

	users.forEach((u) => {
		let newTotal: PlayerAndScore = {
			name: u.name,
			score: 0,
		};
		let totalGivenScore = 0;
		for (let i = 0; i < participants.length; i++) {
			if (participants[i].region == "girl") {
				newTotal.score += u.votes.get(participants[i].country)!;
			}
			totalGivenScore += u.votes.get(participants[i].country)!;
		}

		newTotal.score /= totalGivenScore;
		newTotal.score = roundToDecimal3Points(newTotal.score);
		playersAndTheirTotal.push(newTotal);
	});

	playersAndTheirTotal = sortForHighest(playersAndTheirTotal);
	return playersAndTheirTotal;
};

const mansgris = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let playersAndTheirTotal: PlayerAndScore[] = [];

	users.forEach((u) => {
		let newTotal: PlayerAndScore = {
			name: u.name,
			score: 0,
		};
		let totalGivenScore = 0;
		for (let i = 0; i < participants.length; i++) {
			if (participants[i].region == "man") {
				newTotal.score += u.votes.get(participants[i].country)!;
			}
			totalGivenScore += u.votes.get(participants[i].country)!;
		}

		newTotal.score /= totalGivenScore;
		newTotal.score = roundToDecimal3Points(newTotal.score);
		playersAndTheirTotal.push(newTotal);
	});

	playersAndTheirTotal = sortForHighest(playersAndTheirTotal);
	return playersAndTheirTotal;
};

const progressiv = (
	participants: Participant[],
	users: User[]
): PlayerAndScore[] => {
	let playersAndTheirTotal: PlayerAndScore[] = [];

	users.forEach((u) => {
		let newTotal: PlayerAndScore = {
			name: u.name,
			score: 0,
		};
		let totalGivenScore = 0;
		for (let i = 0; i < participants.length; i++) {
			if (participants[i].region == "unspecified") {
				newTotal.score += u.votes.get(participants[i].country)!;
			}
			totalGivenScore += u.votes.get(participants[i].country)!;
		}

		newTotal.score /= totalGivenScore;
		newTotal.score = roundToDecimal3Points(newTotal.score);
		playersAndTheirTotal.push(newTotal);
	});

	playersAndTheirTotal = sortForHighest(playersAndTheirTotal);
	return playersAndTheirTotal;
};

type ValueType = (
	participants: Participant[],
	users: User[]
) => PlayerAndScore[];
export const keyToFunctionAchievment = new Map<KEY, ValueType>([
	["drunk", mostDrunk],
	["snol", snolJavel],
	["racist", racist],
	["kultur", kulturTanten],
	["worstTaste", worstTaste],
	["top3", top3Songs],
	["bottom3", bottom3Songs],
	["basicBitch", basicBitch],
	["hipster", hipster],
	["girlboss", girlsboss],
	["mansgris", mansgris],
	["progressiv", progressiv],
]);
