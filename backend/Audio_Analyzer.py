from typing import Iterator, List
import numpy as np
import pyaudio
from scipy.fft import rfft, rfftfreq
from scipy.io import wavfile

class AudioAnalyzer:
    """A class representing the audio file analyzer. 

    Attributes
    ----------
    A4_freq : int
        the frequency of a standard A4 note.
    Note_Names : list of str
        a list contains all standard note name.

    Methods
    -------
    song_to_notes(song)
        Converts the audio frequencies to note names.
    """

    A4_freq= 440.0
    Note_Names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    def __init__(self, sampling_rate: int):
        """
        Parameters
        ----------
        sampling_rate : int
            the rate for the algorithm to detect sample sounds.
        """
        self.sampling_rate = sampling_rate

    def _frequency_to_note_name(self, frequency: float) -> str:
        """
        Converts a single frequency to a note name
        """
        if frequency < 20:  # Below human hearing range
            return "None"
        h = round(12 * np.log2(frequency / AudioAnalyzer.A4_freq) + 69)
        octave = h // 12 - 1
        n = h % 12
        return f"{AudioAnalyzer.Note_Names[n]}{octave}"

    def frequency_to_note_name(self, frequencies: List[float]) -> List[str]:
        """
        Converts frequencies to note names
        """
        return [self._frequency_to_note_name(f) for f in frequencies]

class AnalysisPoint:
    """A class representing one data point in AnalyzedSong.

    Attributes
    ----------
    time_stamp : float
        description
    frequency : float
        description
    note_name : str
        description
    """
    def __init__(self, time_stamp: float, frequency: float, note_name: str):
        """
        Parameters
        ----------
        time_stamp : float
            the starting time of each time segments.
        frequency : float
            the dominant frequency at each time segments.
        note_name : str
            the note name that corresponds to the dominant frequency.
        """
        self.time_stamp = time_stamp
        self.frequency = frequency
        self.note_name = note_name

    def __repr__(self):
        """
        Outputs time stamp and corresponding frequencies.
        """
        return f"Time: {self.time_stamp}s, Frequency: {self.frequency}Hz, Note: {self.note_name}"

class AnalyzedSong:
    """A class representing the song after analysis. 

    Attributes
    ----------
    data : list[AnalysisPoint]
        description

    Methods
    -------
    add_point(time_stamp, frequency, note_name)
        add a time point and corresponding frequency and note name to the AnalyzedSong.
    get_analysis()
        Returns the list of analyzed data points.
    save_to_file(filename)
        Saves the analysis results to a file.
    """
    def __init__(self):
        """
        Parameters
        ----------
        data : list[AnalysisPoint]
            description
        """
        self.data = []

    def add_point(self, time_stamp: float, frequency: float, note_name: str):
        """ Adds one analyzed point to the analyzed song. 

        detailed description

        Parameters
        ----------
        time_stamp : float
            the starting time of each time segments.
        frequency : float
            the dominant frequency at each time segments.
        note_name : str
            the note name that corresponds to the dominant frequency.
        """
        self.data.append(AnalysisPoint(time_stamp, frequency, note_name))

    def get_analysis(self) -> List[AnalysisPoint]:
        """ Returns the list of analyzed data points.

        Returns
        -------
        list[AnalysisPoint]
            A populated list of AnalysisPoints 
        """
        return self.data

    def save_to_file(self, filename: str):
        """ Saves the analysis results to a file.

        Parameters
        -------
        filename : str
            name of the file to save the analysis to.
        """
        with open(filename, 'w') as file:
            for point in self.data:
                file.write(f"{point}\n")

# The Song class receives a raw audio file and readies it for processing
class Song:
    """A class representing the audio file before analysis.

    Attributes
    ----------
    file_path : str
        The full path of the raw audio file before analysis

    Methods
    -------
    audio_to_frequency(filter_noise=True)
        Converts the audio file to an Iterator of frequencies.
    """

    def __init__(self, analyzer: AudioAnalyzer, file_path: str):
        """
        Parameters
        ----------
        analyzer : AudioAnalyzer
            use the AudioAnalyzer to analyze the song.
        file_path : str
            The full path of the raw audio file before analysis
        """
        self.analyzer = analyzer
        self.file_path = file_path

    def audio_to_frequency(self) -> AnalyzedSong:
        """ Converts the audio file to an AnalyzedSong object.

        Parameters
        ----------
        filter_noise : boolean, optional
            Filter noise from the audio before converting it to frequencies (default is True)
        chunk_size : int
            the length of each time segments.
        Returns
        -------
        AnalyzedSong
            an AnalyzedSong object which contains the processed information about the song.
        """

        # Read the audio file
        sampling_rate, data = wavfile.read(self.file_path)
        # Assuming the audio is mono for simplicity
        if data.ndim > 1:
            data = data[:, 0]

        analyzed_song = AnalyzedSong()

        # Define constants
        chunk_size = int(0.25* sampling_rate)  # Number of samples in each 0.25 second chunk
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
file_path = 'sample1.wav'  # Update this path to your audio file
sampling_rate = 44100  # This should match the sampling rate of your audio file
analyzer = AudioAnalyzer(sampling_rate)
song = Song(analyzer, file_path)

analyzed_song = song.audio_to_frequency()
for analysis_point in analyzed_song.get_analysis():
    print(analysis_point)

# Optionally save the analysis to a file
analyzed_song.save_to_file("analysis_result.txt")
