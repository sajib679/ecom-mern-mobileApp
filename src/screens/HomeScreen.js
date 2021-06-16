import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Badge } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { getInitialData } from "../store/actions/initialData.action";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from "./categoryScreen/index";
import ProductScreen from "./productScreen/Index";
import User from "./User/index";
import { isUserLoggedIn } from "../store/actions/auth.action";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  Fontisto,
} from "@expo/vector-icons";
import { getCartItems } from "../store/actions";
import CheckoutScreen from "./CheckoutScreen";
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const itemCount = Object.keys(cart.cartItems).length;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(getInitialData());
  }, []);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  return (
    <>
      <SafeAreaView></SafeAreaView>

      <Tab.Navigator lazy>
        <Tab.Screen
          name="Product"
          component={ProductScreen}
          options={{
            title: "Product",
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name="home" size={24} color="gray" />;
            },
          }}
        />
        <Tab.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            title: "Category",
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name="list" size={24} color="gray" />;
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CheckoutScreen}
          options={{
            title: "Cart",
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <View>
                  {itemCount > 0 && !focused && (
                    <Badge size={24}>{itemCount}</Badge>
                  )}
                  <MaterialCommunityIcons
                    name="cart-arrow-right"
                    size={24}
                    color="gray"
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={
            auth.authenticate
              ? {
                  title: "Profile",
                  tabBarIcon: ({ color, size }) => {
                    return (
                      <MaterialCommunityIcons
                        name="account-check"
                        size={24}
                        color="gray"
                      />
                    );
                  },
                }
              : {
                  title: "Login",
                  tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="login" size={24} color="black" />;
                  },
                }
          }
        />
      </Tab.Navigator>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
  },
});
