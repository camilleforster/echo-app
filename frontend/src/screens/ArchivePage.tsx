import React, { useState } from "react";
import ArchiveHeading from "../components/ArchiveHeader";
import Folders from "../components/Folders";
import { Container } from "./styles/ArchivePage.styled";
import { AddFolderIcon } from "./styles/ArchivePage.styled";
import { TouchableOpacity, View, Text } from "react-native";
import { DeleteIconRed } from "./styles/ArchivePage.styled";
import AddFolderModal from "../components/AddFolderModal";

/**
 * Contains the content accessible within the Archive Page
 **/
const ArchivePage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);  // State to track whether it's in edit mode

    const [deleteItems, setDeleteItems] = useState(['2', '3']);

    const [recordings, setRecordings] = useState([
        { title: 'My Favorite songs', item_number: '10', key: '1'},
        { title: "Guitar melodies", item_number: '10', key: '2' },
        { title: "Base lines", item_number: '7', key: '3' },
    ]);
    
    const pressHandler = (key: string) => {
        setRecordings((prevRecordings) => {
            for (const keyToDelete of deleteItems){
                prevRecordings = prevRecordings.filter(recording => recording.key != keyToDelete);
            }
            return prevRecordings
        });
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);  // Function to toggle edit mode
    };

    const submitHandler = (text: string) => {
        setModalVisible(false)
        setRecordings((prevRecordings) => {
            return [
                ...prevRecordings,
                { title: text, key: Math.random().toString(), item_number: "0" },
            ]
        });
    }

    return (
        <Container>
            <ArchiveHeading isEditMode={isEditMode} onEditPress={toggleEditMode}/>
            <Folders isEditMode={isEditMode} recordings={recordings} deleteItems={deleteItems} setDeleteItems={setDeleteItems}/>
                {isEditMode ? 
                <View style={{position: "relative", top: -90, left: 0}}>
                    <TouchableOpacity onPress={() => pressHandler('2')}>
                        <DeleteIconRed source={require('../assets/deleteIconRed.png')}/>
                    </TouchableOpacity>
                </View> : 
                <View style={{position: "absolute", top: 550, left: 10}}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <AddFolderIcon source={require('../assets/AddFolderIcon.png')}/>
                    </TouchableOpacity>
                </View>}

                <AddFolderModal 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={submitHandler}
                />
        </Container>
    );
};

export default ArchivePage;
