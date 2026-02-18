import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userData = await AsyncStorage.getItem("user");

        if (token && userData) {
          const parsedUser = JSON.parse(userData);

          setAuthenticated(true);
          setUser(parsedUser);
          setRole(parsedUser.role);
            setName(parsedUser.username);
            setPhone(parsedUser.phone);
            setEmail(parsedUser.email);
          console.log("User is authenticated:", parsedUser);
        }
      } catch (error) {
        console.log("Auth error:", error.message);
      }
    };

    checkIfLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{
      authenticated,
      user,
      role,
        name,
        phone,
        email,
      setAuthenticated,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
