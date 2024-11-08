import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditModal = ({ post, setPost, modalVisible, setModalVisible }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  //handle user post update
  const userPostUpdateHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/post-update/${id}`, {
        title,
        description,
      });
      navigation.push("Myposts");
      alert(data?.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  // initial
  useEffect(() => {
    setTitle(post?.title);
    setDescription(post?.description);

    return () => {
      setTitle("");
      setDescription("");
    };
  }, [post]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Post Updation</Text>
              <Text>Title</Text>
              <TextInput
                value={title}
                // value={post?.title}
                style={styles.inputBox}
                // onChangeText={(text) => setPost({ ...post, title: text })}
                onChangeText={(text) => setTitle(text)}
              />
              <Text>Description</Text>
              <TextInput
                value={description}
                // value={post?.description}
                multiline={true}
                numberOfLines={4}
                style={styles.inputBox}
                // onChangeText={(text) => setPost({ ...post, description: text })}
                onChangeText={(text) => setDescription(text)}
              />
              <View style={styles.btnContainer}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => {
                    userPostUpdateHandler(post?._id),
                      setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>
                    {loading ? "Please wait" : "Post Update"}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    textAlignVertical: "top",
    paddingTop: 10,
    borderWidth: 0.5,
    paddingVertical: 5,
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 8,
    paddingLeft: 9,
    backgroundColor: "lightgray",
  },
  btnContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
    margin: 10,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default EditModal;
