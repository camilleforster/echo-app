import * as React from "react";
import { Container, Content, StyledText } from "./styles/NumberForm.styled";
import { TouchableOpacity } from "react-native";

interface NumberFormProps {
    value: number;
    onIncrease: () => void;
    onDecrease: () => void;
}
const NumberForm: React.FC<NumberFormProps> = ({ value, onIncrease, onDecrease }) => {
    const disabledMin = value <= 0;
    const disabledMax = value >= 10;

    return (
        <Container>
            <Content>
                <TouchableOpacity onPress={onDecrease} disabled={disabledMin}>
                    <StyledText disabled={disabledMin}>-</StyledText>
                </TouchableOpacity>
                <StyledText>{value}</StyledText>
                <TouchableOpacity onPress={onIncrease} disabled={disabledMax}>
                    <StyledText disabled={disabledMax}>+</StyledText>
                </TouchableOpacity>
            </Content>
        </Container>);
};
export default NumberForm;