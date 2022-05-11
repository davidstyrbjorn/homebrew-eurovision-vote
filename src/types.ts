import React from "react"

export type User = {
    name: string,
    votes: Map<string, number> // country to rating
}

export type Participant = {
    artist: string,
    block: string,
    country: string,
    language: string,
    region: string,
    title: string,
    order: number
}

export type UserContextType = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
    loginAsUser: (name: string) => Promise<void>,
    isMax: boolean,
    setIsMax: React.Dispatch<React.SetStateAction<boolean>>,
    users: User[]
}

export type ParticipantContextType = {
    participants: Array<Participant>,
    currentlyPlaying: Participant | undefined,
    selectedParticipant: Participant | null,
    setSelectedParticipant: React.Dispatch<React.SetStateAction<Participant | null>>
}

export type QuestionSubmission = {
    answer: string,
    groupName: string,
    timeRemaining: number
}

export type QuestionContextType = {
    questionActive: boolean,
    questionStartTime: number,
    allowedSecondsToAnswer: number,
    submitAnswer: (qs: QuestionSubmission) => void,
}

export type FirebaseResult = {
    code?: number,
    message?: string
}

// ACHIEVMENT RELATED
export type KEY = 'drunk' | 'racist' | 'snål';

export type Achievment = {
    key: KEY,
    title: string,
    descriptor: string,
}

export type AchievmentResult = {
    // Ordered as 0,1,2 is place 1,2,3
    names: Array<string> // Player names/song names
    scores: Array<number> // Score 
}

export const ACHIEVMENTS: Achievment[] = [
    {
        key: 'drunk',
        title: 'Har druckit för mycket',
        descriptor: 'Spelaren som gav mest poäng overall'
    }
]

export type PlayerAndScore = {
    name: string,
    score: number
}

/*

Sämst smak :puke: : personen med mest annorlunda score från mig (max),

Mest polariserande : låten med störst fördelning av sin poäng (typ några 9 poäng och några 1 poäng)

JAG ÄLSKAR YUGOSLAVIEN  : Spelaren som gav mest poäng till yugoslavien gruppen

Fisken i Talin : Spelaren som gav mest poäng till Balkan gruppen

Rysk spion : Spelaren som gav mest poäng till vi hatar varandra men röstar ändo på varandra gruppen

Sverige vänn : spelaren som gav mest poäng till slick svensk röv gruppen

Fattigaste personen i rummet : spelaren som gav mest poäng till GREKLAND KEKW gruppen

Kultur tanten : spelaren som gav mest poäng till låtar som inte sjungs på engelska

Rasisten : spelaren som gav minst poäng till låtar som inte sjungs på engelska

*/