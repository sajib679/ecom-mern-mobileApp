import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import SubMenuCard from "./components/SubMenuCardwithImage";
import PrdoductBySlug from "../productScreen/ProductBySlug";

const Category = ({ route, navigation }) => {
  const { parentId, slug } = route.params;
  const category = useSelector((state) => state.category.categoryList);
  const subCat = category.filter((cat) => cat.parentId == parentId);

  const [subMenu, setSubMenu] = useState([]);
  useEffect(() => {
    setSubMenu(subCat);
  }, []);

  const grid = ({ item }) => {
    console.log(item.categoryImage);
    return (
      <SubMenuCard
        catName={item.name}
        img={item.categoryImage?.img}
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
