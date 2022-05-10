import { doc, onSnapshot } from "@firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { QuestionContextType, QuestionSubmission } from "../types";

export const QuestionContext = createContext<QuestionContextType>({
    questionActive: false,
    questionPrompt: "",
    questionStartTime: 0,
    submitAnswer: () => {},
})

type Props = {
    children: React.ReactElement
}

export function QuestionProvider({children}: Props){
    const [questionActive, setQuestionActive] = useState(false);
    const [questionPrompt, setQuestionPrompt] = useState("");
    const [questionStartTime, setQuestionStartTime] = useState(0);

    useEffect(() => {
        // Listen for changes
        const unsub = onSnapshot(doc(db, "admin", "admin"), (doc) => {
            // Update our fields
            const data = doc.data();
            if(data){
                setQuestionActive(data.questionActive);
                setQuestionPrompt(data.questionPrompt);
                setQuestionStartTime(data.startTime);
            }
        })
    }, [])

    const submitAnswer = (qs: QuestionSubmission) => {
        // Submit answer to firebase
    }

    return (
        <QuestionContext.Provider value={{
            questionActive,  questionPrompt, questionStartTime, submitAnswer, 
        }}>
            {children}
        </QuestionContext.Provider>
    )
}