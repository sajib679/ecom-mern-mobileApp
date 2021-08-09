import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { imageUrl } from "../../../helpers/urlConfig";

const CategoryGrid = ({ color, catName, onTap, img }) => {
  const [height, setheight] = useState();

  const findwidth = (event) => {
    var { x, y, width, height } = event.nativeEvent.layout;
    setheight(Math.floor(width));
  };
  return (
    <TouchableWithoutFeedback onPress={onTap}>
      <View
        onLayout={findwidth}
        style={[
          styles.category,
          {
            backgroundColor: `${color ? "tomato" : "#FAF9F6"}`,
            height: height,
            width: "100%",
            maxWidth: "31%",
            maxHeight: height,
            borderRadius: 10,
          },
        ]}
      >
        {img && (
          <Image
            style={{ width: "80%", height: "80%" }}
            source={{ uri: imageUrl(img) }}
          ></Image>
        )}
        {catName && <Text style={styles.catText}>{catName}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoryGrid;

const styles = StyleSheet.create({
  category: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
    padding: 10,
    borderBottomColor: "#cecece",
    marginVertical: 4,
    marginHorizontal: 4,
  },
  catText: {
    fontSize: 16,
    textAlign: "center",
  },
});
