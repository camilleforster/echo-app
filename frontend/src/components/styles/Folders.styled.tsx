import { TouchableOpacity, Text, ScrollView, View} from "react-native";
import { Button } from "react-native-ui-lib";
import styled from "styled-components/native";

export const ContentContainer = styled(View)`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
`;

export const TextContent = styled(Text)`
    align-items: left;
`;

export const FolderBanner = styled(TouchableOpacity)`
    borderRadius: 5px;
`;

export const AddFolderBanner = styled(TouchableOpacity)`
    marginTop: 15px;
`;

export const AddFolderButton = styled(Text)`
    color: blue;
    letterSpacing: 1px;
    fontWeight: bold;
    fontSize: 14px;
    padding: 3px;
`;

export const AudioCount = styled(Text)`
    marginTop: 5px;
    opacity: 0.5;
    fontSize: 14;
`;