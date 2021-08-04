import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../store/actions";
import Card from "../../components/Card";
import Price from "../../components/Price";
import { imageUrl } from "../../helpers/urlConfig";
import { ScrollView } from "react-native-gesture-handler";
import SectionHeader from "../../components/SectionHeader";

const OrderDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    const payload = route.params;
    console.log(payload);

    dispatch(getOrder(payload));
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <ScrollView>
      <Card>
        <View style={styles.flexRow}>
          <Text style={styles.blackText}>OrderId:</Text>
          <Text>{orderDetails._id}</Text>
        </View>
        <View style={styles.flexRow}>
          <View style={{ marginEnd: 10, flex: 1 }}>
            <Text style={styles.blackText}>Delivery Address</Text>
            <Text>{orderDetails.address.name}</Text>
            <Text>{orderDetails.address.address}</Text>
            <Text>Phone number {orderDetails.address.mobileNumber}</Text>
          </View>
          <View style={{ alignItems: "flex-end", flex: 1 }}>
            <Text style={styles.blackText}>More Actions</Text>
            <Text>Download Invoice</Text>
          </View>
        </View>
      </Card>
      <Card>
        <View>
          <View style={styles.flexRow}>
            {orderDetails.orderStatus.map((status, index) => (
              <View key={index} style={{ flex: 1 }}>
                <View style={[styles.orderTrack]}>
                  <View
                    style={
                      status.isCompleted
                        ? styles.orderStatusActive
                        : styles.orderStatus
                    }
                  ></View>
                  <View
                    style={
                      status.isCompleted
                        ? styles.orderStatusPointActive
                        : styles.orderStatusPoint
                    }
                  ></View>
                </View>

                <View>
                  <Text style={{ textTransform: "capitalize" }}>
                    {status.type}
                  </Text>
                  <Text>{formatDate(status.date)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Card>
      <Card>
        <View style={styles.flexRow}>
          <Text>Total Amount: {""}</Text>
          <Text style={styles.blackText}>{orderDetails.totalAmount} tk.</Text>
        </View>
      </Card>
<<<<<<< HEAD
      <SectionHeader text="Items" />
      {orderDetails.items.map((item, index) => (
        <Card key={index}>
          <View style={styles.flexRow}>
            <View
              style={{
                marginEnd: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 50, height: 50 }}
                source={
                  item.productId.productPictures.length > 0
                    ? {
                        uri: imageUrl(item.productId.productPictures[0].img),
                      }
                    : require("../../../src/public/images/404.png")
                }
              />
=======
      <Card>
        {orderDetails.items.map((item, index) => (
          <Card key={index}>
            <View style={styles.flexRow}>
              <View style={{ marginEnd: 10, borderRadius: 10 }}>
                <Image
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri: imageUrl(item.productId.productPictures[0].img),
                  }}
                />
              </View>
              <View style={{ flexShrink: 1, justifyContent: "space-between" }}>
                <Text>{item.productId.name}</Text>
                <Price
                  value={item.payablePrice}
                  purchaseQuantity={item.purchasedQty}
                />
              </View>
>>>>>>> parent of fdc46a4... React Native -Android Working Succesfully except Icons
            </View>
            <View style={{ flexShrink: 1, justifyContent: "space-between" }}>
              <Text>{item.productId.name}</Text>
              <Price
                value={item.payablePrice}
                purchaseQuantity={item.purchasedQty}
              />
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  flexRow: { flexDirection: "row", flex: 1 },
  orderTrack: {
    height: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  orderStatus: {
    width: "100%",
    height: 3,
    backgroundColor: "#777",
    position: "relative",
  },
  orderStatusActive: {
    width: "100%",
    height: 3,
    position: "relative",
    backgroundColor: "#26A541",
  },
  orderStatusLastChild: {
    width: 0,
  },
  orderStatusPoint: {
    width: 15,
    height: 15,
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "#777",
  },
  orderStatusPointActive: {
    width: 15,
    height: 15,
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "#26A541",
  },
  blackText: { color: "black", fontWeight: "bold" },
  lightText: { color: "gray" },
});
