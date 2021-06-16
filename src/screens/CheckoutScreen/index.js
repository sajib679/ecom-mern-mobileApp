import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Checkout from "./Checkout";
import CartScreen from "../Profile/CartScreen";

const stack = createStackNavigator();
const CheckoutScreen = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {}, [user.placedOrderId]);

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="Cart" component={CartScreen}></stack.Screen>
      <stack.Screen name="Checkout" component={Checkout}></stack.Screen>
    </stack.Navigator>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
