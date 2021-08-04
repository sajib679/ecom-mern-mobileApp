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
<<<<<<< HEAD
      <ActivityIndicator
        animating={isLoading}
        color={Colors.pink500}
        size={60}
        style={{ justifyContent: "center", alignContent: "center" }}
      />
      <Text>Loading</Text>
=======
      {isLoading ? (
        <ActivityIndicator
          animating={isLoading}
          color={Colors.pink500}
          size={60}
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        />
      ) : (
        <View style={styles.center}>
          <NeoMorph size={100}>
            <Text>No Items</Text>
          </NeoMorph>
        </View>
      )}
>>>>>>> parent of fdc46a4... React Native -Android Working Succesfully except Icons
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
