// All our functions for calculating achievments

import { FirebaseResult, KEY, Participant, User } from "../types"

type PlayerAndScore = {
    name: string,
    score: number
}

const mostDrunkAchievment = async(participants: Participant[], users: User[]): Promise<FirebaseResult> => {
    // calc calc
    const playersAndTheirTotal: PlayerAndScore[] = [];

    for(let i = 0; i < users.length; i++){
        const newTotal: PlayerAndScore = {
            name: users[i].name,
            score: 0
        };
        // Go through each participant, get total score given, then save
        participants.forEach(p => {
            newTotal.score += users[i].votes.get(p.country)!;
        });
        playersAndTheirTotal.push(newTotal);
    }

    // Sort to easily get top 3
    playersAndTheirTotal.sort((a,b) => a.score > b.score ? 1 : -1);
    
    // Push top 3 to firebase under key 'drunk'

    return {
        code: 200
    }
}

const racistAchievment = async(participants: Participant[], users: User[]): Promise<FirebaseResult> => {
    // calc calc
    return {
        code: 200
    }
}

type ValueType = (participants: Participant[], users: User[]) => Promise<FirebaseResult>
export const keyToFunctionAchievment = new Map<KEY, ValueType>([
    ['drunk', mostDrunkAchievment],
    ['racist', racistAchievment]
]);