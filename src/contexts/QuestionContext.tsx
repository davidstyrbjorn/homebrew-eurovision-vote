import { doc, onSnapshot, setDoc } from "@firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { QuestionContextType, QuestionSubmission } from "../types";

export const QuestionContext = createContext<QuestionContextType>({
    questionActive: false,
    questionStartTime: 0,
    allowedSecondsToAnswer: 0,
    submitAnswer: () => {},
})

type Props = {
    children: React.ReactElement
}

export function QuestionProvider({children}: Props){
    const [questionActive, setQuestionActive] = useState(false);
    const [questionStartTime, setQuestionStartTime] = useState(0);
    const [allowedSecondsToAnswer, setAllowedSecondsToAnswer] = useState(0);

    useEffect(() => {
        // Listen for changes
        const unsub = onSnapshot(doc(db, "admin", "admin"), (doc) => {
            // Update our fields
            const data = doc.data();
            if(data){
                setQuestionActive(data.questionActive);
                setQuestionStartTime(data.questionStartTime);
                setAllowedSecondsToAnswer(data.allowedSecondsToAnswer);
            }
        });

        // Deconstruct listener
        return () => unsub();
    }, [])

    const submitAnswer = async(qs: QuestionSubmission) => {
        // Submit answer to firebase
        try {
            // Query for existing group
            await setDoc(doc(db, 'groups', qs.groupName), {
                name: qs.groupName,
                answer: qs.answer,
                timeRemaining: qs.timeRemaining
            });

        }catch(e) {
            throw new Error(`Error submitAnswer: ${e}`);
        }
    }

    return (
        <QuestionContext.Provider value={{
            questionActive, questionStartTime, submitAnswer, allowedSecondsToAnswer
        }}>
            {children}
        </QuestionContext.Provider>
    )
}