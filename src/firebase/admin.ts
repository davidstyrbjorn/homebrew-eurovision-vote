import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase.config";

const updateCurrentlyPlaying = async (currentlyPlaying: string) => {
	const ref = doc(db, "admin", "admin");
	await updateDoc(ref, {
		currentlyPlaying,
	});
};

const activateQuestion = async (duration: number, prompt: string) => {
	const ref = doc(db, "admin", "admin");
	await updateDoc(ref, {
		questionActive: true,
		allowedSecondsToAnswer: duration,
		questionStartTime: Date.now(),
		questionPrompt: prompt,
	});
};

const deactivateQuestion = async () => {
	const ref = doc(db, "admin", "admin");
	await updateDoc(ref, {
		questionActive: false,
	});
};

export { updateCurrentlyPlaying, activateQuestion, deactivateQuestion };
