import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Title, Avatar } from "react-native-paper";

const EmptyCard = ({ uri, message }) => {
  console.log(uri);
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.center}>
          <Image
            resizeMode="cover"
            style={styles.tinyLogo}
            source={require("../public/images/emptyCart.jpg")}
          />
          <Title>{message}</Title>
        </View>
      </View>
    </View>
  );
};

export default EmptyCard;

const styles = StyleSheet.create({
  card: {
    height: "100%",
    width: "100%",
    shadowColor: "#000",
    borderRadius: 10,
  },

  tinyLogo: { width: 200, height: 200 },
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 2,
    backgroundColor: "#fff",
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
