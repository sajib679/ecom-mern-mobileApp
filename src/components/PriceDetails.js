import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PriceDetails = ({ totalItem, totalPrice }) => {
  return (
    <View style={styles.box}>
      <View style={styles.flex}>
        <Text style={styles.font}>Total Item:</Text>
        <Text style={{ fontSize: 15, color: "black" }}>{totalItem} Items</Text>
      </View>
      <View style={styles.flex}>
        <Text style={styles.font}>Total Price:</Text>
        <Text style={{ fontSize: 15, color: "black" }}>Tk.{totalPrice}</Text>
      </View>
    </View>
  );
};

export default PriceDetails;

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    paddingVertical: 30,
    paddingHorizontal: 2,
    justifyContent: "flex-start",
    elevation: 1,
    shadowRadius: 20,
    shadowColor: "black",
    backgroundColor: "#fff",
    maxHeight: 80,
    borderRadius: 3,
    marginVertical: 3,
    marginHorizontal: 5,
    // borderTopWidth: 0.2,
  },
  flex: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  font: {
    fontSize: 15,
    color: "#636363",
    marginEnd: 10,
  },
  spacing: { marginEnd: 10 },
});
