import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Hr = () => {
  return <View style={styles.line}></View>;
};

export default Hr;

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ababab",
    opacity: 0.5,
    marginBottom: 0,
  },
});
