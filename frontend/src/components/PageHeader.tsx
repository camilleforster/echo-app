import * as React from "react";
import {
  Container,
  LeftIcon,
  RightIcon,
  Title,
} from "./styles/PageHeader.styled";
import { BackIcon, UploadIcon } from "../assets/icons/icons";

export interface PageHeaderProps {
  headerTitle: string;
}

/**
 * Header that displays the title of the page and any button the page might contain
 *
 * @param headerTitle - the title of the page
 */
const PageHeader: React.FC<PageHeaderProps> = ({ headerTitle }) => {
  return (
    <Container>
      <LeftIcon>
        {/* TODO: Make button functional */}
        <BackIcon />
      </LeftIcon>
      <Title numberOfLines={1}>{headerTitle}</Title>
      <RightIcon>
        {/* TODO: Make button functional */}
        <UploadIcon />
      </RightIcon>
    </Container>
  );
};

export default PageHeader;
