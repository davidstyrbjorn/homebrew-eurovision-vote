import React from "react"

export type Vote = {
    country: string,
    rating: number
}

export type User = {
    name: string,
    votes: Vote[]
}

export type Participant = {
    artist: string,
    block: string,
    country: string,
    language: string,
    region: string,
    title: string
}

export type UserContextType = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
    loginAsUser: (name: string) => Promise<void>
}

export type ParticipantContextType = {
    participants: Array<Participant>
}