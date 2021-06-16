import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import Loading from "../LoadingScreen";
import { imageUrl } from "../../helpers/urlConfig";
import {
  addToCart,
  getProductsById,
  resetProductDetails,
} from "../../store/actions";

const ProductDetails = ({ route, navigation }) => {
  const { productId } = route.params;
  console.log(productId);
  const [details, setDetails] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsById(productId));
    setDetails(productDetails);
  }, []);
  const { productDetails, isLoaded } = useSelector((state) => state.product);

  const addCart = (item) => {
    console.log(item);
    const { _id, name, price } = item;
    const pictures = item.productPictures;
    const img = pictures[0].img;
    dispatch(addToCart({ _id, name, price, img }));
  };

  return isLoaded ? (
    Object.keys(productDetails).length > 0 ? (
      <ProductCard
        name={productDetails.name}
        price={productDetails.price}
        quantity={productDetails.quantity}
        img={productDetails.productPictures[0].img}
        viewDetails={() => {
          dispatch(resetProductDetails());
          navigation.goBack();
        }}
        addToCart={() => addCart(productDetails)}
        iconLeft={"arrow-back-sharp"}
        iconRight
      />
    ) : null
  ) : (
    <Loading />
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
