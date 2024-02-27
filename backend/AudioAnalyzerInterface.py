from typing import Iterator, List
import numpy as np
import pyaudio
from scipy.fft import rfft, rfftfreq
class Song:
    def __init__(self, analyzer, file_path: str):
        self.frequency_queue = None
        self.analyzer = analyzer
        self.file_path = file_path

    def audio_to_frequency(self, filter_noise=True) -> Iterator[float]:
        # If the frequency iterator hasn’t been created yet, upload the audio file
        # and create the frequency iterator that outputs a chunk of the audio every time next is called.
        # Placeholder for actual implementation
        pass

class AudioAnalyzer:
    def __init__(self, sampling_rate: int, chunk_size: int, channels: int):
        self.sampling_rate = sampling_rate
        self.chunk_size = chunk_size
        self.channels = channels

    def _frequency_to_note_name(self, frequency: float):
        # Converts a single frequency to a note name
        # Placeholder for actual implementation
        pass

    def frequency_to_note_name(self, frequencies: Iterator[float]):
        # Converts frequencies to note names
        # Placeholder for actual implementation
        return AnalyzedSong()

class AnalysisPoint:
    def __init__(self, time_stamp: float, frequency: float, note_name: str):
        self.time_stamp = time_stamp
        self.frequency = frequency
        self.note_name = note_name

class AnalyzedSong:
    def __init__(self):
        self.data = []

    def add_point(self, time_stamp: float, frequency: float, note_name: str):
        self.data.append(AnalysisPoint(time_stamp, frequency, note_name))

    def get_analysis(self) -> List[AnalysisPoint]:
        return self.data

    def save_to_file(self, filename: str):
        # Saves the analysis results to a file
        # Placeholder for actual implementation
        pass
