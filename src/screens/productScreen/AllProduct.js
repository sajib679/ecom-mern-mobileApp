import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import ProductCard from "../../components/ProductCard";
import { addToCart } from "../../store/actions/cart.action";
import SearchComp from "../SearchedProduct/index";
import { RefreshControl, FlatList, ScrollView } from "react-native";
import { getInitialData } from "../../store/actions";
import NoResponse from "../../components/NoResponse";
import Carousel from "../../components/Carousel";
import SectionHeader from "../../components/SectionHeader";
import LottieView from "lottie-react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AllProduct = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const banners = useSelector((state) => state.banner.banners);
  const [bannerImages, setBannerImages] = useState([]);
  const [allProduct, setallProduct] = useState([]);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { isLoaded, loading } = useSelector((state) => state.initData);

  useEffect(() => {
    setBannerImages(banners[0]?.bannerImages);
    setallProduct(products);
  }, [refreshing, isLoaded, allProduct]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getInitialData());
    setallProduct(products);
    wait(10).then(() => setRefreshing(false));
  }, []);

  const addCart = (item) => {
    const { _id, name, price } = item;
    const pictures = item.productPictures;
    const img = pictures[0].img;
    dispatch(addToCart({ _id, name, price, img }));
  };

  const renderProduct = ({ item }) => {
    const { _id, name, price, productPictures } = item;

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

  if (loading) {
    return (
      <LottieView
        source={require("../../public/assets/lottie/loading-compass.json")}
        style={{ margin: 20 }}
        autoPlay
        loop
      />
    );
  }

  if (allProduct.length > 0) {
    return (
      <>
        <SearchComp navigation={navigation}></SearchComp>

        <ScrollView
          style={{ marginBottom: 5 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {bannerImages?.length > 0 && (
            <Carousel data={bannerImages} autoplay={true} />
          )}

          <SectionHeader button="SEE ALL" text="Most Recent" />
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={allProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
          />

          <SectionHeader button="SEE ALL" text="Highest Review" />
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={allProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
          />

          <SectionHeader button="SEE ALL" text="Top Selling" />
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={allProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
          />

          <SectionHeader button="SEE ALL" text="Top Brand" />
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={allProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
          />
          <SectionHeader button="SEE ALL" text="Offer" />
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={allProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
          />
        </ScrollView>
      </>
    );
  } else if (allProduct.length === 0) {
    return null;
  }
  return <NoResponse />;
};

export default AllProduct;

const styles = StyleSheet.create({
  screenView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
