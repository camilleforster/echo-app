import { FolderDataType } from "./FolderDataType";
import { SequenceDataType } from "./SequenceDataType";

export interface UserDataType {
    username: string;
    folders: FolderDataType[];
    sequences: SequenceDataType[];
    error?: string;
}