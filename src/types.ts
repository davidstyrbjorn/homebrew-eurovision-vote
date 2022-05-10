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
    submitTime: Date
}

export type QuestionContextType = {
    questionActive: boolean,
    questionPrompt: string,
    questionStartTime: number,
    submitAnswer: (qs: QuestionSubmission) => void,
}