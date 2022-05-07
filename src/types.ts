import React from "react"

export type User = {
    name: string,
    id: string,
    // ... votes here later
}

export type UserContextType = {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
}