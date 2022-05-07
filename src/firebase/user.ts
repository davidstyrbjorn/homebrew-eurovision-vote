import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "@firebase/firestore"
import { db } from "../firebase.config"
import { User } from "../types"

// If the name exists return the firestore document, if not, create a new instance for that user
const getUserIfExists = async(name: string): Promise<User> => {
    try {
        const q = query(collection(db, 'users'), where('name', '==', name));
        const querySnapshot = await getDocs(q);   
        if(querySnapshot.docs.length == 0){
            // No user found, add a new one to the collection and return
            await addDoc(collection(db, 'users'), {
                name,
                votes: []
            });
            return {name, votes: []} as User; // Return the new user with name and no votes
        }

        // Return the snapshot doc data as User type
        return querySnapshot.docs[0].data() as User;
    }catch(e){
        throw new Error(`Error getUserIfExists: ${e}`);
    }
}

const updateVotesInUser = async(user: User) => {
    try {
        const q = query(collection(db, 'users'), where('name', '==', user.name));
        const querySnapshot = await getDocs(q);
        const docId = querySnapshot.docs[0].id;
        const userRef = doc(db, 'users', docId);
        await updateDoc(userRef, {
            votes: user.votes
        })
    }catch(e){
        throw new Error(`Error updating votes for user ${e}`);
    }
}

export {getUserIfExists, updateVotesInUser}