import {Text, View, TouchableOpacity} from "react-native";
import styled from "styled-components";

export const Icons = styled(View)`
  align-self: stretch;
  width: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Edit = styled(Text)`
  position: relative;
  font-weight: 500;
`;

export const EditButton = styled(TouchableOpacity)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const Top1 = styled(View)`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 276px;
  text-align: right;
`;

export const Title = styled(Text)`
  align-self: stretch;
  position: relative;
  font-size: 30px;
  display: flex;
  overflow: hidden;
  font-size: 30px;
  font-weight: 700;
  font-family: "WorkSans_700Bold";
`;

// const Icon1 = styled.img`
//   width: 13px;
//   position: relative;
//   height: 13px;
// `;

export const Icons1 = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 2px;
`;

export const Search = styled(Text)`
  position: relative;
`;

export const Content = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
`;

export const SearchBar = styled(View)`
  align-self: stretch;
  border-radius: 7px;
  background-color: #f0f5f9;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 5px 8px;
  color: #848999;
`;

export const Content1 = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 17px;
`;

export const ArchiveHeadingRoot = styled(View)`
  marginTop: 0px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  color: #2d2f34;
`;

export const Top = styled(View)`
  top: 50px;
`;

export const FolderContent = styled(View)`

`

