import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../../components/ProductDetailsCard";
import Loading from "../LoadingScreen";
import NoResponse from "../../components/NoResponse";
import LottieView from "lottie-react-native";

import {
  addToCart,
  getProductsById,
  resetProductDetails,
} from "../../store/actions";

const ProductDetails = ({ route, navigation }) => {
  const { productId } = route.params;
  const [details, setDetails] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsById(productId));
    setDetails(productDetails);
  }, []);

  const { productDetails, isLoaded, loading } = useSelector(
    (state) => state.product
  );

  const addCart = (item) => {
    console.log(item);
    const { _id, name, price } = item;
    const pictures = item.productPictures;
    const img = pictures[0].img;
    dispatch(addToCart({ _id, name, price, img }));
  };

  if (loading) {
    return (
      <LottieView
        source={require("../../public/assets/lottie/loading-circular-animations.json")}
        colorFilters={[
          {
            keypath: "button",
            color: "#F00000",
          },
          {
            keypath: "Sending Loader",
            color: "#F00000",
          },
        ]}
        autoPlay
        loop
      />
    );
  }

  return Object.keys(productDetails).length > 0 ? (
    <ProductDetailsCard
      name={productDetails.name}
      price={productDetails.price}
      quantity={productDetails.quantity}
      images={
        productDetails.productPictures.length > 0 &&
        productDetails.productPictures
      }
      description={productDetails.description}
      goBack={() => {
        navigation.goBack();
      }}
      addToCart={() => addCart(productDetails)}
      iconLeft={"arrow-left"}
      iconRight
    />
  ) : (
    <NoResponse />
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
