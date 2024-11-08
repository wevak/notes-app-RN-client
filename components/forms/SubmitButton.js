import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

const SubmitButton = ({ handleSubmit, btnTitle, loading }) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={() => handleSubmit()}>
      <Text style={styles.submitBtnText}>
        {loading ? <ActivityIndicator /> : btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: "#1e2225",
    height: 50,
    marginHorizontal: 25,
    justifyContent: "center",
    borderRadius: 80,
    marginBottom: 20,
  },
  submitBtnText: {
    textAlign: "center",
    fontWeight: "400",
    color: "white",
    fontSize: 24,
  },
});

export default SubmitButton;
