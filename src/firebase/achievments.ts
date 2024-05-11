/*
The achievment screen wants to inevitable do something like this
> const arrayOfWinners = await getAchievment('key');
> ... use this array of winners display etc

Should the function load every participant each time? 
The best solution is if the admin can click "calc all achievments"
A function goes through each achievment key, calculates array of winners
and then stores that away somewhere? probably in the admin collection and then 
we could have the getAchievment function just load the array of winners for that key!
*/

import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase.config";
import {
	ACHIEVMENTS,
	FirebaseResult,
	KEY,
	Participant,
	PlayerAndScore,
	User,
} from "../types";
import { keyToFunctionAchievment } from "./achievment_calculations";
import { getParticipantsFromFirestore } from "./participants";
import { getAllUsers } from "./user";

// "Statically" pre-calc all achievment results and store them in firebase for later usage
const calculateAllAchievments = async (): Promise<FirebaseResult> => {
	// Load all participants and users
	const participants: Participant[] = await getParticipantsFromFirestore();
	const users: User[] = await getAllUsers();

	const achievmentMap = new Map<KEY, PlayerAndScore[]>();

	// For each achievment key, call the corresponding function, passing participants + users
	Promise.all([
		ACHIEVMENTS.forEach(async (ach) => {
			const result = keyToFunctionAchievment.get(ach.key)!(
				[...participants],
				[...users]
			);
			achievmentMap.set(ach.key, result); // Insert into our map
		}),
	]);

	// Push the map to DB
	const ref = doc(db, "admin", "admin");
	const objMap = {};
	achievmentMap.forEach((value, key) => {
		// @ts-ignore
		objMap[key] = value;
	});
	await updateDoc(ref, {
		achievements: objMap,
	});

	// If we got here everyrhing went well!
	return {
		code: 200,
	};
};

const getAchievmentWinners = async (key: KEY): Promise<string[]> => {
	return [];
};

export { calculateAllAchievments, getAchievmentWinners };
