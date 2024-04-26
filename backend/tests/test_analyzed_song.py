import os
import pytest
from pathlib import Path

from audio_processing import AnalysisPoint, AnalyzedSong

@pytest.fixture
def sample_analyzed_song():
    song = AnalyzedSong()
    song.add_point(time_stamp=0.0, frequency=440.0, note_name="A4", duration=1.0)
    song.add_point(time_stamp=1.0, frequency=392.0, note_name="G4", duration=0.5)
    return song

def test_init():
    song = AnalyzedSong()
    assert isinstance(song, AnalyzedSong)
    assert len(song.data) == 0

def test_add_point(sample_analyzed_song):
    assert len(sample_analyzed_song.data) == 2
    assert sample_analyzed_song.data[0].note_name == "A4"
    assert sample_analyzed_song.data[1].note_name == "G4"

def test_get_analysis(sample_analyzed_song):
    analysis = sample_analyzed_song.get_analysis()
    assert len(analysis) == 2
    assert analysis[0].note_name == "A4"
    assert analysis[1].note_name == "G4"

def test_combine_notes(sample_analyzed_song):
    # Test combining consecutive identical notes
    sample_analyzed_song._combine_notes(chunk_duration=0.5)
    assert len(sample_analyzed_song.data) == 2
    assert sample_analyzed_song.data[0].duration == 0.5
    sample_analyzed_song._combine_notes(chunk_duration=1.0)
    assert len(sample_analyzed_song.data) == 2
    assert sample_analyzed_song.data[0].duration == 1.0

def test_repr(sample_analyzed_song):
    assert repr(sample_analyzed_song) == "A41.0,G40.5"


def test_notes_to_lilypond(sample_analyzed_song):
    lilypond_notation = sample_analyzed_song.notes_to_lilypond(chunk_duration=0.5)
    assert lilypond_notation == "\\relative c' {\n    \\key c \\major\n    \\time 4/4\na'2 g'2 \n}"

def test_save_to_file(tmp_path):
    # Test saving analysis results to a file
    file_path = "tests/test_data/"
    filename =  file_path + "test_song.txt"
    song = AnalyzedSong()
    song.add_point(time_stamp=0.0, frequency=440.0, note_name="A4", duration=1.0)
    song.save_to_file(filename)
    assert Path(filename).is_file()

def test_save_to_MIDI(tmp_path):
    # Test saving audio analysis results to a MIDI file
    file_path = "tests/test_data/"
    filename =  file_path + "test_song"
    song = AnalyzedSong()
    song.add_point(time_stamp=0.0, frequency=440.0, note_name="A4", duration=1.0)
    song.save_to_MIDI(filename)
    assert Path(filename+ ".mid").is_file()
