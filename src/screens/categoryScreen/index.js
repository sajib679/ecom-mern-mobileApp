import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ParentMenu from "./ParentMenu";
import Category from "./Category";
import { color } from "react-native-reanimated";

const Stack = createStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ParentMenu"
        options={{ headerShown: false }}
        component={ParentMenu}
      />
      <Stack.Screen
        name="Category"
        options={({ route }) => {
          return {
            title: route.params.name,
            headerStatusBarHeight: 0,
            headerStyle: {
              height: 45,
              backgroundColor: "#F5F5F5",
            },
          };
        }}
        component={Category}
      />
    </Stack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
