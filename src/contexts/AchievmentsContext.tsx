import { doc, onSnapshot, query, updateDoc } from "@firebase/firestore";
import { createContext, Key, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { AchievmentContextType, KEY, PlayerAndScore } from "../types";

export const AchievmentsContext = createContext<AchievmentContextType>({
    achievmentsMap: new Map<KEY, PlayerAndScore[]>(),
    currentKey: 'top3',
    switchKey: () => {}
});

type Props = {
    children: React.ReactElement
}

export function AchievmentProvider({children}: Props) {
    const [achievmentsMap, setAchievmentsMap] = useState(
        new Map<KEY, PlayerAndScore[]>()
    );
    const [currentKey, setCurrentKey] = useState<KEY>('top3');

    // Setup listener for achievments data
    useEffect(() => {
        const q = doc(db, 'admin', 'admin');
        const unsub = onSnapshot(q, (doc) => {
            // Convert the map to correct type formatting
            const tokensMap = doc.data()!.achievements;
            const map = new Map<KEY, PlayerAndScore[]>();
            Object.keys(tokensMap).forEach(e => {
                map.set(e as KEY, tokensMap[e] as PlayerAndScore[]);
            });
            
            setAchievmentsMap(map);

            // Get current key
            setCurrentKey(doc.data()!.currentKey as KEY);
        });

        return () => {
            unsub();
        }
    }, []);

    // Should the current achievment key change? Make sure the AchievmentsView can respond nicely
    const switchKey = (key: KEY) => {
        setCurrentKey(key);
        const ref = doc(db, 'admin', 'admin');
        updateDoc(ref, {
            currentKey: key as string
        });
    }

    return (
        <AchievmentsContext.Provider value={{
            achievmentsMap, currentKey, switchKey
        }}>
            {children}
        </AchievmentsContext.Provider>
    )
}