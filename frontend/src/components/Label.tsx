import * as React from "react";
import { StyledText, StyledLabel } from "./styles/Label.styled";
import { LabelType, LabelSize } from "../types/LabelType";

export interface LabelProps {
  type: LabelType;
  size: LabelSize;
  children: string;
}
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
