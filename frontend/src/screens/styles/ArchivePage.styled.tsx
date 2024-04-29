import { View, Button, Image } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
    top: 30px;
`;

export const AddFolderIcon = styled(Image)`
    position: absolute;
    top: 150px;
    left: 300px;
    object-fit: contain; 
    width: 60px;
`;

export const DeleteIconRed = styled(Image)`
    position: absolute;
    object-fit: contain;
    top: 360px;
    width: 100%;
`;