import os
import pytest
from pathlib import Path


from audio_processing import Song, convert_mp3_to_wav



@pytest.fixture
def sample_song_path():
    # Create a sample audio file for testing
    sample_data = bytearray([0] * 44100 * 2)  # 1 second of silence at 44100 Hz, 16-bit
    file_path = "tests/test_data/"
    sample_path = Path(file_path + "sample.wav")
    with open(sample_path, "wb") as f:
        f.write(b'RIFF' + (len(sample_data) + 36).to_bytes(4, 'little') + b'WAVE' + b'fmt ' + (16).to_bytes(4, 'little') + (1).to_bytes(2, 'little') + (1).to_bytes(2, 'little') + (44100).to_bytes(4, 'little') + (44100 * 2).to_bytes(4, 'little') + (2).to_bytes(2, 'little') + (16).to_bytes(2, 'little') + b'data' + (len(sample_data)).to_bytes(4, 'little') + sample_data)
    return str(sample_path)

@pytest.fixture
def better_day():
    # Create a sample audio file for testing
    file_path = "tests/test_data/"
    sample_path = file_path + "better_day.mp3"
    sample_path = convert_mp3_to_wav(sample_path)
    return sample_path


def test_init(sample_song_path, better_day):
    # Test initialization of the Song class
    song = Song(file_path=sample_song_path)
    assert song.file_path == sample_song_path
    assert song.chunk_duration == 0.25
    song = Song(file_path=better_day)
    assert song.file_path == better_day
    assert song.chunk_duration == 0.25


def test_audio_to_notes(sample_song_path, better_day):
    # Test conversion of audio file to AnalyzedSong object
    song = Song(file_path=sample_song_path)
    analyzed_song = song.audio_to_notes()
    assert len(analyzed_song.data) > 0
    assert len(analyzed_song.data) == 4
    assert analyzed_song.data[0].time_stamp == 0.0
    assert analyzed_song.data[0].frequency == 20
    assert analyzed_song.data[0].note_name == "D#0"
    assert analyzed_song.data[0].duration == 0.25

    song = Song(file_path=better_day)
    analyzed_song = song.audio_to_notes()
    assert len(analyzed_song.data) > 0
    assert len(analyzed_song.data) == 362
    assert analyzed_song.data[0].time_stamp == 0.0
    assert analyzed_song.data[0].frequency == 68.0
    assert analyzed_song.data[0].note_name == "C#2"
    assert analyzed_song.data[0].duration == 0.25