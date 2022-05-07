import { doc, onSnapshot } from "@firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { getParticipantsFromFirestore } from "../firebase/participants";
import { Participant, ParticipantContextType } from "../types";

export const ParticipantContext = createContext<ParticipantContextType>({
    participants: [],
    currentlyPlaying: undefined
})

type Props = {
    children: React.ReactElement
}

export function ParticipantProvider({children}: Props) {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Participant>();

    useEffect(() => {
        if(participants.length == 0)
            getParticipants();
    }, []);

    useEffect(() => {
        if(participants.length == 0) return;

        // Listen for real time changes on the admin data
        const unsub = onSnapshot(doc(db, "admin", "admin"), (doc) => {
            // Update currently playing
            if(doc.data() && doc.data()!.currentlyPlaying){
                // Find and set currently playing
                const curr = doc.data()!.currentlyPlaying as string;
                const idx = participants.findIndex((val) => val.country == curr);
                setCurrentlyPlaying(participants[idx]);
            }
        }); 

        return unsub;
    }, [participants])

    const getParticipants = async() => {
        const p = await getParticipantsFromFirestore();
        setParticipants(p);
    }

    return (
        <ParticipantContext.Provider value={{participants, currentlyPlaying}}> 
            {children}
        </ParticipantContext.Provider>  
    )
}