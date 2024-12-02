import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../utils/FirebaseConfig';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ActivityIndicator, View } from 'react-native';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userPhotoUrl, serUserPhotoUrl] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set persistence for Firebase authentication
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        try {
                            const userDocRef = doc(db, 'users', user.uid);
                            const userDocSnap = await getDoc(userDocRef);

                            if (userDocSnap.exists()) {
                                const userData = userDocSnap.data();
                                setUserName(userData.name);
                                setUserEmail(userData.email);
                                serUserPhotoUrl(userData.photoUrl)
                            } else {
                                console.error('User document does not exist!');
                            }
                        } catch (error) {
                            console.error('Error fetching user data:', error);
                        }
                    } else {
                        setUserName(null);
                        setUserEmail(null);
                        serUserPhotoUrl(null)
                    }
                    setLoading(false);
                });

                return () => unsubscribe();
            })
            .catch((error) => {
                console.error('Error setting persistence:', error);
                setLoading(false);
            });
    }, []);


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <UserContext.Provider value={{ userName, userEmail, userPhotoUrl }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
