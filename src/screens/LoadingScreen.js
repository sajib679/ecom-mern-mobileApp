import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import NeoMorph from "../components/NeoMorph";

const MyComponent = ({ visible }) => {
  const [isLoading, setisLoading] = useState(visible);

  useEffect(() => {
    setTimeout(() => {
      if (!visible) {
        setisLoading(false);
      }
    }, 1000 * 30);
  }, []);

  return (
    <View style={styles.center}>
      <ActivityIndicator
        animating={isLoading}
        color={Colors.pink500}
        size={60}
        style={{ justifyContent: "center", alignContent: "center" }}
      />
      <Text>Loading</Text>
    </View>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
