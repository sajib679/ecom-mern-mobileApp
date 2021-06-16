import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OrderScreen from "./OrderScreen";
import OrderDetails from "./OrderDetails";
import { createStackNavigator } from "@react-navigation/stack";
const stack = createStackNavigator();

const OrderStackNav = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="OrderScreen" component={OrderScreen}></stack.Screen>
      <stack.Screen name="OrderDetails" component={OrderDetails}></stack.Screen>
    </stack.Navigator>
  );
};

export default OrderStackNav;

const styles = StyleSheet.create({});
