import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const CheckoutStep = (props) => {
  return (
    <View style={styles.checkoutContainer}>
      <TouchableWithoutFeedback onPress={props.onClick}>
        <View
          style={
            props.active ? styles.checkoutHeaderactive : styles.checkoutHeader
          }
        >
          <View style={styles.flexRow}>
            <Text style={styles.stepNumber}>{props.stepNumber}</Text>
            <Text
              style={props.active ? styles.stepTitleactive : styles.stepTitle}
            >
              {props.title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {props.body && props.body}
    </View>
  );
};

export default CheckoutStep;

const styles = StyleSheet.create({
  checkoutContainer: {
    width: "100%",
    backgroundColor: "#eee",
  },
  checkoutStep: {
    borderWidth: 2,
    marginBottom: 10,
    elevation: 2,
  },
  stepNumber: {
    textAlign: "center",
    backgroundColor: "#eee",
    color: "#2874f0",
    borderRadius: 3,
    fontSize: 12,
    padding: 3,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
    color: "#2874f0",
  },
  stepTitleactive: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
    color: "#fff",
  },

  checkoutHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    color: "#2874f0",
    borderRadius: 3,
    fontSize: 12,
    padding: 3,
  },

  checkoutHeaderactive: {
    flexDirection: "row",
    backgroundColor: "#2874f0",
    color: "#2874f0",
    // borderRadius: 3,
    fontSize: 12,
    padding: 3,
  },

  flexRow: { flexDirection: "row" },
});
