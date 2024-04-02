import React from "react";
import RecordingFooter from "../components/RecordingFooter";
import { Container } from "./styles/LibraryPage.styled";

/**
 * Contains the content accessible within the "My Library" folder
 **/
const LibraryPage = () => {
  return (
    <Container>
      <RecordingFooter />
    </Container>
  );
};
export default LibraryPage;
