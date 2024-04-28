import * as React from "react";
import { StyledText, StyledLabel } from "./styles/Label.styled";
import { LabelType, LabelSize } from "../types/LabelTypes";

export interface LabelProps {
  type: LabelType;
  size: LabelSize;
  children: string;
}

/**
 * A label component that contains different sizes and styles.
 *
 * @param type - the type of label of type {@link LabelSize}
 * @param size - the size of the label of type {@link LabelType}
 * @param children - the text of the label
 */
const Label: React.FC<LabelProps> = ({ type, size, children }) => {
  return (
    <StyledLabel testID="label" type={type} size={size}>
      <StyledText type={type} size={size}>
        {children}
      </StyledText>
    </StyledLabel>
  );
};
export default Label;
