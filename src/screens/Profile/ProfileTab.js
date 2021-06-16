import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CartScreen from "./CartScreen";
import OrderStackNav from "./OrderStackNav";
import WishlistScreen from "./WishlistScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const ProfileTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: "#F5F5F5",
          elevation: 1,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Order" component={OrderStackNav} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
    </Tab.Navigator>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({});
