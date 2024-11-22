import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db }  from './FirebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef); 
                
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setUserName(userData.name);
                    setUserEmail(userData.email);
                } else {
                    console.error('User document does not exist!');
                }
            } else {
                setUserName(null);
                setUserEmail(null);
            }
        });

        return () => unsubscribe();
    }, []);
    return (
        <UserContext.Provider value={{ userName, userEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
