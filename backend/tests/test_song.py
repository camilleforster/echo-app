# import os
# import pytest


# from audio_analyzer_interface import Song


# """
# fixture for the path of the audio file. 
# currently returns the first file in the test_data directory
# can be changed to return other test audio files
# """
# @pytest.fixture
# def file_path():
#     file_path = "tests/test_data/"
#     file = file_path + os.listdir(file_path)[0]
#     return file


# @pytest.fixture
# def song(file_path):
#     return Song(file_path)


# """
# A test for the Song constructor
# Tkes as input the audio file path and the created song
# """
# def test_init(song, file_path):
#     assert isinstance(song, Song)
#     assert song.file_path == file_path
#     assert song.frequency_queue is None


# def test_audio_to_frequency(song):
#     pass

