import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AllProduct from "./AllProduct";
import ProductDetails from "./ProductDetails";

const Stack = createStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllProduct"
        options={{ headerShown: false }}
        component={AllProduct}
      />
      <Stack.Screen
        name="ProductDetails"
        options={{ headerShown: false }}
        component={ProductDetails}
      />
    </Stack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
