import { doc, onSnapshot } from "@firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { getParticipantsFromFirestore } from "../firebase/participants";
import { Participant, ParticipantContextType } from "../types";

export const ParticipantContext = createContext<ParticipantContextType>({
    participants: [],
    currentlyPlaying: undefined,
    selectedParticipant: null,
    setSelectedParticipant: () => {}
})

type Props = {
    children: React.ReactElement
}

export function ParticipantProvider({children}: Props) {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Participant>();
    // This is the participant the user can click on in the EntryList which will then be displayed in a modal context
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

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
        p.sort((a,b) => a.order < b.order ? 1 : -1);
        setParticipants(p);
    }

    return (
        <ParticipantContext.Provider value={{participants, 
                                currentlyPlaying, 
                                selectedParticipant,
                                setSelectedParticipant
        }}> 
            {children}
        </ParticipantContext.Provider>  
    )
}