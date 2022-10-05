import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const isMounted = useRef(true);

    useEffect(() => {
        if(isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user)
                    setLoggedIn(true);
                }

                setLoading(false);
            });
        }
       
        return () => {
            isMounted.current = false;
        }
    }, [isMounted])

  return { loggedIn, loading };
}
