import React from 'react';
import { View, StyleSheet } from 'react-native';
import RecordingFooter from '../components/RecordingFooter';

// TODO: Write comments
const LibraryPage = () => {
  return (
    <View style={styles.container}>
      <RecordingFooter recordingCount={32} />
    </View>
  );
};
export default LibraryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});