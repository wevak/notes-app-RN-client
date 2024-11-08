import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});

  const navigation = useNavigation();

  //handle delete post
  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Are you sure you want to delete post?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel press"),
      },
      {
        text: "Delete",
        onPress: () => handlePostDelete(id),
      },
    ]);
  };

  const handlePostDelete = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/post-delete/${id}`);
      setLoading(false);
      navigation.push("Myposts");
      alert(data?.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length} </Text>
      {myPostScreen && (
        <EditModal
          post={post}
          setPost={setPost}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      {posts?.map((post, i) => {
        return (
          <View key={i} style={styles.card}>
            {myPostScreen && (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ marginHorizontal: 20 }}>
                  <FontAwesome5
                    name="pen"
                    size={16}
                    color={"darkblue"}
                    onPress={() => {
                      setPost(post), setModalVisible(true);
                    }}
                  />{" "}
                </Text>
                <Text>
                  <FontAwesome5
                    name="trash"
                    size={16}
                    color={"red"}
                    onPress={() => handleDeletePrompt(post?._id)}
                  />{" "}
                </Text>
              </View>
            )}
            <Text style={styles.title}>Title : {post?.title}</Text>
            <Text>{post?.description}</Text>
            <View style={styles.footer}>
              {post?.postedBy?.name && (
                <Text>
                  <FontAwesome5 name="user" color={"orange"} />{" "}
                  {post?.postedBy?.name}
                </Text>
              )}
              <Text>
                <FontAwesome5 name="clock" color={"orange"} />{" "}
                {moment(post?.createdAt).format("DD:MM:YYYY")}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "97%",
    backgroundColor: "white",
    borderWidth: 0.3,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
export default PostCard;
