import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import { cartConstants, getOrders } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../store/actions";
import CheckoutStep from "./CheckoutStep";
import Address from "./Address";
import AddressForm from "../../components/AddressForm";
import CartScreen from "../Profile/CartScreen";
import { StackActions } from "@react-navigation/native";
import Card from "../../components/Card";

const Checkout = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);

  useEffect(() => {
    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener("focus", () => {
      setAddress([]);
      setSelectedAddress(null);
      setConfirmAddress(false);
      setOrderSummary(false);
      setConfirmOrder(false);
      setNewAddress(false);
      setPaymentOption(false);
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }, [navigation]);

  const handleNewAddress = () => {
    setNewAddress(!newAddress);
  };

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };

    // console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    if (user.address) {
      const address = user.address.map((adr) => ({
        ...adr,
        selected: false,
        edit: false,
      }));
      setAddress(address);
    }
  }, [user.address]);

  useEffect(() => {
    if (confirmOrder && user.placedOrderId) {
      navigation.dispatch(StackActions.popToTop());
      dispatch(getOrders());
      navigation.navigate("User", { screen: "Order" });
    }
  }, [user.placedOrderId]);

  return (
    <ScrollView>
      <CheckoutStep
        stepNumber="1"
        title="LOGIN"
        active={!auth.authenticate}
        body={
          auth.authenticate ? (
            <View style={[styles.addressContainer]}>
              <Card>
                <Text style={{ fontWeight: "500" }}>{auth.user.fullName}</Text>
                <Text style={{}}>{auth.user.email}</Text>
              </Card>
              {/* <View style={{ marginLeft: 20, marginTop: 2 }}></View> */}
            </View>
          ) : (
            <View>
              <Text>you are not logged in</Text>
              {/* <TextInput /> */}
            </View>
          )
        }
      />
      <CheckoutStep
        stepNumber={"2"}
        title={"DELIVERY ADDRESS"}
        active={!confirmAddress && auth.authenticate}
        body={
          <>
            {newAddress == false && (
              <View>
                {confirmAddress ? (
                  <View style={styles.addressContainer}>
                    <Card>
                      <View style={{ marginBottom: 6 }}>
                        <View style={styles.addressDetail}></View>
                        <Text>{selectedAddress.name}</Text>
                        <Text>{selectedAddress.mobileNumber}</Text>
                        <Text>
                          {selectedAddress.address}
                          {`${selectedAddress.state} - ${selectedAddress.pinCode} , ${selectedAddress.cityDistrictTown}`}
                        </Text>
                      </View>
                    </Card>
                  </View>
                ) : (
                  address.map((adr, index) => (
                    <Address
                      index={index}
                      key={adr._id}
                      adr={adr}
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      setNewAddress={setNewAddress}
                    />
                  ))
                )}
              </View>
            )}
          </>
        }
      />

      {/* AddressForm */}
      {confirmAddress ? null : newAddress ? (
        <AddressForm
          onSubmitForm={onAddressSubmit}
          onCancel={() => {
            setNewAddress(false);
            console.log("oncancel");
          }}
        />
      ) : auth.authenticate ? (
        <CheckoutStep
          stepNumber={"+"}
          title={"ADD NEW ADDRESS"}
          active={newAddress}
          onClick={handleNewAddress}
        />
      ) : null}

      <CheckoutStep
        stepNumber={"3"}
        title={"ORDER SUMMARY"}
        active={orderSummary}
        body={
          orderSummary ? (
            <View style={styles.addressContainer}>
              <CartScreen onlyCartItems={true} />
            </View>
          ) : orderConfirmation ? (
            <View style={styles.addressContainer}>
              <CartScreen onlyCartItems={true} />
            </View>
          ) : null
        }
      />

      {orderSummary && (
        <View
          style={{
            padding: 5,
            alignItems: "center",
          }}
        >
          <View style={styles.flexRow}>
            <Text style={{ fontSize: 12 }}>
              Order confirmation email will be sent to:
            </Text>

            <View
              style={{
                padding: 2,
                elevation: 2,
                backgroundColor: "white",
                borderRadius: 5,
                marginHorizontal: 5,
              }}
            >
              <Text style={{ fontSize: 14, marginHorizontal: 2 }}>
                {auth.user.email}
              </Text>
            </View>
          </View>
          <Button
            style={{
              marginVertical: 5,
              borderColor: "#636363",
              borderWidth: 0.3,
            }}
            mode="contained"
            color="#FAF9F6"
            onPress={userOrderConfirmation}
          >
            <Text>continue</Text>
          </Button>
        </View>
      )}

      <CheckoutStep
        stepNumber={"4"}
        title="PAYMENT OPTIONS"
        active={paymentOption}
        body={
          paymentOption && (
            <View>
              <Card>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton value="cod" status={"checked"} />
                  <Text>Cash on delivery</Text>
                </View>
              </Card>
              <Button
                mode="contained"
                color="#FAF9F6"
                onPress={onConfirmOrder}
                style={{
                  width: "98%",
                  alignSelf: "center",
                  borderColor: "#636363",
                  borderWidth: 0.3,
                }}
                fontSize={15}
              >
                <Text>Place Order</Text>
              </Button>
            </View>
          )
        }
      />
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  flexRow: { flexDirection: "row", marginVertical: 4, alignItems: "center" },
  addressinfo: {
    width: "100%",
  },

  addressContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    backgroundColor: "#f5faff",
    flex: 1,
  },

  addressDetail: {
    paddingBottom: 0,
    fontWeight: "600",
    fontSize: 12,
  },

  addressType: {
    textTransform: "uppercase",
  },
  fullAddress: {
    fontSize: 12,
  },
  stepCompleted: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    fontSize: 12,
  },
  addressName: { fontSize: 12 },
  addressMobileNumber: { fontSize: 12 },
});
