import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { imageUrl } from "../helpers/urlConfig";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Subheading,
} from "react-native-paper";
import Hr from "./Hr";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const ProductCard = ({
  name,
  price,
  quantity,
  addToCart,
  viewDetails,
  img,
  iconLeft,
  iconRight,
}) => (
  <Card style={styles.product}>
    <Subheading numberOfLines={1} style={{ fontWeight: "bold" }}>
      {name}
    </Subheading>
    <Paragraph h6>Price: {price}</Paragraph>
    {quantity && <Paragraph>Qty: {quantity}</Paragraph>}
    {/* <Hr /> */}
    <Image
      resizeMode="contain"
      style={{ height: 100, width: "auto", margin: 5 }}
      source={
        img
          ? { uri: imageUrl(img) }
          : { uri: "https://img.icons8.com/clouds/2x/no-image.png" }
      }
    ></Image>
    {/* <Hr /> */}

    <View
      style={{
        justifyContent: "space-between",
        paddingVertical: 0,
        flexDirection: "row",
      }}
    >
      {iconLeft && (
        <Button onPress={viewDetails}>
          <Ionicons name={iconLeft} size={18} color="gray" />
        </Button>
      )}

      {iconRight && (
        <Button onPress={addToCart}>
          <MaterialCommunityIcons name="cart-plus" size={18} color="red" />
        </Button>
      )}
    </View>
  </Card>
);

export default ProductCard;

const styles = StyleSheet.create({
  product: {
    flex: 1 / 3,
    marginHorizontal: 2,
    marginVertical: 2,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  catText: {
    fontSize: 20,
  },

  shadow: {
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
});
