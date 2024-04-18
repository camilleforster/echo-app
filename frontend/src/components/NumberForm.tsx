import * as React from "react";
import { Container, Content, StyledText } from "./styles/NumberForm.styled";
import { TouchableOpacity } from "react-native";

export interface NumberFormProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  testID?: string;
}

/**
 * A number form that allows you to increase or decrease a count
 *
 * @param value - the current count
 * @param onIncrease - function to call on increase count
 * @param onDecrease - function to call on decrease count
 * @param testID - testing id for the form
 */
const NumberForm: React.FC<NumberFormProps> = ({
  value,
  onIncrease,
  onDecrease,
  testID,
}) => {
  const disabledMin = value <= 0;
  const disabledMax = value >= 10;

  return (
    <Container testID={testID}>
      <Content>
        <TouchableOpacity
          testID="minus-button"
          onPress={onDecrease}
          disabled={disabledMin}
        >
          <StyledText disabled={disabledMin}>-</StyledText>
        </TouchableOpacity>
        <StyledText>{value}</StyledText>
        <TouchableOpacity
          testID="plus-button"
          onPress={onIncrease}
          disabled={disabledMax}
        >
          <StyledText disabled={disabledMax}>+</StyledText>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};
export default NumberForm;
