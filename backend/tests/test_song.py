import os
import pytest


from audio_processing import Song


"""
fixture for the path of the audio file. 
currently returns the first file in the test_data directory
can be changed to return other test audio files
"""
@pytest.fixture
def file_path():
    file_path = "tests/test_data/"
    file = file_path + os.listdir(file_path)[0]
    return file

@pytest.fixture
def duration():
    return 0.25

@pytest.fixture
def song(file_path, duration):
    return Song(file_path, duration)


"""
A test for the Song constructor
Tkes as input the audio file path and the created song
"""
def test_init(song, file_path, duration):
    assert isinstance(song, Song)
    assert song.file_path == file_path
    assert song.chunk_duration == duration


def test_audio_to_notes(song):
    pass
