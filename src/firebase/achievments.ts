/*
The achievment screen wants to inevitable do something like this
> const arrayOfWinners = await getAchievment('key');
> ... use this array of winners display etc

Should the function load every participant each time? 
The best solution is if the admin can click "calc all achievments"
A function goes through each achievment key, calculates array of winners
and then stores that away somewhere? probably in the admin collection and then 
we could have the getAchievment function just load the array of winners for that key!
*/

import { ACHIEVMENT_KEYS, FirebaseResult, KEY, Participant, User } from "../types";
import { keyToFunctionAchievment } from "./achievment_calculations";

// "Statically" pre-calc all achievment results and store them in firebase for later usage
const calculateAllAchievments = async(): Promise<FirebaseResult> => {
    // Load all participants and users
    const participants: Participant[] = [];
    const users: User[] = [];

    // For each achievment key, call the corresponding function, passing participants + users
    Promise.all([
        ACHIEVMENT_KEYS.forEach(async(key) => {
            const result = await keyToFunctionAchievment.get(key)!(participants, users);
        })
    ]);

    // If we got here everyrhing went well!
    return {
        code: 200
    };
}

const getAchievmentWinners = async(key: KEY): Promise<string[]> => {
    return [];
}

export { calculateAllAchievments, getAchievmentWinners };
