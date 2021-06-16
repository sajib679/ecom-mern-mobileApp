import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthScreen from "../AuthScreen/index";
import Profile from "../Profile/index";
import { useSelector, useDispatch } from "react-redux";

const User = () => {
  const auth = useSelector((state) => state.auth);
  return auth.authenticate ? <Profile /> : <AuthScreen />;
};

export default User;

const styles = StyleSheet.create({});
