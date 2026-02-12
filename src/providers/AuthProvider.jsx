import axios from "axios";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  
  const fetchUserFromDB = async (firebaseUser) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${firebaseUser.email.toLowerCase()}`
      );

      const dbUser = res.data;

      setUser({
        ...firebaseUser,
        role: dbUser?.role || "user",
      });

    } catch (error) {
      console.log("Role fetch error:", error);

      setUser({
        ...firebaseUser,
        role: "user",
      });
    }
  };

  
  const refreshUser = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser?.email) return;

    await fetchUserFromDB(currentUser);
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        await fetchUserFromDB(currentUser);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setUser, 
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    refreshUser, 
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
