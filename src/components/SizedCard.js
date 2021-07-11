import React from "react";
import { StyleSheet, Text, View } from "react-native";

const offWhite = "#FAF9F6";
const gray = "#A9A9A9";
const platinum = "#E5E4E2";
const whitish = "#DEE9F7";
const litish = "#E2FCFD";
const SizedCard = ({ children, size, style, square, elevation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        width: size,
        height: size,
        shadowOffset: {
          width: -6,
          height: -6,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: elevation,
        borderColor: "#cecece",
        borderRadius: !square ? size / 2 || 40 / 2 : 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: size,
          height: size,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.22,
          shadowRadius: 6,
          elevation: elevation,
          borderColor: "#cecece",
          borderRadius: !square ? size / 2 || 40 / 2 : 10,
        }}
      >
        <View
          style={[
            styles.inner,
            {
              width: size || 40,
              height: size || 40,
              borderRadius: !square ? size / 2 || 40 / 2 : 10,
            },
            style,
          ]}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default SizedCard;

const styles = StyleSheet.create({
  topShadow: {},

  inner: {
    backgroundColor: platinum,
    borderColor: offWhite,
    borderWidth: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
