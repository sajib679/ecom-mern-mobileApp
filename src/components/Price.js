import React from "react";
// import { BiRupee } from "react-icons/bi";
import { StyleSheet, Text, View } from "react-native";

const Price = (props) => {
  return (
    <View style={styles.flexRow}>
      {/* <BiRupee /> */}
      <Text style={styles.textFocus}>{props.value}</Text>
      <Text style={styles.textFocus}>x{props.purchaseQuantity}</Text>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  flexRow: { flexDirection: "row" },
  textLight: {},
  textFocus: { color: "black" },
});
