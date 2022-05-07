import React from "react"

export type Vote = {
    country: string,
    rating: number
}

export type User = {
    name: string,
    votes: Vote[]
}

export type UserContextType = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}

export type Participant = {
    artist: string,
    block: string,
    country: string,
    language: string,
    region: string,
    title: string
}