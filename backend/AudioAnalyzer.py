from typing import Iterator, List
import numpy as np
import pyaudio
from scipy.fft import rfft, rfftfreq
from typing import List
import numpy as np
from scipy.io import wavfile
from scipy.fft import rfft, rfftfreq

class AudioAnalyzer:
    A4_freq= 440.0
    Note_Names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    def __init__(self, sampling_rate: int):
        self.sampling_rate = sampling_rate

    def _frequency_to_note_name(self, frequency: float) -> str:
        if frequency < 20:  # Below human hearing range
            return "None"
        h = round(12 * np.log2(frequency / AudioAnalyzer.A4_freq) + 69)
        octave = h // 12 - 1
        n = h % 12
        return f"{AudioAnalyzer.Note_Names[n]}{octave}"

    def frequency_to_note_name(self, frequencies: List[float]) -> List[str]:
        return [self._frequency_to_note_name(f) for f in frequencies]

class AnalysisPoint:
    def __init__(self, time_stamp: float, frequency: float, note_name: str):
        self.time_stamp = time_stamp
        self.frequency = frequency
        self.note_name = note_name

    def __repr__(self):
        return f"Time: {self.time_stamp}s, Frequency: {self.frequency}Hz, Note: {self.note_name}"

class AnalyzedSong:
    def __init__(self):
        self.data = []

    def add_point(self, time_stamp: float, frequency: float, note_name: str):
        self.data.append(AnalysisPoint(time_stamp, frequency, note_name))

    def get_analysis(self) -> List[AnalysisPoint]:
        return self.data

    def save_to_file(self, filename: str):
        with open(filename, 'w') as file:
            for point in self.data:
                file.write(f"{point}\n")

# The Song class receives a raw audio file and readies it for processing
class Song:
    def __init__(self, analyzer: AudioAnalyzer, file_path: str):
        self.analyzer = analyzer
        self.file_path = file_path

    def audio_to_frequency(self) -> AnalyzedSong:
        # Read the audio file
        sampling_rate, data = wavfile.read(self.file_path)
        # Assuming the audio is mono for simplicity
        if data.ndim > 1:
            data = data[:, 0]

        analyzed_song = AnalyzedSong()

        # Define constants
        chunk_size = int(0.25 * sampling_rate)  # Number of samples in each 0.25 second chunk
        num_chunks = len(data) // chunk_size

        # Process each chunk
        for chunk_idx in range(num_chunks):
            start_sample = chunk_idx * chunk_size
            end_sample = start_sample + chunk_size
            chunk_data = data[start_sample:end_sample]

            # Calculate FFT for the chunk
            fft_result = rfft(chunk_data)
            freqs = rfftfreq(len(chunk_data), 1 / sampling_rate)
            magnitudes = np.abs(fft_result)

            # Filter frequencies outside the human hearing range and with low magnitude
            valid_freqs = freqs[(freqs >= 20) & (freqs <= 20000)]
            valid_magnitudes = magnitudes[(freqs >= 20) & (freqs <= 20000)]

            if len(valid_freqs) == 0:  # Skip if no valid frequencies
                continue

            # Find the frequency with the highest magnitude
            max_magnitude_idx = np.argmax(valid_magnitudes)
            max_freq = valid_freqs[max_magnitude_idx]
            max_magnitude = valid_magnitudes[max_magnitude_idx]

            # Convert frequency to note name
            note_name = self.analyzer._frequency_to_note_name(max_freq)
            time_stamp = chunk_idx * 0.25  # Time stamp for the current chunk

            # Add point to analyzed song
            analyzed_song.add_point(time_stamp, max_freq, note_name)

        return analyzed_song




# Example usage
file_path = 'sample2.wav'  # Update this path to your audio file
sampling_rate = 44100  # This should match the sampling rate of your audio file
analyzer = AudioAnalyzer(sampling_rate)
song = Song(analyzer, file_path)

analyzed_song = song.audio_to_frequency()
for analysis_point in analyzed_song.get_analysis():
    print(analysis_point)

# Optionally save the analysis to a file
analyzed_song.save_to_file("analysis_result.txt")
