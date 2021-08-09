import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import LottieView from "lottie-react-native";
import NoResponse from "../../components/NoResponse";
import { getProductsByslug } from "../../store/actions/product.action";
import { addToCart } from "../../store/actions";
const PrdoductBySlug = ({ slug, navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByslug(slug));
  }, []);
  const { productsByPrice, loadingByPrice } = useSelector(
    (state) => state.product
  );

  const renderProduct = ({ item }) => {
    const { _id, name, price, productPictures, quantity } = item;

    const addCart = (item) => {
      const { _id, name, price } = item;
      const pictures = item.productPictures;
      const img = pictures[0].img;
      console.log(img);
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
        iconLeft={"circle-expand"}
        iconRight
      />
    );
  };

  if (loadingByPrice) {
    return (
      <LottieView
        source={require("../../public/assets/lottie/rocket-launch.json")}
        style={{ margin: 20 }}
        autoPlay
        loop
      />
    );
  }

  return !loadingByPrice && Object.keys(productsByPrice).length > 0 ? (
    Object.keys(productsByPrice).map(
      (key, index) =>
        productsByPrice[key].length > 0 && (
          <FlatList
            key={key}
            data={productsByPrice[key]}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={renderProduct}
          />
        )
    )
  ) : (
    <NoResponse />
  );
};

export default PrdoductBySlug;

const styles = StyleSheet.create({});
