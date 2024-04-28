import * as React from "react";
import {
  Container,
  LeftIcon,
  RightIcon,
  Title,
} from "./styles/PageHeader.styled";
import { BackIcon, UploadIcon } from "../assets/icons/icons";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";
import { useNavigation } from "@react-navigation/native";

export interface PageHeaderProps {
  headerTitle: string;
}

/**
 * Header that displays the title of the page and any button the page might contain
 *
 * @param headerTitle - the title of the page
 */
const PageHeader: React.FC<PageHeaderProps> = ({ headerTitle }) => {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <Container>
      <TouchableOpacity onPress={goBack}>
        <LeftIcon>
          <BackIcon />
        </LeftIcon>
      </TouchableOpacity>
      <Title numberOfLines={1}>{headerTitle}</Title>
      <RightIcon>
        <UploadIcon />
      </RightIcon>
    </Container>
  );
};

export default PageHeader;
