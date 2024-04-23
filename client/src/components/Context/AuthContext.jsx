import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
const BackendURL = process.env.REACT_APP_BACKEND_URL;

const usernameExists = async (username) => {
  try {
    const response = await fetch(`${BackendURL}/check-username?username=${username}`);
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error(error);
    return false; // Return false in case of an error
  }
};
export {usernameExists};


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(""); // Add user state
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedIn);
  }, []);

  const setLoginValue = () => {
    setIsLoggedIn(true);
  };

  const manageLogout = () => {
    sessionStorage.removeItem("userDetail");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn","false");
    setIsLoggedIn(false);
  };

  const manageLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Set user information after login
  };

  

  

  // Pass isLoggedIn value to Navbar component
  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    setLoginValue,
    user,
    manageLogin,
    manageLogout,
    userDetail, setUserDetail
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
