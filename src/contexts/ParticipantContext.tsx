import { createContext, useEffect, useState } from "react";
import { getParticipantsFromFirestore } from "../firebase/participants";
import { Participant, ParticipantContextType } from "../types";

export const ParticipantContext = createContext<ParticipantContextType>({
    participants: []
})

type Props = {
    children: React.ReactElement
}

export function ParticipantProvider({children}: Props) {
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        if(participants.length == 0)
            getParticipants();
    }, []);

    const getParticipants = async() => {
        const p = await getParticipantsFromFirestore();
        setParticipants(p);
    }

    return (
        <ParticipantContext.Provider value={{participants}}> 
            {children}
        </ParticipantContext.Provider>  
    )
}