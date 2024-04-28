import styled from "styled-components/native";
import { Text, View } from "react-native";
import { LabelType, LabelSize } from "../../types/LabelTypes";

interface LabelStyleProps {
  type: LabelType;
  size: LabelSize;
}

export const StyledText = styled(Text)<LabelStyleProps>`
  font-size: 12px;
  line-height: 12px;
  font-family: "WorkSans_600SemiBold";
  text-align: center;
  color: ${({ type, theme }) =>
    type === LabelType.Solid ? "white" : theme.textDarkBlue};
  width: 100%;
`;

export const StyledLabel = styled(View)<LabelStyleProps>`
  width: ${({ size }) => (size === LabelSize.Regular ? "45px" : "22px")};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 6px;
  background-color: ${({ type, theme }) =>
    type === LabelType.Solid ? `${theme.textDarkBlue}` : "transparent"};
  border: ${({ type, theme }) =>
    type === LabelType.Solid
      ? "1px solid transparent"
      : `1px solid ${theme.textDarkBlue}`};
  padding: 5px 0;
`;
