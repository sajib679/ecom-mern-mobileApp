import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ParentMenuTab from "./components/ParentMenuTab";
import Loading from "../LoadingScreen";
import NoResponse from "../../components/NoResponse";
const Tab = createMaterialTopTabNavigator();

const ParentMenu = () => {
  const category = useSelector((state) => state.category);

  const pCat = category.categoryList.filter(
    (cat) => cat.parentId === (null || undefined)
  );

  const [parentCategory, setParentCategory] = useState([]);

  useEffect(() => {
    setParentCategory(pCat);
  }, [category.isLoaded]);

  return category.isLoaded && parentCategory.length > 0 ? (
    <Tab.Navigator lazy tabBarOptions={{ scrollEnabled: true }}>
      {parentCategory.map((pt) => (
        <Tab.Screen
          key={pt._id}
          name={pt.name}
          component={ParentMenuTab}
          initialParams={{ parentId: `${pt._id}` }}
        />
      ))}
    </Tab.Navigator>
  ) : (
    <Loading visible={!category.isLoaded} />
  );
};

export default ParentMenu;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
