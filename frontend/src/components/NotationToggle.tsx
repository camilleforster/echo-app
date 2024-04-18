import * as React from "react";
import { LabelType, LabelSize } from "../types/LabelType";
import Label from "./Label";
import { TouchableOpacity } from "react-native";
import { LabelContainer } from "./styles/NotationToggle.styled";
import { NotationType } from "../types/NotationType";

export interface NotationToggleProps {
    selectedValue: NotationType;
    onClick: (notation: NotationType) => void;
    testID?: string;
}
const NotationToggle: React.FC<NotationToggleProps> = ({ selectedValue, onClick, testID }) => {
    return (
        <LabelContainer testID={testID}>
            <TouchableOpacity testID="sharp-button" onPress={() => onClick(NotationType.Sharp)}>
                <Label
                    type={selectedValue === NotationType.Sharp ? LabelType.Solid : LabelType.Outlined}
                    size={LabelSize.Small}
                >
                    #
                </Label>
            </TouchableOpacity>
            <TouchableOpacity testID="flat-button" onPress={() => onClick(NotationType.Flat)}>
                <Label
                    type={selectedValue === NotationType.Flat ? LabelType.Solid : LabelType.Outlined}
                    size={LabelSize.Small}
                >
                    b
                </Label>
            </TouchableOpacity>
        </LabelContainer>
    );
};
export default NotationToggle;