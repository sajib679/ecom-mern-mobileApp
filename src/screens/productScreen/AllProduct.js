import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import ProductCard from "../../components/ProductCard";
import Loading from "../LoadingScreen";
import { addToCart } from "../../store/actions/cart.action";
import SearchComp from "../SearchedProduct/index";
import { RefreshControl, FlatList, ScrollView } from "react-native";
import { getInitialData } from "../../store/actions";
import NoResponse from "../../components/NoResponse";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AllProduct = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const product = useSelector((state) => state.product);
  const [allProduct, setallProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setallProduct(product.products);
  }, [product.isLoaded, refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getInitialData());
    setallProduct(product.products);
    wait(100).then(() => setRefreshing(false));
  }, []);

  const addCart = (item) => {
    const { _id, name, price, productPictures } = item;
    let img;
    if (productPictures.length > 0) {
      img = productPictures[0].img;
    } else {
      img = null;
    }
    dispatch(addToCart({ _id, name, price, img }));
  };

  const renderProduct = ({ item }) => {
    const { _id, name, price, productPictures, quantity } = item;

    return (
      <ProductCard
        name={name}
        price={price}
        img={productPictures[0]?.img}
        viewDetails={() =>
          navigation.navigate("ProductDetails", {
            productId: item._id,
          })
        }
        addToCart={() => addCart(item)}
        iconLeft={"circle-expand"}
        iconRight
      />
    );
  };

  if (product.isLoaded) {
    return (
      <>
        <SearchComp navigation={navigation}></SearchComp>
        <FlatList
          data={allProduct}
          keyExtractor={(item) => item._id}
          numColumns={3}
          renderItem={renderProduct}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </>
    );
  }

  return !product.loading ? (
    <NoResponse />
  ) : (
    <Loading visible={product.loading} />
  );
};

export default AllProduct;

const styles = StyleSheet.create({});
