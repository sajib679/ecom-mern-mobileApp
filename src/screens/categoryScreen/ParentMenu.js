import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ParentMenuTab from "./components/ParentMenuTab";
import Loading from "../LoadingScreen";
import NoResponse from "../../components/NoResponse";
import productReducer from "../../store/reducers/product.reducers";
const Tab = createMaterialTopTabNavigator();

const ParentMenu = () => {
  const category = useSelector((state) => state.category);
  const [loading, setLoading] = useState(category.loading);

  const pCat = category.categoryList.filter(
    (cat) => cat.parentId === (null || undefined)
  );

  const [parentCategory, setParentCategory] = useState([]);

  useEffect(() => {
    setParentCategory(pCat);
  }, [category.isLoaded]);

  useEffect(() => {
    setLoading(category.loading);
  }, [category.loading]);

  // loading ? <Loading visible={category.loading} /> : null;

  if (category.isLoaded && parentCategory.length > 0) {
    return (
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
    );
  }

  return category.isLoaded ? null : loading ? (
    <Loading visible={loading} />
  ) : (
    <NoResponse />
  );
};

export default ParentMenu;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
