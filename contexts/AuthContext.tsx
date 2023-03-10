import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
  User,
} from 'firebase/auth'
import { analytics, auth } from '../common/utils/firebase/clientApp'
import nookies from 'nookies';
import { AuthContextType, FormatUserType, LoadingUserType } from '../common/types/firebase_types';
import { formatUser } from '../common/utils/firebase/firebase_helpers';
import { AppUser } from '../common/classes/appUser';
import fetch from 'isomorphic-unfetch';
import {logEvent } from 'firebase/analytics';
interface Props {
  children: ReactNode
}

interface AuthResponseType {
  status: number,
  message: string
}


const AuthContext = createContext({
  loadingUser: { user: null, isLoading: true },
  setLoadingUser: (user: LoadingUserType) => {},
  signInWithGoogle: () => Promise.resolve(),
  login: (email: string, password: string) => Promise.resolve(),
  register: () => Promise.resolve({ status: 400, message: 'Service Unavailable...' }),
  logout: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
} as AuthContextType)


export const useAuth = () => useContext(AuthContext)




export default function AuthContextProvider(props: Props) {
  const [loadingUser, setLoadingUser] = useState<LoadingUserType>({ user: null, isLoading: true })

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      // console.log("In Handle User " + user?.email);
      setLoadingUser((prevState) => ({ ...prevState, isLoading: true }));
      handleUser(user);
    })
    return () => {
      unsubscribe()
    }
  }, [])

  // useEffect(() => {
  //   console.log('The user is', loadingUser.user)
  // }, [loadingUser.user])

  //Refresh token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  const handleUser = async (rawUser: User | null) => {
    if (rawUser) {
      const formattedUser : FormatUserType = await formatUser(rawUser);
      const user : AppUser = new AppUser(formattedUser);
      // const firestoreUser = await retrieveUser(user.id);
      if (true) {
        // user.addFirestoreData(firestoreUser);
        const { token, ...userWithoutToken } = formattedUser;
        nookies.set(undefined, 'token', token, { path: '/' });
        //await createUser(user.uid, userWithoutToken);
        setLoadingUser({ user: user, isLoading: false });
        logEvent(analytics, 'user_login');
      } else {
        // updateFirestoreDoc('users/'+ user.id, user.toObjectForFirebase());
        setLoadingUser({ user: user, isLoading: false });
      }
      return user;
    } else {
      setLoadingUser({ user: null, isLoading: false });
      nookies.set(undefined, 'token', '', { path: '/' });


      return false;
    }
  };

  async function login(email: string, password: string) {
    //setLoadingUser((prevState) => ({user: null, isLoading: true}));

    try{
      const res = await signInWithEmailAndPassword(auth, email, password)
      return { status: 200, message: "Success" }
    }
    catch (err) {
      console.log(err);
      return { status: 400, message: "Failed to login: " + err }
    }
  }

  async function register(email: string, password: string, fname: string, lname: string): Promise<AuthResponseType> {
    // const phoneResult = phone(phoneNumber).phoneNumber;
    // if (!phoneResult) {
    //   console.log("Invalid phone number");
    //   return {status: 400, message: "Invalid phone number"};
    // }

    const response = await fetch('/api/auth/create', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password, fname: fname, lname: lname, alreadyCreated : false }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json()
    // console.log(response);
    if (response.status === 200) {
      // console.log("Successfully registered");
      login(email, password);
      return {status: 200, message: "Successfully registered"};
    } else {
      console.log("Failed to register");
      return {status: 400, message: "Failed to register" + data.message};

    }
  }

  function signInWithGoogle() {
    setLoadingUser((prevState) => ({ user: null, isLoading: true }));
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider);

  }

  function forgotPassword(email: string) {
    return sendPasswordResetEmail(auth, email, {
      url: `https://holifimusic.com/login`,
    })
  }

  function resetPassword(oobCode: string, newPassword: string) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    return signOut(auth);
  }



  const value: AuthContextType = {
    loadingUser,
    setLoadingUser,
    signInWithGoogle,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  }
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}