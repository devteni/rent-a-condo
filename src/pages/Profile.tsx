import React, { useState, useEffect } from 'react';
import { auth } from '../services/firebase';


function Profile() {
  const [user, setUser] = useState<any>({});


  useEffect(() => {
    setUser(auth.currentUser!)
  }, [])
  return (
    <>
{    user ? <h1>{user.displayName}</h1> : 'Not logged in'
}    </>
  )
}

export default Profile