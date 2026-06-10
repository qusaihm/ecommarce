import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserToken(user.uid);
        setUserName(user.displayName || user.email.split("@")[0]);
        setUserEmail(user.email);
      } else {
        setUserToken(null);
        setUserName(null);
        setUserEmail(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUserToken(null);
    setUserName(null);
  };

  return (
    <UserContext.Provider value={{ userToken, setUserToken, userName, setUserName, userEmail, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;