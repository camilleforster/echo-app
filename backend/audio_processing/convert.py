from pydub import AudioSegment

def convert_mp3_to_wav(path):
    """
    Converts a MP3 file to a WAV file.
    
    Parameters
    ----------
    path: str
        The path to the file, WITHOUT a .mp3 extension
    """
    path = path[:len(path)-4]
    print(path)
    audio = AudioSegment.from_mp3(f'{path}.mp3')
    audio.export(f'{path}.wav', format='wav')
    return f'{path}.wav'