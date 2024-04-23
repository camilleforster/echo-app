import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  LibraryPage: undefined;
  AudioTranscriptionPage: { uri: string };
};

export type LibraryPageProps = NativeStackScreenProps<RootStackParamList, 'LibraryPage'>;
export type AudioTranscriptionPageProps = NativeStackScreenProps<RootStackParamList, 'AudioTranscriptionPage'>;


