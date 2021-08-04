import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Avatar, Badge } from "react-native-paper";
import { Text } from "react-native-elements";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { imageUrl } from "../helpers/urlConfig";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Cart = ({ img, name, price, quantity, plus, minus, remove }) => {
  return (
    <TouchableWithoutFeedback onLongPress={remove}>
      <View style={styles.container}>
        <View
          style={{
            marginEnd: 1,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: 60, height: 60 }}
            source={{
              uri: img
                ? imageUrl(img)
                : "https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png",
            }}
          />
        </View>

        <View style={[styles.productInfo, { justifyContent: "space-around" }]}>
          <Text
            numberOfLines={2}
            style={{ fontWeight: "bold", color: "#636363" }}
          >
            {name}
          </Text>
          <Text style={{ color: "#636363" }}>Tk. {price}</Text>
        </View>

        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="plus-circle"
            size={24}
            onPress={plus}
            color="#828285"
          />
          <Badge size={22}>{quantity}</Badge>
          <MaterialCommunityIcons
            name="minus-circle"
            size={24}
            onPress={minus}
            color="#828285"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
    elevation: 2,
    margin: 5,
    backgroundColor: "white",
    maxHeight: 80,
    borderRadius: 3,
  },
  productInfo: {
    flex: 2,
    marginHorizontal: 32,
  },
  icon: {
    alignItems: "center",
  },
});
