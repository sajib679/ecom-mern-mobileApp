import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Badge } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import {
  getInitialData,
  getCartItems,
  isUserLoggedIn,
  getAllBanner,
} from "../store/actions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from "./categoryScreen/index";
import ProductScreen from "./productScreen/Index";
import User from "./User/index";
import CheckoutScreen from "./CheckoutScreen";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const itemCount = Object.keys(cart.cartItems).length;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(getInitialData());
    dispatch(getAllBanner());
  }, []);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  return (
    <>
      <Tab.Navigator lazy>
        <Tab.Screen
          name="Product"
          component={ProductScreen}
          options={{
            title: "Product",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={24}
                  color="gray"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            title: "Category",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="view-list-outline"
                  size={24}
                  color="gray"
                />
              );
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
                    name="cart-outline"
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
                        name="account-outline"
                        size={24}
                        color="gray"
                      />
                    );
                  },
                }
              : {
                  title: "Login",
                  tabBarIcon: ({ color, size }) => {
                    return (
                      <MaterialCommunityIcons
                        name="login"
                        size={24}
                        color="gray"
                      />
                    );
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
