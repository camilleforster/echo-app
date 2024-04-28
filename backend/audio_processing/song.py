from scipy.io import wavfile

from .analyzed_song import AnalyzedSong
from .audio_analyzer import AudioAnalyzer
from .convert import convert_m4a_to_wav

class Song:
    """A class representing the audio file before analysis.

    The Song class is instantiated with a raw audio file.
    It loads the file for anbalysis. The main function is audio_to_notes 
    which samples data points, instantiates an AudioAnalyzer, and uses it
    to return an AnalyzedSong instance.
    to analyze it.

    Attributes
    ----------
    file_path : str
        The full path of the raw audio file before analysis
    chunk_duration: float
        the duration of one beat in secs defaults to 0.25 sec.

    Methods
    -------
    audio_to_notes()
        Converts the audio file to an AnalyzedSong object.
    """

    def __init__(self, file_path: str, chunk_duration=0.25):
        """
        Parameters
        ----------
        file_path : str
            The full path of the raw audio file before analysis
        chunk_duration : float
            the length of each time segment in secs. defaults to 0.25 sec.
        """
        self.file_path = file_path
        self.chunk_duration = chunk_duration

    def audio_to_notes(self) -> AnalyzedSong:
        """ Converts the audio file to an AnalyzedSong object.
        
        Returns
        -------
        AnalyzedSong
            an AnalyzedSong object which contains the processed notes of the audio
        """
        if self.file_path.endswith(".m4a"):
            self.file_path = convert_m4a_to_wav(self.file_path)
        # returns sampling_rate (in samples/sec) and array of audio amplitudes
        sampling_rate, data = wavfile.read(self.file_path) # 
        # only keep the left channel. we assume audio is mono for simplicity
        if data.ndim > 1:
            data = data[:, 0]

        analyzer = AudioAnalyzer()
        analyzed_song = AnalyzedSong()

        chunk_n_samples = int(self.chunk_duration* sampling_rate)  # #samples in each 0.25s chunk
        num_chunks = len(data) // chunk_n_samples 

        for chunk_idx in range(num_chunks):
            start_sample = chunk_idx * chunk_n_samples
            end_sample = start_sample + chunk_n_samples
            chunk_data = data[start_sample:end_sample]

            max_freq = analyzer.audio_chunk_to_frequency(chunk_data, sampling_rate)

            # Convert frequency to note name
            note_name = analyzer.frequency_to_note_name(max_freq)
            time_stamp = chunk_idx * self.chunk_duration  # Time stamp for the current chunk

            # Add point to analyzed song
            analyzed_song.add_point(time_stamp, max_freq, note_name, self.chunk_duration)

        return analyzed_song


# Example usage
#file_path = '../tests/test_data/a_small_miracle.mp3'  # Update this path to your audio file
#chunk_duration = 0.25
#song = Song(file_path, chunk_duration)
#analyzed_song = song.audio_to_notes()

#for analysis_point in analyzed_song.get_analysis():
#    print(analysis_point)

# # Optionally save the analysis to a file
# analyzed_song.save_to_file("analysis_result.txt")
# analyzed_song.save_to_MIDI('midi1')
# print("*************************")

# print(analyzed_song.notes_to_lilypond(chunk_duration))
# for analysis_point in analyzed_song.get_analysis():
#     print(analysis_point)

# analyzed_song.generate_sheet_music('sheet1')