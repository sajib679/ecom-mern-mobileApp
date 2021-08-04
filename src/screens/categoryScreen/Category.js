import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import SubMenuCard from "./components/SubMenuCard";
import SnackBar from "../../components/SnackBar";
import PrdoductBySlug from "../productScreen/ProductBySlug";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Category = ({ route, navigation }) => {
  const { parentId, slug } = route.params;
  const category = useSelector((state) => state.category.categoryList);
  const subCat = category.filter((cat) => cat.parentId == parentId);

  const [subMenu, setSubMenu] = useState([]);
  useEffect(() => {
    setSubMenu(subCat);
  }, []);

  console.log("from Cat:", subMenu);

  const grid = ({ item }) => {
    console.log(item.slug);
    return (
      <SubMenuCard
        catName={item.name}
        color="tomato"
        onTap={() => {
          navigation.push("Category", {
            parentId: `${item._id}`,
            name: `${item.name}`,
            slug: `${item.slug}`,
          });
        }}
      />
    );
  };
  return (
    <View>
      {subMenu.length > 0 ? (
        <FlatList
          data={subMenu}
          numColumns={3}
          keyExtractor={(item) => item._id}
          renderItem={grid}
        />
      ) : (
        <PrdoductBySlug slug={slug} navigation={navigation} />
      )}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
