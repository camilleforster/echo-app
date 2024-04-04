import React from 'react';
import { render } from '@testing-library/react-native';
import { BackIcon, StopRecordingIcon, RecordIcon, ExitIcon, CheckmarkIcon, UploadIcon, EditIcon, TrashIcon, MenuIcon, FolderIcon, OptionIcon, AddFolderIcon, MoveFolderIcon, SearchIcon } from '../assets/icons';
import Theme from '../Theme';

describe('Icon Components', () => {
  it('should render BackIcon correctly', () => {
    const { getByLabelText } = render(<Theme><BackIcon /></Theme>);
    expect(getByLabelText('Back')).toBeTruthy();
  });

  it('should render StopRecordingIcon correctly', () => {
    const { getByLabelText } = render(<Theme><StopRecordingIcon /></Theme>);
    expect(getByLabelText('Stop Recording')).toBeTruthy();
  });

  it('should render RecordIcon correctly', () => {
    const { getByLabelText } = render(<Theme><RecordIcon /></Theme>);
    expect(getByLabelText('Record')).toBeTruthy();
  });

  it('should render ExitIcon correctly', () => {
    const { getByLabelText } = render(<Theme><ExitIcon /></Theme>);
    expect(getByLabelText('Exit')).toBeTruthy();
  });

  it('should render CheckmarkIcon correctly', () => {
    const { getByLabelText } = render(<Theme><CheckmarkIcon /></Theme>);
    expect(getByLabelText('Checkmark')).toBeTruthy();
  });

  it('should render UploadIcon correctly', () => {
    const { getByLabelText } = render(<Theme><UploadIcon /></Theme>);
    expect(getByLabelText('Upload')).toBeTruthy();
  });

  it('should render EditIcon correctly', () => {
    const { getByLabelText } = render(<Theme><EditIcon /></Theme>);
    expect(getByLabelText('Edit')).toBeTruthy();
  });

  it('should render TrashIcon correctly', () => {
    const { getByLabelText } = render(<Theme><TrashIcon /></Theme>);
    expect(getByLabelText('Trash')).toBeTruthy();
  });

  it('should render MenuIcon correctly', () => {
    const { getByLabelText } = render(<Theme><MenuIcon /></Theme>);
    expect(getByLabelText('Menu')).toBeTruthy();
  });

  it('should render FolderIcon correctly', () => {
    const { getByLabelText } = render(<Theme><FolderIcon /></Theme>);
    expect(getByLabelText('Folder')).toBeTruthy();
  });

  it('should render OptionIcon correctly', () => {
    const { getByLabelText } = render(<Theme><OptionIcon /></Theme>);
    expect(getByLabelText('Option')).toBeTruthy();
  });

  it('should render AddFolderIcon correctly', () => {
    const { getByLabelText } = render(<Theme><AddFolderIcon /></Theme>);
    expect(getByLabelText('Add Folder')).toBeTruthy();
  });

  it('should render MoveFolderIcon correctly', () => {
    const { getByLabelText } = render(<Theme><MoveFolderIcon /></Theme>);
    expect(getByLabelText('Move Folder')).toBeTruthy();
  });

  it('should render SearchIcon correctly', () => {
    const { getByLabelText } = render(<Theme><SearchIcon /></Theme>);
    expect(getByLabelText('Search')).toBeTruthy();
  });
});
