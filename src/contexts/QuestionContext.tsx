import { doc, getDoc, onSnapshot, setDoc } from "@firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { QuestionContextType, QuestionSubmission } from "../types";

export const QuestionContext = createContext<QuestionContextType>({
	questionActive: false,
	questionStartTime: 0,
	allowedSecondsToAnswer: 0,
	prompt: "",
	submitAnswer: () => {},
});

type Props = {
	children: React.ReactElement;
};

export function QuestionProvider({ children }: Props) {
	const [questionActive, setQuestionActive] = useState(false);
	const [questionStartTime, setQuestionStartTime] = useState(0);
	const [allowedSecondsToAnswer, setAllowedSecondsToAnswer] = useState(0);
	const [prompt, setPrompt] = useState<string>("");

	useEffect(() => {
		// Listen for changes
		const unsub = onSnapshot(doc(db, "admin", "admin"), (doc) => {
			// Update our fields
			const data = doc.data();
			if (data) {
				setQuestionActive(data.questionActive);
				setQuestionStartTime(data.questionStartTime);
				setAllowedSecondsToAnswer(data.allowedSecondsToAnswer);
				setPrompt(data.questionPrompt);
			}
		});

		// Deconstruct listener
		return () => unsub();
	}, []);

	const submitAnswer = async (qs: QuestionSubmission) => {
		// Submit answer to firebase
		try {
			// Find doc with name qa.GroupName and update some fields
			const groupRef = doc(db, "groups", qs.groupName);
			const groupDoc = await getDoc(groupRef);
			if (groupDoc.exists()) {
				// Update existing group, but keep the score field the same
				// @ts-ignore
				const groupData = groupDoc.data();
				// @ts-ignore
				const score = groupData.score;
				await setDoc(groupRef, {
					name: qs.groupName,
					answer: qs.answer,
					timeRemaining: qs.timeRemaining,
					score,
				});
			} else {
				// Create new group
				await setDoc(groupRef, {
					name: qs.groupName,
					answer: qs.answer,
					timeRemaining: qs.timeRemaining,
					score: 0,
				});
			}
			// Query for existing group
			// await setDoc(doc(db, "groups", qs.groupName), {
			// 	name: qs.groupName,
			// 	answer: qs.answer,
			// 	timeRemaining: qs.timeRemaining,
			// });
		} catch (e) {
			throw new Error(`Error submitAnswer: ${e}`);
		}
	};

	return (
		<QuestionContext.Provider
			value={{
				questionActive,
				questionStartTime,
				submitAnswer,
				allowedSecondsToAnswer,
				prompt,
			}}
		>
			{children}
		</QuestionContext.Provider>
	);
}
