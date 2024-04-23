"""Flask App

TODO complete docstring

This script creates routes ....

This script requires that `flask` be installed within the Python
environment you are running this script in.

This file can also be imported as a module and contains the following
functions:

    * get_user_data - returns the column headers of the file
    * process_recording - 
    * rename_sequence - 
    * update_sequence_data - 
    * create_folder - 
    * rename_folder
    * update_folder_contents - 
    * main - executes when the script is run directly; launches the API
"""

import os
import re
from flask import Flask, request, jsonify, send_file
from flask_mysqldb import MySQL
from flask_cors import CORS

from audio_processing import Song, convert_mp3_to_wav, AudioAnalyzer

NOTE_DATA_PATH = './note_data'
AUDIO_DATA_PATH = './audio_data'

app = Flask(__name__)
db = MySQL()

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_ROOT_PASSWORD')
app.config['MYSQL_DB'] = 'echo_db'
app.config['MYSQL_PORT'] = 53346

db.init_app(app)
CORS(app)


@app.route('/get-user-data/<email>', methods=['GET'])
def get_user_data(email):
    """
    Fetches data for a particular user.

    Parameters
    ----------
    email : str
        The email address of the user to fetch data for.

    Returns
    -------
    JSON response
        A JSON response containing the user's data, including display name, sequences, and folders.
    """
    cursor = db.connection.cursor()
    query = "SELECT * FROM Users WHERE email = %s"
    cursor.execute(query, (email,))
    user = cursor.fetchone()

    if user is None:
        response = jsonify({"error": "User does not exist"}), 400  # TODO look into right error codes for each context
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    username = user[1]
    folders = []
    sequences = []

    query = "SELECT folder_id, display_name, created FROM Folders WHERE owner = %s"
    cursor.execute(query, (email,))
    raw_folders = cursor.fetchall()

    for raw_folder in raw_folders:
        folder_id = raw_folder[0]
        display_name = raw_folder[1]
        created = raw_folder[2]

        folder = {
            "id": folder_id,
            "display_name": display_name,
            "created": created,
            "sequences": [],
        }

        query = "SELECT sequence FROM Contains WHERE folder = %s"
        cursor.execute(query, (email,))
        folder_sequences = cursor.fetchall()

        for sequence in folder_sequences:
            sequence_id = sequence[0]
            folder[sequences].append(sequence_id)

        folders.append(folder)

    query = "SELECT sequence_id, bpm, display_name, filename, created FROM Sequences WHERE creator = %s"
    cursor.execute(query, (email,))
    raw_sequences = cursor.fetchall()

    for raw_sequence in raw_sequences:
        sequence_id = raw_sequence[0]
        bpm = raw_sequence[1]
        display_name = raw_sequence[2]
        filename = raw_sequence[3]
        created = raw_sequence[4]
        notes = ''
        path = f'{NOTE_DATA_PATH}/{filename}.txt'

        if os.path.exists(path):
            with open(path, 'r') as f:
                notes = f.read()

        sequence = {
            "id": sequence_id,
            "display_name": display_name,
            "created": created,
            "notes": notes,
        }

        sequences.append(sequence)

    user_data = {
        "username": username,
        "folders": folders,
        "sequences": sequences,
    }

    response = jsonify(user_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get-recording-file/<int:sequence_id>', methods=['GET'])
def get_recording_file(sequence_id):
    """
    Fetches the MP3 file corresponding to a recorded sequence.

    Parameters
    ----------
    sequence_id : int
        The sequence to be retrieved

    Returns
    -------
    MP3 response
        The recorded sequence as an MP3 file
    """
    cursor = db.connection.cursor()
    query = "SELECT filename FROM Sequences WHERE sequence_id = %s"
    cursor.execute(query, (sequence_id,))
    sequence = cursor.fetchone()
    cursor.close()

    if sequence is None:
        response = jsonify({"error": "Sequence does not exist"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    filename = sequence[0]
    path = f'{AUDIO_DATA_PATH}/{filename}.mp3'
    response = send_file(path, as_attachment=True)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/process-recording', methods=['POST'])
def process_recording():
    """
    Processes an uploaded vocal recording by converting it into
    a note sequence, saving it, and returning it to the frontend.

    Parameters
    ----------
    File file: An MP3 file of the vocal recording of the audio sequence.
    str user: The email of the creator of the song.
    str display_name: The display name associated with the recording.
    int instrument: The ID of the default playback instrument.

    Returns
    -------
    JSON response
        A JSON response containing the processed sequence data for the frontend.
    """

    if 'file' not in request.files:
        response = jsonify({"error": "No recording provided"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    recording = request.files['file']

    if not recording or not recording.filename.endswith('.mp3'):
        response = jsonify({"error": "Invalid recording format"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    display_name = request.form.get('display_name')

    if '/' in display_name or '\\' in display_name or '.' in display_name:
        response = jsonify({"error": "Display name cannot include slashes or periods"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    user = request.form.get('user')
    cursor = db.connection.cursor()
    query = "SELECT * FROM Sequences WHERE creator = %s AND display_name = %s"
    cursor.execute(query, (user, display_name))
    num_sequences_with_same_name = len(cursor.fetchall())
    filename = f'{user}-{display_name}{num_sequences_with_same_name}'
    recording_path = f'{AUDIO_DATA_PATH}/{filename}'
    recording_mp3_path = f'{recording_path}.mp3'
    recording_wav_path = f'{recording_path}.wav'
    recording.save(recording_mp3_path)
    convert_mp3_to_wav(recording_path)
    instrument = 1  # default playback instrument is unused, so default to 1 instead of `request.form.get('instrument', type=int)`
    sequence = Song(recording_wav_path, 0.25)
    processed_sequence = sequence.audio_to_notes()
    note_path = f'{NOTE_DATA_PATH}/{filename}.txt'
    processed_sequence.save_to_file(note_path)
    query = "INSERT INTO Sequences (instrument, bpm, creator, display_name, filename) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(query, (instrument, 0, user, display_name, filename))  # use default value of 0 for BPM (currently uncalculated)
    query = "SELECT LAST_INSERT_ID()"
    cursor.execute(query)
    record = cursor.fetchone()
    record_id = record[0]
    query = "SELECT * FROM Sequences WHERE sequence_id = %s"
    cursor.execute(query, (record_id,))
    raw_sequence_data = cursor.fetchone()
    db.connection.commit()
    cursor.close()
    sequence_id = raw_sequence_data[0]
    created = raw_sequence_data[6]

    sequence_data = {
        "id": sequence_id,
        "display_name": display_name,
        "created": created,
        "notes": str(processed_sequence),
    }

    response = jsonify(sequence_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/rename-sequence/<int:sequence_id>/<display_name>', methods=['PUT'])
def rename_sequence(sequence_id, display_name):
    """
    TODO complete docstring
    -------
    JSON response
        A JSON response containing ...
    """
    cursor = db.connection.cursor()
    query = "SELECT * FROM Sequences WHERE sequence_id = %s"
    cursor.execute(query, (sequence_id,))
    sequence = cursor.fetchone()

    if sequence is None:
        cursor.close()
        response = jsonify({"error": f"Sequence {sequence_id} does not exist"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    query = "UPDATE Sequences SET display_name = %s WHERE sequence_id = %s"
    cursor.execute(query, (display_name, sequence_id))
    db.connection.commit()
    cursor.close()
    response = jsonify({"message": f"Sequence {sequence_id} renamed to {display_name} successfully"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/update-sequence-data/<int:sequence_id>/<updated_sequence>', methods=['PUT'])
def update_sequence_data(sequence_id, updated_sequence):
    """
    TODO complete docstring
    -------
    JSON response
        A JSON response containing ...
    """
    cursor = db.connection.cursor()
    query = "SELECT filename FROM Sequences WHERE sequence_id = %s"
    cursor.execute(query, (sequence_id,))
    sequence = cursor.fetchone()
    cursor.close()

    if sequence is None:
        response = jsonify({"error": f"Sequence {sequence_id} does not exist"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    # validate sequence format
    notes = updated_sequence.split(',')
    analyzer = AudioAnalyzer()
    pattern = r"^(" + "|".join(analyzer.Note_Names) + r")(\d+(\.\d+)?)$"

    for note in notes:
        if not re.match(pattern, note):
            response = jsonify({"error": "Invalid new sequence data"}), 400
            response[0].headers.add('Access-Control-Allow-Origin', '*')
            return response

    filename = sequence[0]
    path = f'{NOTE_DATA_PATH}/{filename}.txt'

    with open(path, 'w') as f:
        f.write(updated_sequence)

    response = jsonify({"message": f"Sequence {sequence_id} updated successfully"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/create-folder/<display_name>/<owner>', methods=['POST'])
def create_folder(display_name, owner):
    """
    TODO complete docstring
    -------
    JSON response
        A JSON response containing ...
    """
    cursor = db.connection.cursor()
    query = "INSERT INTO Folders (display_name, owner) VALUES (%s, %s)"
    cursor.execute(query, (display_name, owner))
    query = "SELECT LAST_INSERT_ID()"
    cursor.execute(query)
    folder = cursor.fetchone()
    db.connection.commit()
    cursor.close()
    folder_id = folder[0]
    response = jsonify({"folder_id": folder_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/rename-folder/<int:folder_id>/<display_name>', methods=['PUT'])
def rename_folder(folder_id, display_name):
    """
    TODO complete docstring
    -------
    JSON response
        A JSON response containing ...
    """
    cursor = db.connection.cursor()
    query = "SELECT display_name FROM Folders WHERE folder_id = %s"
    cursor.execute(query, (folder_id,))
    folder = cursor.fetchone()

    if folder is None:
        cursor.close()
        response = jsonify({"error": "Folder does not exist in database"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    original_name = folder[0]
    query = "UPDATE Folders SET display_name = %s WHERE folder_id = %s"
    cursor.execute(query, (display_name, folder_id))
    db.connection.commit()
    cursor.close()
    response = jsonify({"message": f"{original_name} renamed to {display_name} successfully"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/update-folder-contents', methods=['PUT'])
def update_folder_contents():
    """
    TODO complete docstring
    TODO replace with add and delete routes
    -------
    JSON response
        A JSON response containing ...
    """

    if not request.is_json:
        response = jsonify({"error": "Invalid request format"}), 400  # TODO make more descriptive
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    data = request.get_json()
    folder_id = data.get('folder_id')
    sequences = data.get('sequences')

    if folder_id is None:
        response = jsonify({"error": "Missing folder ID"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    if sequences is None:
        response = jsonify({"error": "Missing folder sequences"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    if not isinstance(sequences, list) or not all(isinstance(sequence_id, int) for sequence_id in sequences):
        response = jsonify({"error": "Invalid sequence IDs"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    cursor = db.connection.cursor()
    query = "SELECT * FROM Folders WHERE folder_id = %s"
    folder = cursor.execute(query, (folder_id,))

    if folder is None:
        cursor.close()
        response = jsonify({"error": f"Folder does not exist"}), 400
        response[0].headers.add('Access-Control-Allow-Origin', '*')
        return response

    folder_owner = folder[2]

    for sequence_id in sequences:
        query = "SELECT creator FROM Sequences WHERE sequence_id = %s"
        cursor.execute(query, (sequence_id,))
        sequence = cursor.fetchone()

        if sequence is None:
            cursor.close()
            response = jsonify({"error": f"Sequence {sequence_id} does not exist"}), 400
            response[0].headers.add('Access-Control-Allow-Origin', '*')
            return response

        sequence_owner = sequence[0]

        if sequence_owner != folder_owner:
            cursor.close()
            response = jsonify({"error": f"Sequence {sequence_id} is not owned by {folder_owner}"}), 400
            response[0].headers.add('Access-Control-Allow-Origin', '*')
            return response
        
    query = "SELECT sequence FROM Contains WHERE folder = %s"
    cursor.execute(query, (folder_id,))
    current_sequences = folder.fetchall()
    current_sequence_ids = [sequence[0] for sequence in current_sequences]

    for sequence_id in sequences:  # add newly added sequences
        if sequence_id not in current_sequence_ids:
            query = "INSERT INTO Contains (folder, sequence) VALUES (%s, %s)"
            cursor.execute(query, (folder_id, sequence_id))

    for sequence_id in current_sequence_ids:  # remove newly removed sequences
        if sequence_id not in sequences:
            query = "DELETE FROM Contains WHERE sequence = %s"
            cursor.execute(query, (sequence_id,))
 
    cursor.close()
    display_name = folder[1]
    response = jsonify({"message": f"{display_name} updated successfully"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/delete-folder/<int:folder_id>', methods=['DELETE'])
def delete_folder(folder_id):
    cursor = db.connection.cursor()
    query = "DELETE FROM Folders WHERE folder_id = %s"
    cursor.execute(query, (folder_id,))
    query = "DELETE FROM Contains WHERE folder = %s"
    cursor.execute(query, (folder_id,))
    db.connection.commit()
    cursor.close()
    response = jsonify({"message": f"Database updated successfully"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/delete-sequence/<int:sequence_id>', methods=['DELETE'])
def delete_sequence(sequence_id):
    cursor = db.connection.cursor()
    query = "DELETE FROM Sequences WHERE sequence_id = %s"
    cursor.execute(query, (sequence_id,))
    query = "DELETE FROM Contains WHERE sequence = %s"
    cursor.execute(query, (sequence_id,))
    db.connection.commit()
    cursor.close()
    response = jsonify({"message": f"Database updated successfully"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/create-user/<email>/<username>', methods=['POST'])
def create_user(email, username):
    cursor = db.connection.cursor()
    query = "INSERT INTO Users (email, display_name) VALUES (%s, %s)"
    cursor.execute(query, (email, username))
    db.connection.commit()
    cursor.close()
    response = jsonify({"message": f"{username}'s account created"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(debug=True)

