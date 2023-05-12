import { db } from "../firebase.config";
import participants from "../euro2022.json";
import { collection, doc, getDocs, writeBatch } from "@firebase/firestore";
import { Participant } from "../types";

const syncParticipantsWithFirestore = async () => {
	try {
		const batch = writeBatch(db);
		// Grab ref, and create btach
		participants.forEach((entry, idx) => {
			const newDocRef = doc(collection(db, "participants"));
			batch.set(newDocRef, {
				artist: entry.artist,
				block: entry.block,
				country: entry.country,
				language: entry.language,
				region: entry.region,
				title: entry.title,
				order: idx,
			});
		});

		batch.commit();
	} catch (e) {
		console.log("Batch failed: ", e);
	}
};

const getParticipantsFromFirestore = async () => {
	const querySnapshot = await getDocs(collection(db, "participants"));
	const result: Participant[] = [];
	querySnapshot.forEach((doc) => {
		result.push(doc.data() as Participant);
	});

	return result;
};

export { syncParticipantsWithFirestore, getParticipantsFromFirestore };
