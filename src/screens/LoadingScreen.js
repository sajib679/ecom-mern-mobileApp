import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

const MyComponent = ({ visible }) => {
  const [isLoading, setisLoading] = useState(visible);

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
