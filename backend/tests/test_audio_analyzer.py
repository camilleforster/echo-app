import os
import pytest
import numpy as np

from audio_processing import AudioAnalyzer


@pytest.fixture
def sample_audio_analyzer():
    return AudioAnalyzer()


def test_audio_chunk_to_frequency(sample_audio_analyzer):
    # Test for detecting the frequency with the highest magnitude in the audio chunk
    chunk_data = np.sin(2 * np.pi * 440 * np.arange(44100) / 44100)  # Generate a sine wave with frequency 440 Hz
    sampling_rate = 44100
    frequency = sample_audio_analyzer.audio_chunk_to_frequency(chunk_data, sampling_rate)
    assert frequency == pytest.approx(440.0, abs=1e-2)  # Approximate due to floating-point precision



@pytest.mark.parametrize(('frequency', 'note_name'), [
    (440.0, "A4"),
    (392.0, "G4"),
    (49.0, "G1"),
    (32.70, "C1"), # note C octve 1
    (65.41, "C2"), # note C octve 2
    (130.81, "C3"), # note C octve 3
    (261.63, "C4"), # note C octve 4
    (523.25, "C5"), # note C octve 5
    (1046.50, "C6"), # note C octve 6
    (2093.00, "C7"), # note C octve 7
    (4186.01, "C8"), # note C octve 8
    ])
def test_frequency_to_note_name(sample_audio_analyzer, frequency, note_name):
    # Test for converting the detected frequency to a standard note name
    assert sample_audio_analyzer.frequency_to_note_name(frequency)  == note_name 