from typing import Iterator, List
import numpy as np
#import pyaudio
from scipy.fft import rfft, rfftfreq


class Song:
    """A class representing the audio file before analysis.

    Attributes
    ----------
    frequency_queue : list
        a queue of frequencies processed so far
    file_path : str
        The full path of the raw audio file before analysis

    Methods
    -------
    audio_to_frequency(filter_noise=True)
        Converts the audio file to an Iterator of frequencies.
    """

    def __init__(self, file_path: str):
        """
        Parameters
        ----------
        file_path : str
            The full path of the raw audio file before analysis
        """
        self.frequency_queue = None
        self.file_path = file_path

    def audio_to_frequency(self, filter_noise=True) -> Iterator[float]:
        """ Converts the audio file to an Iterator of frequencies.

        If the frequency iterator hasn’t been created yet, upload the audio file
        and create the frequency iterator that outputs a chunk of the audio every time next is called.
        Placeholder for actual implementation

        Parameters
        ----------
        filter_noise : boolean, optional
            Filter noise from the audio before converting it to frequencies (default is True)
        
        Returns
        -------
        Iterator[float]
            Iterator of the frequency representation of the audio file
        """

        pass


class AudioAnalyzer:
    """A class representing the audio file analyzer. 

    Attributes
    ----------
    sampling_rate : int
        description
    chunk_size : int
        description
    channels : int
        description

    Methods
    -------
    song_to_notes(song)
        Converts the audio frequencies to note names.
    """

    def __init__(self, sampling_rate: int, chunk_size: int, channels: int):
        """
        Parameters
        ----------
        sampling_rate : int
            description
        chunk_size : int
            description
        channels : int
            description
        """
        self.sampling_rate = sampling_rate
        self.chunk_size = chunk_size
        self.channels = channels

    def _frequency_to_note_name(self, frequency: float):
        """
        Converts a single frequency to a note name
        """
        # Placeholder for actual implementation
        pass

    def _frequencies_to_note_name(self, frequencies: Iterator[float]):
        """
        Converts frequencies to note names
        """
        # Placeholder for actual implementation
        return AnalyzedSong()

    def song_to_notes(self, song: Song):
        """ Converts the audio frequencies to note names.

        detailed description

        Parameters
        ----------
        song : Song
            An uploaded song before analysis

        Returns
        -------
        AnalyzedSong
            A populated AnalyzedSong containing a list of AnalysisPoints 
        """
        # Placeholder for actual implementation
        return self._frequencies_to_note_name(Song.audio_to_frequency())


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
            description
        frequency : float
            description
        note_name : str
            description
        """
        self.time_stamp = time_stamp
        self.frequency = frequency
        self.note_name = note_name


class AnalyzedSong:
    """A class representing the song after analysis. 

    Attributes
    ----------
    data : list[AnalysisPoint]
        description

    Methods
    -------
    add_point(time_stamp, frequency, note_name)
        Summary of description.
    get_analysis()
        Summary of description.
    save_to_file(filename)
        Summary of description.
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
            description
        frequency : float
            description
        note_name : str
            description
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
        # Placeholder for actual implementation
        pass

