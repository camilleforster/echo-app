from pydub import AudioSegment

def convert_m4a_to_wav(path):
    """
    Converts a M4A file to a WAV file.
    
    Parameters
    ----------
    path: str
        The path to the file, WITHOUT a .m4a extension
    """
    audio = AudioSegment.from_file(f'{path}.m4a', format='m4a')
    audio.export(f'{path}.wav', format='wav')
    return f'{path}.wav'