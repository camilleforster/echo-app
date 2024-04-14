from scipy.io import wavfile

from analyzed_song import AnalyzedSong
from audio_analyzer import AudioAnalyzer

class Song:
    """A class representing the audio file before analysis.

    The Song class is instantiated with a raw audio file.
    It opens the file, samples data points, and uses an AudioAnalyzer
    to analyze it.

    Attributes
    ----------
    file_path : str
        The full path of the raw audio file before analysis

    Methods
    -------
    audio_to_frequency(filter_noise=True)
        Converts the audio file to an Iterator of frequencies.
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

    def audio_to_notes(self, ) -> AnalyzedSong:
        """ Converts the audio file to an AnalyzedSong object.

        Parameters
        ----------
        filter_noise : boolean, optional
            Filter noise from the audio before converting it to frequencies (default is True)
        
        Returns
        -------
        AnalyzedSong
            an AnalyzedSong object which contains the processed information about the song.
        """

        # returns sampling_rate (in samples/sec) and data array of amplitudes
        sampling_rate, data = wavfile.read(self.file_path) # 
        # only keep the left channel. assume audio is mono for simplicity
        if data.ndim > 1:
            data = data[:, 0]

        analyzer = AudioAnalyzer(sampling_rate)
        analyzed_song = AnalyzedSong()

        # Define constants
        chunk_n_samples = int(self.chunk_duration* sampling_rate)  # Number of samples in each 0.25 second chunk
        num_chunks = len(data) // chunk_n_samples

        # sample chunks
        for chunk_idx in range(num_chunks):
            start_sample = chunk_idx * chunk_n_samples
            end_sample = start_sample + chunk_n_samples
            chunk_data = data[start_sample:end_sample]

            max_freq = analyzer.audio_chunk_to_frequency(chunk_data)

            # Convert frequency to note name
            note_name = analyzer.frequency_to_note_name(max_freq)
            time_stamp = chunk_idx * 0.25  # Time stamp for the current chunk

            # Add point to analyzed song
            analyzed_song.add_point(time_stamp, max_freq, note_name, chunk_duration)

        return analyzed_song


# Example usage
file_path = 'sample1.wav'  # Update this path to your audio file
chunk_duration = 0.25
song = Song(file_path, chunk_duration)
analyzed_song = song.audio_to_notes()

for analysis_point in analyzed_song.get_analysis():
    print(analysis_point)

# Optionally save the analysis to a file
analyzed_song.save_to_file("analysis_result.txt")
analyzed_song.save_to_MIDI('midi1')
print("*************************")

print(analyzed_song.notes_to_lilypond(chunk_duration))
for analysis_point in analyzed_song.get_analysis():
    print(analysis_point)

analyzed_song.generate_sheet_music('sheet1')