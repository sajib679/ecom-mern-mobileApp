import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { imageUrl } from "../helpers/urlConfig";

const viewWidth = Math.floor(Dimensions.get("window").width);

const Index = ({ imgWidth, imgHeight, data, ...rest }) => {
  const bannerImage = ({ item, index }) => {
    return (
      <Image
        resizeMode="contain"
        key={index}
        style={{
          width: imgWidth || "100%",
          height: imgHeight || 140,
        }}
        source={{ uri: imageUrl(item.img) || item }}
      />
    );
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <Carousel
        loop={true}
        {...rest}
        data={data}
        renderItem={bannerImage}
        itemWidth={imgWidth || 300}
        itemHeight={imgHeight || 120}
        sliderWidth={viewWidth}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
