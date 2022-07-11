import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { firebase_auth } from '../helpers/Firebase';

interface PropsType {
  children: JSX.Element
}

const AuthContext = createContext<any>(null);

export default function AuthProvider(props: PropsType) {
  const [user, setUser] = useState<User | null | object>({});
  const navigate = useNavigate();

  const firebaseLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebase_auth, email, password);
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  const firebaseLogout = async () => {
    await signOut(firebase_auth);
  }

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      setUser(user);
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, firebaseLogin, firebaseLogout }}>{props.children}</AuthContext.Provider>
  )
}

export const useUser = () => {
  return useContext(AuthContext);
}
