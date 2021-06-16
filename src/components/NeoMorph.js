import React from "react";
import { StyleSheet, Text, View } from "react-native";

const offWhite = "#FAF9F6";
const gray = "#A9A9A9";
const platinum = "#E5E4E2";
const whitish = "#DEE9F7";
const litish = "#E2FCFD";
const NeoMorph = ({ children, size, style }) => {
  return (
    <View style={styles.topShadow}>
      <View style={styles.bottomShadow}>
        <View
          style={[
            styles.inner,
            {
              width: size || 40,
              height: size || 40,
              borderRadius: size / 2 || 40 / 2,
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

export default NeoMorph;

const styles = StyleSheet.create({
  topShadow: {
    alignSelf: "center",
    width: 100,
    height: 100,
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    borderColor: "#cecece",
    borderRadius: 50,
  },
  bottomShadow: {
    width: 100,
    height: 100,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 5,
    borderColor: "#cecece",
    borderRadius: 50,
  },

  inner: {
    backgroundColor: platinum,
    borderColor: offWhite,
    borderWidth: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
