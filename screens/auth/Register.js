import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/forms/InputBox";
import SubmitButton from "../../components/forms/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        setLoading(false);
        return Alert.alert("Please fill all details");
      }
      setLoading(false);

      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      alert(data && data.message);
      navigation.navigate("Login");

      console.log("Register Data ===> ", { name, email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox inputTitle={"Name"} value={name} setValue={setName} />
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
      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      <SubmitButton
        btnTitle="Submit"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate("Login")}
      >
        Already Registered, Please <Text style={styles.link}>LOGIN</Text>
      </Text>
    </View>
  );
};

export default Register;

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
