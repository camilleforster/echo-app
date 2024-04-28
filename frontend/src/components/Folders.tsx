import React, { useState } from "react";
import { AddFolderButton, AddFolderBanner, TextContent, ContentContainer, FolderBanner, AudioCount } from "./styles/Folders.styled";
import FolderItem from "./FolderItem";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { RadioGroup } from 'react-native-ui-lib';
import { AddFolderIcon } from "../assets/icons";


interface FolderProps {
    isEditMode: boolean; // This prop is passed from the parent component
    recordings: Array<{ title: string; item_number: string; key: string; }>,
    deleteItems: Array<{}>,
    setDeleteItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const Folders: React.FC<FolderProps> = ({ isEditMode, recordings,  deleteItems, setDeleteItems}) => {
    
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const handleSelectFolder = (key: string) => {
        setSelectedKey(key);
    };



    const defaultItem = { title: "My Library", item_number: '0', key: '0' };

    return (
        <ContentContainer>
            <FlatList
                data={[defaultItem]}
                renderItem={({ item }) => (
                    <FolderItem 
                        item={item}
                        isEditMode={false}  // Always non-editable
                        isSelected={false}
                        deleteItems={[]}
                        setDeleteItems={() => {}}
                    />
                )}
                scrollEnabled={false}
            />
            <Text style={{
                marginTop: 20,
                marginBottom: 5, 
                fontSize: 13,
                letterSpacing: -0.3,
                fontFamily: 'WorkSans_500Medium',
                color: "#848999"
            }}>
            MY FOLDERS
            </Text>
            <FolderBanner>
                <FlatList 
                    data={recordings}
                    renderItem={({ item }) => (
                        <FolderItem 
                            item={item}
                            isEditMode={isEditMode}  // Editable based on parent's state
                            isSelected={selectedKey === item.key}
                            deleteItems={deleteItems}
                            setDeleteItems={setDeleteItems}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
                    scrollEnabled={false}
                />
            </FolderBanner>
        </ContentContainer>
    );
};



export default Folders;
