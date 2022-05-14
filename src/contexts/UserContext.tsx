import { signInAnonymously } from "@firebase/auth";
import { collection, doc, onSnapshot, query, where } from "@firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { getUserIfExists } from "../firebase/user";
import { Participant, User, UserContextType } from "../types";

export const UserContext = createContext<UserContextType>({
    user: {
        name: "",
        votes: new Map<string, number>()
    },
    users: [],
    setUser: () => {},
    loginAsUser: async(name: string) => {},
    isMax: false,
    setIsMax: () => {},
    isAch: false,
    setIsAch: () => {}
});

type Props = {
    children: React.ReactElement
}

export function UserProvider({children} : Props) {
    const [user, setUser] = useState<User>({name: "",
        votes: new Map<string, number>()
    });
    const [isMax, setIsMax] = useState<boolean>(false);
    const [isAch, setIsAch] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Anonmyously sign in!
        auth.onAuthStateChanged((user) => {
            if(!user)
                signInAnonymously(auth);
        });

        const q = query(collection(db, "users"));
        const unsub = onSnapshot(q, (snapshot) => {
            setUsers(snapshot.docs.map((doc) => {return doc.data() as User}));
        });
        return unsub;
    }, []);

    const loginAsUser = async(name: string) => {
        // Gets data from firestore, or creates a new user and returns
        const u = await getUserIfExists(name);
        setUser(u);
    }

    return (
        <UserContext.Provider value={{user, setUser, loginAsUser, isMax, setIsMax, users, isAch, setIsAch}}>
            {children}
        </UserContext.Provider>
        
    )
}
