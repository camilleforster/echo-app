import React from "react";
import { Edit, EditButton, Top1, Title, Content1, ArchiveHeadingRoot, Top } from "./styles/ArchiveHeader.styled" 

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
