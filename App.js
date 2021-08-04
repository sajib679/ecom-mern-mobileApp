import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/store";
import { StyleSheet, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
const stack = createStackNavigator();

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default function App() {
  const _loadAsync = async () => {
    const fontAssets = cacheFonts([
      FontAwesome.font,
      MaterialCommunityIcons.font,
    ]);

    return await Promise.all([...fontAssets]);
  };

  const [state, setstate] = useState(false);

  if (!state) {
    return (
      <AppLoading
        startAsync={_loadAsync}
        onFinish={() => setstate(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaView />
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
        {/* <StatusBar style="auto" /> */}
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
});
