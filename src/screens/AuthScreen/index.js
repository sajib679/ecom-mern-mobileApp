import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const stack = createStackNavigator();
const AuthScreen = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="SignIn" component={SignIn}></stack.Screen>
      <stack.Screen name="SignUp" component={SignUp}></stack.Screen>
    </stack.Navigator>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
