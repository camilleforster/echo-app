import React from "react";
import { render } from "@testing-library/react-native";
import Theme from "../../../Theme";
import ChordCarousel, {
  ChordCarouselProps,
} from "../../components/ChordCarousel";

/**
 * Renders the ChordCarousel component wrapped in a ThemeProvider with the default theme.
 *
 * @param props - The props for the ChordCarousel component
 */
const renderComponent = (props: ChordCarouselProps) => {
  return render(
    <Theme>
      <ChordCarousel {...props} />
    </Theme>,
  );
};

describe("ChordCarousel", () => {
  const chordDiagrams = [1, 2, 3]; // TODO: Update test for actual chord data

  it("renders all chord diagrams", () => {
    const { getAllByTestId } = renderComponent({ chordDiagrams });

    chordDiagrams.forEach((item, i) => {
      const carouselItem = getAllByTestId(`carousel-item-${i}`);
      expect(carouselItem.length).toBeGreaterThanOrEqual(1);

      // TODO: Test for chord diagrams
    });
  });
});
