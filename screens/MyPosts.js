import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
import PostCard from "../components/PostCard";

const MyPosts = () => {
  //global state
  // const [state] = useContext(AuthContext);
  //   const [posts] = useContext(PostContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //user post list
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/user-posts-list");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  //initial lifecycle
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View style={{ backgroundColor: "#fff" }}>
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
});
export default MyPosts;
