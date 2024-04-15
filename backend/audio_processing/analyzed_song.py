from typing import Iterator, List
from midiutil.MidiFile import MIDIFile
import lilypond
import librosa
import subprocess
import os

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
    duration: float
        duration of the note in secs
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
        duration: float
            duration of the note in secs
        """
        self.time_stamp = time_stamp
        self.frequency = frequency
        self.note_name = note_name
        self.duration = duration

    def _duration_to_lilypond(self, chunk_duration):
        """A helper function for note_to_lilypond

        Parameters
        ----------
        chunk_duration: float
            duration of one beat secs
        """
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

    def note_to_lilypond(self, chunk_duration):
        """Returns a string representatiion of the note in lilypond format

        Parameters
        ----------
        chunk_duration: float
            duration of one beat secs

        Returns
        -------
        str
            a string representatiion of the note in lilypond format
        """
        lilypond_notation = ""
        name = self.note_name[:-1].lower()  # Extract the note letter(s) and make them lowercase
        octave = int(self.note_name[-1])  # Extract the octave as an integer
        octave_difference = octave - 4  # Determine octave difference from C4
        octave_adjustment = "'" * octave_difference if octave_difference > 0 else "," * -octave_difference
        
        lily_duration = self._duration_to_lilypond(chunk_duration)
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
    save_to_MIDI(self, filename: str)
        Saves the audio analysis results to an MIDI file.
    notes_to_lilypond(self, chunk_duration)
        Returns a represtnation of the song notes in lilypond format.
    generate_sheet_music(self, image_name, chunk_duration=0.25)
        Generates a represtnation of the song notes in lilypond format
        and saves it to a PDF file. 
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
        duration: float
            duration of the note in secs
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

        Parameters
        ----------
        chunk_duration: float
            duration of one beat in secs
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
        """Returns a represtnation of the song notes in lilypond format

        Parameters
        ----------
        chunk_duration: float
            duration of one beat secs

        Returns
        -------
        str
            A represtnation of the song notes in lilypond format
        """
        #combine consecutive identical notes
        self._combine_notes(chunk_duration)
        lilypond_notation = "\\relative c' {\n    \\key c \\major\n    \\time 4/4\n"

        for point in self.data:
            lilypond_notation += point.note_to_lilypond(chunk_duration)
        lilypond_notation += "\n}"
        return lilypond_notation

    def save_to_MIDI(self, filename: str):
        """ Saves the audio analysis results to an MIDI file.

        Parameters
        -------
        filename : str
            name of the file to save the notes sequence to.
        """
        # create an MIDI object
        mf = MIDIFile(1)     # only 1 track
        track = 0   # the first and only track

        time = 0    # start at the beginning
        mf.addTrackName(track, time, "Track")
        mf.addTempo(track, time, 120) # 120 BPM assuming 0.25 sec per note

        # add the notes
        channel = 0
        volume = 100

        for point in self.data:
            mf.addNote(track, channel, librosa.note_to_midi(point.note_name),
                point.time_stamp//0.25, point.duration//0.25, volume)

        with open(filename+".mid", 'wb') as outf:
            mf.writeFile(outf)

    def generate_sheet_music(self, image_name, chunk_duration=0.25):
        """Generates a represtnation of the song notes in lilypond format
        and saves it to a PDF file. 
        
        Parameters
        -------
        image_name : str
            name of the pdf file to save the notes representation to.
        chunk_duration: float
            duration of one beat in secs
        """
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

