import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Color from "../Colors";
const SectionHeader = ({ text, onPress, button }) => {
  return (
    <View style={styles.conatiner}>
      <Text style={styles.text}>{text}</Text>
      {button && (
        <Text onPress={onPress} style={{ color: "green", letterSpacing: 1.5 }}>
          {button}
        </Text>
      )}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    paddingVertical: 6,
    backgroundColor: Color.offWhite,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: { fontSize: 18, letterSpacing: 4 },
});
