import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//context
const AuthContext = createContext();

//provider
const AuthProvider = ({ children }) => {
  //global state
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  //initial local storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);

      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLocalStorageData();
  }, []);

  //default axios settings
  // axios.defaults.baseURL = "http://192.168.146.70:8080/api/v1";
  axios.defaults.baseURL =
    "https://production-rn-notes-server.onrender.com/api/v1";

  axios.defaults.headers.common["Authorization"] = `Bearer ${state?.token}`;

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
