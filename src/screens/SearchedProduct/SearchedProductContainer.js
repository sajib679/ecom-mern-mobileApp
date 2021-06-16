import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchFocused, addToCart } from "../../store/actions";
import ProductCard from "../../components/ProductCard";
import Card from "../../components/Card";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  Fontisto,
} from "@expo/vector-icons";

const SearchedProductStore = ({ navigation }) => {
  const product = useSelector((state) => state.product.searchedProduct);
  const [searchedProduct, setSearchedProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchedProduct(product);
  }, [product, searchedProduct]);

  const { focused, searchTermLength } = useSelector((state) => state.search);
  console.log(focused, searchTermLength);

  const addCart = (item) => {
    console.log(item);
    const { _id, name, price } = item;
    const pictures = item.productPictures;
    const img = pictures[0].img;
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
        iconLeft={"expand"}
        iconRight
      />
    );
  };

  if (searchedProduct?.length > 0) {
    return (
      <View
        style={{
          zIndex: 1,
          width: "100%",
          position: "relative",
          display: searchTermLength > 1 ? "flex" : "none",
        }}
      >
        <Card>
          <TouchableNativeFeedback
            onPress={() => {
              dispatch(searchFocused(false, 0));
            }}
            style={{ position: "relative", top: -10, left: -10 }}
          >
            <AntDesign name="closecircle" size={24} color="black" />
          </TouchableNativeFeedback>

          {searchedProduct.length > 0 && (
            <FlatList
              data={searchedProduct}
              keyExtractor={(item) => item._id}
              numColumns={3}
              renderItem={renderProduct}
            />
          )}
        </Card>
      </View>
    );
  } else {
    return (
      <Card>
        <Text> No product to show</Text>
      </Card>
    );
  }
};

export default SearchedProductStore;

const styles = StyleSheet.create({});
