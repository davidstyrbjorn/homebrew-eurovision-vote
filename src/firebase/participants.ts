import { db } from "../firebase.config";
import participants from "../euro2022.json";
import { collection, doc, setDoc, writeBatch } from "@firebase/firestore";

/*
            artist: entry.Artist,
            block: entry.Block,
            country: entry.Land,
            language: entry.Land,
            region: entry.Region,
            title: entry.Bidrag
*/

const syncParticipantsWithFirestore = async() => {
    try {
        console.log("TJA");
        const batch = writeBatch(db);
        // Grab ref, and create btach 
        participants.forEach((entry) => {
            const newDocRef = doc(collection(db, 'participants'));
            batch.set(newDocRef, {
                artist: entry.Artist,
                block: entry.Block,
                country: entry.Land,
                language: entry.Land,
                region: entry.Region,
                title: entry.Bidrag
            });
        })

        batch.commit();

    }catch(e){
        console.log("Batch failed: ", e);
    }
    
}

export {syncParticipantsWithFirestore}