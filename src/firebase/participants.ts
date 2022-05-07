import { db } from "../firebase.config";
import participants from "../euro2022.json";
import { collection, doc, getDocs, setDoc, writeBatch } from "@firebase/firestore";
import { Participant } from "../types";

const syncParticipantsWithFirestore = async() => {
    try {
        const batch = writeBatch(db);
        // Grab ref, and create btach 
        participants.forEach((entry, idx) => {
            const newDocRef = doc(collection(db, 'participants'));
            batch.set(newDocRef, {
                artist: entry.Artist,
                block: entry.Block,
                country: entry.Land,
                language: entry.Land,
                region: entry.Region,
                title: entry.Bidrag,
                order: idx
            });
        })

        batch.commit();

    }catch(e){
        console.log("Batch failed: ", e);
    }
}

const getParticipantsFromFirestore = async() => {
    const querySnapshot = await getDocs(collection(db, 'participants'));
    const result: Participant[] = [];
    querySnapshot.forEach((doc) => {
        result.push(doc.data() as Participant);
    })

    return result;
}

export {syncParticipantsWithFirestore, getParticipantsFromFirestore}