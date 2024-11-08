import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { PostContext } from "../context/postContext";

const Post = ({ navigation }) => {
  //global state
  const [posts, setPosts] = useContext(PostContext);

  //local state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  //handling form submit
  const handlePostSubmit = async () => {
    // alert(`Your post title is ${title} and description is ${description}`);
    try {
      if (!title) {
        alert("Please enter title");
      }
      if (!description) {
        alert("Please enter description");
      }

      const { data } = await axios.post("/post/post-creation", {
        title,
        description,
      });

      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.header}>Post creation</Text>
          <TextInput
            value={title}
            style={styles.inputBox}
            placeholder="post title"
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            value={description}
            style={styles.inputBox}
            placeholder="post description"
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            numberOfLines={6}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={handlePostSubmit}>
            <Text style={styles.postBtnText}>
              <FontAwesome5 name="plus-square" /> {"  "}
              Post Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginTop: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    width: 250,
    marginTop: 30,
    paddingTop: 10,
    fontSize: 16,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "black",
    height: 40,
    width: 200,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Post;
