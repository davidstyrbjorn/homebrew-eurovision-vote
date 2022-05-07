import { signInAnonymously } from "@firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { User, UserContextType } from "../types";

export const UserContext = createContext<UserContextType>({
    user: {
        name: "d",
        id: "1"
    },
    setUser: () => {}
})

type Props = {
    children: React.ReactElement
}

export function UserProvider({children} : Props) {
    const [user, setUser] = useState<User>({
        name: "",
        id: ""
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                console.log("Signed in user!", user);
            }else {
                console.log("ANON sign in for a user started!");
                signInAnonymously(auth);
            }
        })
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
        
    )
}
