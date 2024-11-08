import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Account = () => {
  //global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  //local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  //handle profile data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/user-updation", {
        name,
        password,
        email,
      });
      setLoading(false);

      let userData = JSON.stringify(data);
      setState({ ...state, user: userData?.updatedUser });

      alert(data && data.message);
    } catch (error) {
      alert(error?.response?.data?.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
              width: 100,
              height: 100,
            }}
          />
        </View>
        <Text style={styles.warningText}>
          Currently you can only change name and password
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput editable={false} style={styles.inputBox} value={email} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput
            editable={false}
            style={styles.inputBox}
            value={state?.user.role}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={() => handleUpdate()}
          >
            <Text style={styles.updateBtnText}>
              {loading ? "Please Wait" : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <Text>Name: {state?.user.name}</Text>
      <Text>Email: {state?.user.email}</Text>
      <Text>Role: {state?.user.role}</Text> */}
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  warningText: {
    fontSize: 13,
    textAlign: "center",
    color: "red",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "black",
    color: "white",
    height: 40,
    width: 200,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default Account;
