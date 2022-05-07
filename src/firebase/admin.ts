import { doc, updateDoc } from "@firebase/firestore"
import { db } from "../firebase.config"

const updateCurrentlyPlaying = async (currentlyPlaying: string) => {
    const ref = doc(db, "admin", "admin");
    await updateDoc(ref, {
        currentlyPlaying
    });
}

export {updateCurrentlyPlaying};