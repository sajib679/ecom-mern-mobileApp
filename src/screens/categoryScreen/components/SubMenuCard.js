import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

const CategoryGrid = ({ color, catName, onTap }) => {
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
            backgroundColor: `${color ? "#FAF9F6" : "tomato"}`,
            height: height,
            width: "100%",
            maxWidth: "31%",
            maxHeight: height,
            borderRadius: 10,
          },
        ]}
      >
        {catName && <Text style={styles.catText}>{catName}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoryGrid;

const styles = StyleSheet.create({
  category: {
    flex: 1,
    padding: 4,
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
    fontSize: 18,
  },
});
