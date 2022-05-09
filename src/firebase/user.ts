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
                votes: {}
            });
            return {name, votes: {}} as User; // Return the new user with name and no votes
        }

        // Convert to a map
        const docData = querySnapshot.docs[0].data();
        const tokensMap = docData.votes;
        const map = new Map<string, number>();
        Object.keys(tokensMap).forEach(e => {
            map.set(e, tokensMap[e]);
        }); 

        // Return the snapshot doc data as User type
        return {
            name: docData.name,
            votes: map
        };
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
        // Convert "Map" to Object with keys and values
        // Why cant firebase do this instead? not sure, we do it manually
        const objMap = {};
        user.votes.forEach((value, key) => {
            // @ts-ignore
            objMap[key] = value;
        })
        await updateDoc(userRef, {
            votes: objMap,
        })
    }catch(e){
        throw new Error(`Error updating votes for user ${e}`);
    }
}

const getAllUsers = async(): Promise<User[]> => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const result: User[] = [];
    querySnapshot.forEach((doc) => {
        result.push(doc.data() as User);
    });
    
    return result;
}

export { getUserIfExists, updateVotesInUser, getAllUsers }