import * as React from "react";
import { Carousel } from "react-native-ui-lib";
import { View, Text } from "react-native";
import { useTheme } from "styled-components/native";

export interface ChordCarouselProps {
  chordDiagrams: number[]; // TODO: Change to hold actual chord data
}
const ChordCarousel: React.FC<ChordCarouselProps> = ({ chordDiagrams }) => {
  const theme = useTheme();

  return (
    <Carousel
      pageWidth={350}
      initialPage={0}
      containerStyle={{ height: 200 }}
      loop={true}
      pageControlProps={{
        color: theme.textDarkBlue,
        inactiveColor: theme.backgroundLightBlue,
        size: 10,
        spacing: 8,
      }}
      pageControlPosition={Carousel.pageControlPositions.UNDER}
      allowAccessibleLayout
      testID="carousel"
    >
      {chordDiagrams.map((item, i) => {
        return (
          // TODO: Replace with actual chord diagram
          <View
            key={i}
            style={{
              width: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
            testID={`carousel-item-${i}`}
          >
            <Text>{item}</Text>
          </View>
        );
      })}
    </Carousel>
  );
};
export default ChordCarousel;
