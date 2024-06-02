import { createContext, useEffect, useState } from "react";
import {
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
   // current user:
   const [user, setUser] = useState(null);

   // loader for loading till we get the user
   const [loading, setLoading] = useState(true);

   // axiosPublic
   const axiosPublic = useAxiosPublic();

   // create firebase user
   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   // login using firebase email and password
   const loginUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   // updating user with username and password
   const updateUser = (userName, userPhoto) => {
      setLoading(true);
      return updateProfile(auth.currentUser, {
         displayName: userName,
         photoURL: userPhoto,
      });
   };

   // login with Google using firebase
   const loginWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   };

   // logout
   const logoutUser = () => {
      return signOut(auth);
   };

   // observe current user of firebase
   useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         // console.log("Current User ----> ", currentUser);
         if (currentUser) {
            // assign token for user
            const userInfo = { email: currentUser.email };
            axiosPublic.post("/jwt", userInfo).then((res) => {
               if (res.data.token) {
                  localStorage.setItem("access-token", res.data.token);
                  setLoading(false);
               }
            });
         } else {
            // remove token from client side if any
            localStorage.removeItem("access-token");
            setLoading(false);
         }
      });

      return () => {
         return unSubscribe();
      };
   }, [axiosPublic]);

   const authInfo = {
      user,
      loading,
      createUser,
      loginUser,
      loginWithGoogle,
      updateUser,
      setLoading,
      logoutUser,
   };
   return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
   );
};

AuthProvider.propTypes = {
   children: PropTypes.node,
};

export default AuthProvider;
