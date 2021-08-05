import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import ProductCard from "../../components/ProductCard";
import Loading from "../LoadingScreen";
import { addToCart } from "../../store/actions/cart.action";
import SearchComp from "../SearchedProduct/index";
import { RefreshControl, FlatList, ScrollView } from "react-native";
import { getAllBanner, getInitialData } from "../../store/actions";
import NoResponse from "../../components/NoResponse";
import Carousel from "../../components/Carousel";
import SectionHeader from "../../components/SectionHeader";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AllProduct = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const product = useSelector((state) => state.product);
  const banners = useSelector((state) => state.banner.banners);
  const [bannerImages, setBannerImages] = useState([]);
  const [allProduct, setallProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setBannerImages(banners[0]?.bannerImages);
    setallProduct(product.products);
  }, [product.isLoaded, refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getInitialData());
    setallProduct(product.products);
    wait(1000).then(() => setRefreshing(false));
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

  if (product.isLoaded) {
    return (
      <>
        <SearchComp navigation={navigation}></SearchComp>

        <ScrollView style={{ marginBottom: 5 }}>
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />

          <SectionHeader button="SEE ALL" text="Highest Review" />
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={allProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />

          <SectionHeader button="SEE ALL" text="Top Selling" />
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={allProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />

          <SectionHeader button="SEE ALL" text="Top Brand" />
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={allProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <SectionHeader button="SEE ALL" text="Offer" />
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={allProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </ScrollView>
      </>
    );
  }

  return !product.loading ? (
    <NoResponse />
  ) : (
    <Loading visible={!product.isLoaded} />
  );
};

export default AllProduct;

const styles = StyleSheet.create({
  screenView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
