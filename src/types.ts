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

export type KEY = 'racist' | 'drunk';
export const ACHIEVMENT_KEYS: Array<KEY> = ['racist', 'drunk']