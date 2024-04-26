import pytest
from audio_processing import AnalysisPoint



@pytest.fixture
def sample_analysis_point(time_stamp=0.0, frequency=440.0, note_name="A4", duration=0.25):
    return AnalysisPoint(time_stamp=time_stamp, frequency=frequency, note_name=note_name, duration=duration)

def test_init():
    analysis_point = AnalysisPoint(time_stamp=0.0, frequency=440.0, note_name="A4", duration=0.25)
    assert analysis_point.time_stamp == 0.0
    assert analysis_point.frequency == 440.0
    assert analysis_point.note_name == "A4"
    assert analysis_point.duration == 0.25

@pytest.mark.parametrize(('time_stamp', 'frequency', 'note_name', 'duration'), [
    (0.0, 440.0, "A4", 0.25),  # A4, quarter note
    (0.0, 440.0, "A4", 0.5),  # A4, half note
    (0.0, 440.0, "A4", 1.0),  # A4, 1 note
    (0.0, 440.0, "A4", 2.0),  # A4, 2 note2
    (0.0, 440.0, "A4", 4.0),  # A4, 4 notes
    (0.5, 440.0, "A4", 0.25),  # A4, quarter note, diff time_stamp => same repr
    (0.0, 392.0, "G4", 0.25),  # G4, quarter note
    (0.0, 49.0, "G1", 0.25),  # G4, quarter note
    ])
def test_repr(sample_analysis_point,  time_stamp, frequency, note_name, duration):
    assert repr(AnalysisPoint(time_stamp, frequency, note_name, duration)) == note_name+str(duration)


@pytest.mark.parametrize(('chunk_duration', 'lilypond_str'), [
    (0.25, "a'4 "),  # A4,
    ])
def test_note_to_lilypond(sample_analysis_point, chunk_duration, lilypond_str):
    # Assuming chunk durastion is 0.25 seconds (for testing purposes)
    assert sample_analysis_point.note_to_lilypond(chunk_duration) == lilypond_str


