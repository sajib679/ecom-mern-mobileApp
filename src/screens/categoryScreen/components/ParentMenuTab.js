import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import SubMenuCard from "./SubMenuCard";
import SnackBar from "../../../components/SnackBar";

import PrdoductBySlug from "../../productScreen/ProductBySlug";

const ParentMenuTab = ({ route, navigation, slug }) => {
  const { parentId } = route.params;
  const category = useSelector((state) => state.category.categoryList);
  const subCat = category.filter((cat) => cat.parentId == parentId);

  const [subMenu, setSubMenu] = useState([]);
  useEffect(() => {
    setSubMenu(subCat);
  }, []);

  const grid = ({ item }) => {
    return (
      <SubMenuCard
        catName={item.name}
        color=" #f5f5f5"
        onTap={() => {
          navigation.navigate("Category", {
            parentId: `${item._id}`,
            name: `${item.name}`,
            slug: `${item.slug}`,
          });
        }}
      />
    );
  };
  return subMenu.length > 0 ? (
    <FlatList
      data={subMenu}
      numColumns={3}
      keyExtractor={(item) => item._id}
      renderItem={grid}
    />
  ) : (
    <SubMenuCard catName={"No Category Available"} color=" #f5f5f5" />
  );
};

export default ParentMenuTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
  },
});
