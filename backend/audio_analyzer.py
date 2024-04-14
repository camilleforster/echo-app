import subprocess
import os
from typing import Iterator, List
import numpy as np
import pyaudio
from scipy.fft import rfft, rfftfreq
from scipy.io import wavfile
from midiutil.MidiFile import MIDIFile
import lilypond
import librosa

class AudioAnalyzer:
    """A class representing the audio file analyzer.

    Its initialized by the sampling rate of the audio file in (samples/sec).
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
    audio_chunk_to_frequency(self, chunk_data)
        Detects the frequency with the highest magnitude in the audio chunk.
    frequency_to_note_name(self, frequency)
        Converts the detected frequncy to a standard not name
    """

    A4_freq= 440.0
    Note_Names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    def __init__(self, sampling_rate):
        """
        Parameters
        ----------
        sampling_rate : int
            the rate for the algorithm to detect sample sounds.
        """
        self.sampling_rate = sampling_rate

    def audio_chunk_to_frequency(self, chunk_data):
        # Calculate FFT for the chunk
        fft_result = rfft(chunk_data)
        freqs = rfftfreq(len(chunk_data), 1 / self.sampling_rate)
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
    def __init__(self, time_stamp: float, frequency: float,
        note_name: str, duration: float):
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
        self.duration = duration

    def _duration_to_lilypond(self):
        # Assuming 0.25 seconds per quarter note
        quarter_note_duration = 0.25  # seconds
        duration_in_quarters = self.duration / quarter_note_duration
        
        # Define common musical note lengths in terms of quarter note durations
        note_lengths = {
            4.0: "1",  # Whole note
            2.0: "2",  # Half note
            1.0: "4",  # Quarter note
            0.5: "8",  # Eighth note
            0.25: "16",  # Sixteenth note
            # Add more if needed
        }
        
        # Find the closest note length to the duration_in_quarters
        closest_note_length = min(note_lengths.keys(), key=lambda length: abs(length - duration_in_quarters))
        return note_lengths[closest_note_length]

    def note_to_lilypond(self):
        lilypond_notation = ""
        name = self.note_name[:-1].lower()  # Extract the note letter(s) and make them lowercase
        octave = int(self.note_name[-1])  # Extract the octave as an integer
        octave_difference = octave - 4  # Determine octave difference from C4
        octave_adjustment = "'" * octave_difference if octave_difference > 0 else "," * -octave_difference
            
        lily_duration = self._duration_to_lilypond()
        lilypond_notation += f"{name}{octave_adjustment}{lily_duration} "
        #lilypond_notation += "\n}"
        return lilypond_notation

    def __repr__(self):
        """
        Outputs time stamp and corresponding frequencies.
        """
        return f"Time: {self.time_stamp}s, Frequency: {self.frequency}Hz, Note: {self.note_name}, Duration: {self.duration}sec"

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

    def add_point(self, time_stamp: float, frequency: float,
        note_name: str, duration: float):
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
        self.data.append(AnalysisPoint(time_stamp, frequency, note_name, duration))

    def get_analysis(self) -> List[AnalysisPoint]:
        """ Returns the list of analyzed data points.

        Returns
        -------
        list[AnalysisPoint]
            A populated list of AnalysisPoints 
        """
        return self.data

    def _combine_notes(self, chunk_duration):
        """Updates self.data array to combine consecutive identical notes together
        """
        combined_notes = []
        current_note = None
        current_freq = None
        current_start_time = 0.0
        duration = 0.0

        for point in self.data:
            if current_note == point.note_name:
                duration += chunk_duration  # assuming each segment represents 0.25s as per your example
            else:
                if current_note is not None:
                    combined_notes.append(AnalysisPoint(current_start_time, current_freq, current_note, duration))
                current_note = point.note_name
                current_start_time = point.time_stamp
                current_freq = point.frequency
                duration = chunk_duration

        # Add the last note
        if current_note is not None:
            combined_notes.append(AnalysisPoint(current_start_time, current_freq, current_note, duration))

        self.data = combined_notes
        return

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

    def notes_to_lilypond(self, chunk_duration):
        #combine consecutive identical notes
        analyzed_song._combine_notes(chunk_duration)
        lilypond_notation = "\\relative c' {\n    \\key c \\major\n    \\time 4/4\n"

        for point in self.data:
            lilypond_notation += point.note_to_lilypond()
        lilypond_notation += "\n}"
        return lilypond_notation

    def save_to_MIDI(self, filename: str,):
        """ Saves the analysis results to a file.

        Parameters
        -------
        filename : str
            name of the file to save the analysis to.
        """
        # create an MIDI object
        mf = MIDIFile(1)     # only 1 track
        track = 0   # the first and only track

        time = 0    # start at the beginning
        mf.addTrackName(track, time, "Track")
        mf.addTempo(track, time, 120) # 120 BPM assuming 0.25 sec per note

        # add some notes
        channel = 0
        volume = 100

        for point in self.data:
            mf.addNote(track, channel, librosa.note_to_midi(point.note_name),
                point.time_stamp//0.25, point.duration//0.25, volume)

        # write it to disk
        with open(filename+".mid", 'wb') as outf:
            mf.writeFile(outf)

    def generate_sheet_music(self, image_name, chunk_duration=0.25):
        # LilyPond code as a Python string
        lilypond_code = """
        \\version "2.20.0"

        \\header {
          title = "A Simple Melody"
          composer = "Composer Name"
        }

        \\score {
          {""" + self.notes_to_lilypond(chunk_duration) + """
          }
          \\layout { }
          \\midi { }
        }
        """
        file_path = os.path.join("output", image_name+".ly")
        os.makedirs("output", exist_ok=True)

        # Writing the LilyPond code to a file in the output directory
        with open(file_path, "w") as file:
            file.write(lilypond_code)

        subprocess.run([str(lilypond.executable()), file_path])


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

