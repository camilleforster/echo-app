from typing import Iterator, List
import numpy as np
import pyaudio
from scipy.fft import rfft, rfftfreq

class AudioAnalyzer:
    """A class representing the audio file analyzer.

    It offers methods for detecting the dominant frequency in an audio sample
    and other methods for converting that frequency to a note.

    Attributes
    ----------
    A4_freq : int
        the frequency of a standard A4 note.
    Note_Names : list of str
        a list of all standard note names.

    Methods
    -------
    audio_chunk_to_frequency(self, chunk_data, sampling_rate)
        Detects the frequency with the highest magnitude in the audio chunk.
    frequency_to_note_name(self, frequency)
        Converts the detected frequncy to a standard note name
    """

    A4_freq= 440.0
    Note_Names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    def __init__(self):
        """
        """
        pass

    def audio_chunk_to_frequency(self, chunk_data, sampling_rate):
        """Detects the frequency with the highest magnitude in the audio chunk.


        
        Parameters
        ----------
        chunk_data : 
        sampling_rate : int
            Its initialized by the sampling rate of the audio chunk in (samples/sec).

        """
        # Calculate FFT for the chunk
        fft_result = rfft(chunk_data)
        freqs = rfftfreq(len(chunk_data), 1 / sampling_rate)
        magnitudes = np.abs(fft_result)

        # Filter out frequencies outside the human hearing range
        # and frequencies with low magnitude
        valid_freqs = freqs[(freqs >= 20) & (freqs <= 20000)]
        valid_magnitudes = magnitudes[(freqs >= 20) & (freqs <= 20000)]

        if len(valid_freqs) == 0:  # Skip if no valid frequencies
            return None

        # Find the frequency with the highest magnitude
        max_magnitude_idx = np.argmax(valid_magnitudes)
        max_freq = valid_freqs[max_magnitude_idx]
        #max_magnitude = valid_magnitudes[max_magnitude_idx]

        return max_freq

    def frequency_to_note_name(self, frequency: float) -> str:
        """
        Converts a single frequency to a note name
        """
        if frequency < 20:  # Below human hearing range
            return "None"
        h = round(12 * np.log2(frequency / AudioAnalyzer.A4_freq) + 69)
        octave = h // 12 - 1
        n = h % 12
        return f"{AudioAnalyzer.Note_Names[n]}{octave}"