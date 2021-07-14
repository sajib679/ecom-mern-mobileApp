import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../../components/Card";
const OrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.user.orders);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getOrders());
    }
  }, [auth.authenticate, orders]);

  const date = (timestamp) => {
    const unixTimestamp = Date.parse(timestamp);
    const date = new Date(unixTimestamp);
    const ddmmyy =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "    " +
      "||" +
      "   " +
      date.getHours() +
      ":" +
      date.getMinutes();
    return ddmmyy;
  };

  const grid = ({ item }) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          onPress={() =>
            navigation.navigate("OrderDetails", { orderId: item._id })
          }
        >
          <View style={[styles.flexRow]}>
            <Text style={[styles.boldFont, { color: "#636363", marginEnd: 5 }]}>
              {" "}
              Order Id:
            </Text>
            <Text style={styles.normalFont}> {item._id}</Text>
          </View>

          <View style={[styles.flexRow]}>
            <View style={styles.flexRow}>
              <Text style={styles.normalFont}> Item: </Text>
              <Text style={{ marginLeft: 10, color: "#333333" }}>
                {item.items.length}
              </Text>
            </View>
            <View style={{ flex: 2 }}>
              <View style={styles.flexRow}>
                <Text style={styles.normalFont}> Amount: </Text>
                <Text style={{ marginLeft: 10, color: "#333333" }}>
                  {item.totalAmount} tk.
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.3,
              paddingVertical: 5,
            }}
          ></View>
          <View style={styles.flexRow}>
            <Text style={[styles.normalFont, { marginEnd: 3, padding: 1 }]}>
              {" "}
              Status:
            </Text>
            {item.orderStatus.map((status, index) => {
              return (
                <View key={index} style={styles.flexRow}>
                  <Text
                    style={[
                      styles.normalFont,
                      {
                        color: status.isCompleted ? "green" : "#636363",
                      },
                    ]}
                  >
                    {status.type}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>
      </View>
    );
  };

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={grid}
    />
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  boldFont: { fontWeight: "bold", color: "#333333" },
  normalFont: { color: "#636363", fontSize: 12 },
  flexRow: { flexDirection: "row", flex: 1, padding: 1 },
});
