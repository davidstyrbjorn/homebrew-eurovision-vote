import React from "react"

export type User = {
    name: string,
    // ... votes here later
}

export type UserContextType = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}