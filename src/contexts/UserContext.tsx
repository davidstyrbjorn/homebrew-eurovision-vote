import { signInAnonymously } from "@firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { User, UserContextType } from "../types";

export const UserContext = createContext<UserContextType>({
    user: {
        name: "d",
        votes: []
    },
    setUser: () => {}
})

type Props = {
    children: React.ReactElement
}

export function UserProvider({children} : Props) {
    const [user, setUser] = useState<User>({
        name: "",
        votes: []
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user)
                signInAnonymously(auth);
        })
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
        
    )
}
