import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles/FolderItem.styled";
// import { RadioButton, RadioGroup } from "react-native-ui-lib";
import { RadioButton, Checkbox } from 'react-native-paper';

interface FolderItemProps {
    item: {
        title: string;
        item_number: string;
        key: string;
    };
    isEditMode: boolean;
    isSelected: boolean;
    deleteItems: Array<{}>,
    setDeleteItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const FolderItem: React.FC<FolderItemProps> = ({ item, isEditMode, isSelected, deleteItems, setDeleteItems }) => {
    const [checked, setChecked] = useState(false);
    
    return (
        <View style={styles.roundedfullEditingno}>
            <TouchableOpacity>
                <View style={[styles.content, styles.textFlexBox]}>
                    <View style={[styles.right, styles.textFlexBox]}>
                    {isEditMode ? (
                            <View style={{ transform: [{scale: 0.80}], }}>
                                <Checkbox
                                    status={checked ? 'checked':'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                        setDeleteItems([...deleteItems, item.key])
                                      }}
                                />
                                {/* <RadioButton
                                    value={false}
                                /> */}
                            </View>
                        ) : (
                        <Image style={styles.icon} resizeMode="cover" source={require('../assets/folderIcon.png')} />
                        )}
                        
                        <Text style={[styles.text, styles.textFlexBox]}>{item.title}</Text>

                        <View style={[styles.itemNumber, styles.textFlexBox]}>
                            <Text style={styles.text1}>{item.item_number}</Text>
                            <Image style={styles.icons} resizeMode="cover" source={require('../assets/arrowIcon.png')} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default FolderItem;
