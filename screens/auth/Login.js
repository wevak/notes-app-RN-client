import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/forms/InputBox";
import SubmitButton from "../../components/forms/SubmitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  //global state
  const [state, setState] = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        setLoading(false);
        return Alert.alert("Please fill all details");
      }
      setLoading(false);
      const { data } = await axios.post("/auth/login", { email, password });
      setState(data);

      //async storage
      await AsyncStorage.setItem("@auth", JSON.stringify(data));

      alert(data && data.message);
      navigation.navigate("Home");

      // console.log("Login Data ===> ", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  //temp function to check local storage data
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage ==>", data);
  };
  getLocalStorageData();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          value={email}
          setValue={setEmail}
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
        />
        <InputBox
          value={password}
          setValue={setPassword}
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
        />
      </View>
      {/* <Text>{JSON.stringify({ email, password }, null, 4)}</Text> */}
      <SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate("Register")}
      >
        Not registered, Please <Text style={styles.link}>Register</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: "200",
    backgroundColor: "#e1d5c9",
    // alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "green",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputBox: {
    height: 40,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});

export default Login;
