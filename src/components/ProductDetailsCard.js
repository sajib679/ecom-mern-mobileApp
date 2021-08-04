import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Subheading,
} from "react-native-paper";
import Color from "../Colors";
import Carousel from "../components/Carousel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Hr from "./Hr";
const { width, height } = Dimensions.get("window");

const ProductDetailsCard = ({
  name,
  price,
  quantity,
  addToCart,
  description,
  viewDetails,
  goBack,
  images,
  iconLeft,
  iconRight,
}) => (
  <Card style={styles.product}>
    <ScrollView>
      <Hr />
      {images.length > 0 ? (
        <Carousel imgHeight={width * (3 / 4)} data={images} />
      ) : (
        <Image
          resizeMode="contain"
          style={{ height: 100, width: "auto", margin: 5 }}
          source={{ uri: "https://img.icons8.com/clouds/2x/no-image.png" }}
        ></Image>
      )}

      <Hr />
      <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 2 }}>
        <Title>{name}</Title>
        <Subheading style={{ fontWeight: "700" }}>Price: {price} </Subheading>

        {quantity && <Paragraph>Available Qty: {quantity}</Paragraph>}
        <Paragraph style={{ fontWeight: "700" }}>Description:</Paragraph>
        <Text>{description}</Text>
      </View>
    </ScrollView>

    <View
      style={{
        justifyContent: "space-between",
        paddingVertical: 0,
        flexDirection: "row",
      }}
    >
      {iconLeft && (
        <Button
          style={{
            flex: 1,
            backgroundColor: Color.offWhite,
            alignItems: "center",
          }}
          mode="contained"
          onPress={goBack}
        >
          <MaterialCommunityIcons name={iconLeft} size={18} color="gray" />
          <View style={{ width: 10 }}></View>
          <Text style={{ color: "gray" }}>Go Back</Text>
        </Button>
      )}

      {iconRight && (
        <Button
          style={{
            flex: 1,
            alignItems: "center",
          }}
          mode="contained"
          onPress={addToCart}
        >
          <Text style={{ color: Color.platinum }}>ADD TO CART</Text>
          <View style={{ width: 10 }}></View>
          <MaterialCommunityIcons
            name="cart-plus"
            size={18}
            color={Color.offWhite}
          />
        </Button>
      )}
    </View>
  </Card>
);

export default ProductDetailsCard;

const styles = StyleSheet.create({
  product: {
    flex: 1,
    // marginHorizontal: 2,
    // marginVertical: 2,

    borderRadius: 2,
  },
  catText: {
    fontSize: 20,
  },

  shadow: {
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 2,
    elevation: 1,
  },
});
