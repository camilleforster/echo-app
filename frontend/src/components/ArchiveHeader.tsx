import React from "react";
import { Icons, Edit, EditButton, Top1, Title, Icons1, Search, Content, SearchBar, Content1, ArchiveHeadingRoot, Top } from "./styles/ArchiveHeader.styled" 
import { Text, View } from "react-native-ui-lib";

interface ArchiveHeadingProps {
  isEditMode: boolean;
  onEditPress: () => void;
}

const ArchiveHeading: React.FC<ArchiveHeadingProps> = ({ isEditMode, onEditPress }) => {
  return (
    <ArchiveHeadingRoot>
      <Content1>
        <Top1>
          <EditButton onPress={onEditPress}>
            <Edit>{isEditMode ? 'Cancel' : 'Edit'}</Edit>
          </EditButton>
        </Top1>
        <Title>Archive</Title>
      </Content1>
    </ArchiveHeadingRoot>
  );
};
export default ArchiveHeading;
