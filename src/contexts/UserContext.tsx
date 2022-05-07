import { signInAnonymously } from "@firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { getUserIfExists } from "../firebase/user";
import { User, UserContextType } from "../types";

export const UserContext = createContext<UserContextType>({
    user: {
        name: "",
        votes: new Map<string, number>()
    },
    setUser: () => {},
    loginAsUser: async(name: string) => {}
})

type Props = {
    children: React.ReactElement
}

export function UserProvider({children} : Props) {
    const [user, setUser] = useState<User>({
        name: "",
        votes: new Map<string, number>()
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user)
                signInAnonymously(auth);
        })
    }, []);

    const loginAsUser = async(name: string) => {
        const u = await getUserIfExists(name);
        setUser(u);
    }

    return (
        <UserContext.Provider value={{user, setUser, loginAsUser}}>
            {children}
        </UserContext.Provider>
        
    )
}
