// All our functions for calculating achievments

import { FirebaseResult, KEY, Participant, PlayerAndScore, User } from "../types"

// this gives descending order i.e 0 is highst
// a.score < b.score ? 1 : -1

// this gives ascending order i.e 0 is lowest
// a.score > b.score ? 1 : -1

const mostDrunk = (participants: Participant[], users: User[])
    : PlayerAndScore[] => {
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
    playersAndTheirTotal.sort((a,b) => a.score < b.score ? 1 : -1);
    
    return playersAndTheirTotal;
}

const snolJavel = (participants: Participant[], users: User[]): PlayerAndScore[] => {
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

    // Sort to easily get bottom 3
    playersAndTheirTotal.sort((a,b) => a.score > b.score ? 1 : -1);
    
    return playersAndTheirTotal;
}

const racist = (participants: Participant[], users: User[])
    : PlayerAndScore[] => {
    // calc calc
    const playersAndTheirTotal: PlayerAndScore[] = [];

    for(let i = 0; i < users.length; i++){
        const newTotal: PlayerAndScore = {
            name: users[i].name,
            score: 0
        };
        // Go through each participant, get total score given, then save
        participants.forEach(p => {
            // Only take songs that are NOT in english into account
            if(p.language.toLocaleLowerCase() != 'engelska') 
                newTotal.score += users[i].votes.get(p.country)!;
        });
        playersAndTheirTotal.push(newTotal);
    }

    // Sort for bottom 3
    playersAndTheirTotal.sort((a,b) => a.score > b.score ? 1 : -1);
    
    return playersAndTheirTotal;
}

// Fattigaste personen i rummet : spelaren som gav mest poäng till GREKLAND KEKW gruppen
const fattigast = (participants: Participant[], users: User[])
    : PlayerAndScore[] => {

        // calc calc
    const playersAndTheirTotal: PlayerAndScore[] = [];

    for(let i = 0; i < users.length; i++){
        const newTotal: PlayerAndScore = {
            name: users[i].name,
            score: 0
        };
        // Go through each participant, get total score given, then save
        participants.forEach(p => {
            // Only take songs that are NOT in english into account
            if(p.block.toLocaleLowerCase() != 'grekland kekw') 
                newTotal.score += users[i].votes.get(p.country)!;
        });
        playersAndTheirTotal.push(newTotal);
    }

    playersAndTheirTotal.sort((a,b) => a.score < b.score ? 1 : -1);
    
    return playersAndTheirTotal;
}

type ValueType = (participants: Participant[], users: User[]) => PlayerAndScore[]
export const keyToFunctionAchievment = new Map<KEY, ValueType>([
    ['drunk', mostDrunk],
    ['racist', racist],
    ['snål', snolJavel]
]);