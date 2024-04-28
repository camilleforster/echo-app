import React from 'react';
import { Modal, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import {
  ModalBackground,
  ModalContainer,
  InputContainer,
  TitleText,
  ButtonContainer,
  ActionButton,
} from './styles/AddFolderModal.styled';

interface AddFolderModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (folderName: string) => void;
}

const AddFolderModal: React.FC<AddFolderModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [folderName, setFolderName] = React.useState('');
  const handleCancel = () => {
    setFolderName('');
    onClose();
  };

  const handleCreate = () => {
    onSubmit(folderName);
    setFolderName('');
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={handleCancel}>
        <ModalBackground>
          <TouchableWithoutFeedback>
            <ModalContainer>
              <TitleText>New Folder</TitleText>
              <InputContainer>
                <TextInput
                  placeholder="Enter folder name"
                  value={folderName}
                  onChangeText={setFolderName}
                />
              </InputContainer>
              <ButtonContainer>
                <ActionButton onPress={handleCancel}>
                  <Text>Cancel</Text>
                </ActionButton>
                <ActionButton onPress={handleCreate}>
                  <Text>Create</Text>
                </ActionButton>
              </ButtonContainer>
            </ModalContainer>
          </TouchableWithoutFeedback>
        </ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddFolderModal;