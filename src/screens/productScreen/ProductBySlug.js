import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import { imageUrl } from "../../helpers/urlConfig";
import Loading from "../LoadingScreen";
import { getProductsByslug } from "../../store/actions/product.action";
import { addToCart } from "../../store/actions";
const PrdoductBySlug = ({ slug, navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByslug(slug));
  }, []);

  const prdoductBySlug = useSelector((state) => state.product.productsByPrice);

  const renderProduct = ({ item }) => {
    const { _id, name, price, productPictures, quantity } = item;

    const addCart = (item) => {
      const { _id, name, price } = item;
      const pictures = item.productPictures;
      const img = pictures[0].img;
      dispatch(addToCart({ _id, name, price, img }));
    };

    return (
      <ProductCard
        name={name}
        price={price}
        quantity={quantity}
        img={productPictures[0]?.img}
        viewDetails={() =>
          navigation.navigate("ProductDetails", {
            productId: item._id,
          })
        }
        addToCart={() => addCart(item)}
        iconLeft={"expand"}
        iconRight
      />
    );
  };

  return prdoductBySlug ? (
    Object.keys(prdoductBySlug).map(
      (key, index) =>
        prdoductBySlug[key].length > 0 && (
          <FlatList
            key={key}
            data={prdoductBySlug[key]}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={renderProduct}
          />
        )
    )
  ) : (
    <Loading />
  );
};

export default PrdoductBySlug;

const styles = StyleSheet.create({});
