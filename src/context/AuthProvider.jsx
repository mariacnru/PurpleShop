import React, { useEffect, useState } from "react";
import authContext from "./authContext";
import * as authService from "../services/auth.service";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const initAuth = async () => {
    try {
      setIsLoading(true);
      const response = await authService.getMe();
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const refreshUser = async () => {
    initAuth();
  };

  const logOut = async () => {
    try {
      setIsLoading(true);
      const response = await authService.logout();
      console.log(response.data.user);
    } catch (error) {
      console.log("[Logout]", erroe);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const value = { user, isLoading, authService, logOut, refreshUser };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
