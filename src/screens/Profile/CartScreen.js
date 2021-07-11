import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import Cart from "../../components/Cart";
import PriceDetails from "../../components/PriceDetails";
import { FlatList } from "react-native-gesture-handler";
import { addToCart, removeCartItem } from "../../store/actions";
import { Button } from "react-native-paper";
import EmptyCard from "../../components/EmptyCard";

const CartScreen = ({ route, navigation, onlyCartItems }) => {
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();
  const item = Object.keys(cart.cartItems).map(
    (key, index) => cart.cartItems[key]
  );
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    if (qty < 1) {
      dispatch(removeCartItem({ productId: _id }));
    }
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (onlyCartItems) {
    return (
      <>
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </>
    );
  }

  return item.length > 0 ? (
    <>
      <FlatList
        data={item}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <Cart
              name={item.name}
              img={item.img}
              price={item.price}
              quantity={item.qty}
              plus={() => onQuantityIncrement(item._id)}
              minus={() => onQuantityDecrement(item._id)}
              remove={() => onRemoveCartItem(item._id)}
            />
          );
        }}
      />
      <PriceDetails
        totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
          return qty + cart.cartItems[key].qty;
        }, 0)}
        totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
          const { price, qty } = cart.cartItems[key];
          return totalPrice + price * qty;
        }, 0)}
      />
      <Button
        style={{ marginVertical: 5, marginHorizontal: 5 }}
        color="#FAF9F6"
        icon="cart-arrow-down"
        mode="contained"
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text>Confirm Order</Text>
      </Button>
    </>
  ) : (
    <EmptyCard
      message={"No Item Added"}
      uri="https://www.kindpng.com/picc/m/289-2892204_your-cart-is-empty-empty-cart-icon-png.png"
    />
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
