import styled from 'styled-components/native';
import { Dimensions, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

const { width } = Dimensions.get('window');

export const ModalBackground = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled(View)`
  width: ${width - 100}px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const InputContainer = styled(View)`
  width: 100%;
  align-items: center;
  border: 1px solid #DDD;
  border-radius: 5px; 
  padding: 10px;
  margin-bottom: 20px;
`;

export const TitleText = styled(Text)`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
`;

export const FolderNameInput = styled(TextInput)`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: gray;
  font-size: 16px;
  padding-vertical: 10px;
  margin-bottom: 20px;
`;

export const SubmitIcon = styled(TouchableOpacity)`
  padding: 10px;
  background-color: blue;
  border-radius: 50px;
`;

export const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

export const ActionButton = styled(Pressable)`
  padding: 10px;
  margin: 5px;
  background-color: #e0e0e0;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  flex: 1
`;