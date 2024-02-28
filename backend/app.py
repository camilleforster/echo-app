from flask import Flask, request, jsonify

app = Flask(__name__)

app.config['TEMP_RECORDINGS'] = '/recordings'  # stores raw recordings while they are being processed into an encoded sequence

# TODO create unit tests for routes


@app.route('/user/<user>', methods=['GET'])
def get_user_data():
    """
    TODO create docstring
    """

    user_data = {}  # TODO populate from database; data includes display name, folders, and sequences

    return jsonify(user_data)


@app.route('/process', methods=['POST'])
def process_recording():
    """
    TODO create docstring
    """

    if 'file' not in request.files:
        return jsonify({"error": "No recording provided"}), 400
    
    recording = request.files['file']

    if recording and recording.filename.endswith('.mp3'):
        display_name = request.form.get('display_name')
        instrument = request.form.get('instrument', type=int)  # default playback instrument

        sequence = {}  # TODO process sequence, save to database, and return sequence data for frontend

        return jsonify(sequence)

    return jsonify({"error": "Invalid recording format"}), 400


@app.route('/edit', methods=['POST'])
def edit_recording():
    """
    TODO create docstring
    """

    if not request.is_json:
        return jsonify({"error": "Invalid request format"}), 400  # TODO make more descriptive
    
    data = request.get_json()

    sequence_id = data.get('sequence_id')
    updated_sequence = data.get('updated_sequence')

    if sequence_id is None or not isinstance(sequence_id, int):
        # TODO also validate that sequence ID exists as a record in database
        return jsonify({"error": "Missing or invalid sequence ID"}), 400

    if updated_sequence is None:
        # TODO also validate format of new sequence data
        return jsonify({"error": "Missing new sequence data"}), 400
    
    # TODO process edit to sequence, save to database

    return jsonify({"message": f"Sequence {sequence_id} updated successfully"})


@app.route('/create-folder', methods=['POST'])
def create_folder():
    """
    TODO create docstring
    """

    if not request.is_json:
        return jsonify({"error": "Invalid request format"}), 400  # TODO make more descriptive

    data = request.get_json()

    owner = data.get('owner')
    display_name = data.get('display_name')
    sequences = data.get('sequences')  # can be initially empty

    if owner is None:
        return jsonify({"error": "Missing folder owner"}), 400

    if display_name is None:
        return jsonify({"error": "Missing folder name"}), 400

    if sequences is None:
        return jsonify({"error": "Missing folder sequences"}), 400

    if not isinstance(sequences, list) or not all(isinstance(id, int) for id in sequences):  # TODO also verify all sequence IDs exist in database
        return jsonify({"error": "Invalid sequence IDs"}), 400

    # TODO create folder in database

    return jsonify({"message": f"{display_name} created successfully for {owner}"})


@app.route('/edit-folder-name', methods=['POST'])
def edit_folder_name():
    """
    TODO create docstring
    """

    if not request.is_json:
        return jsonify({"error": "Invalid request format"}), 400  # TODO make more descriptive

    data = request.get_json()
    folder_id = data.get('folder_id')
    display_name = data.get('display_name')

    if folder_id is None:
        return jsonify({"error": "Missing folder ID"}), 400

    if display_name is None:
        return jsonify({"error": "Missing new folder name"}), 400
    
    # TODO verify that folder ID exists

    original_name = ''  # TODO get original display name from database

    # TODO update folder name in database

    return jsonify({"message": f"{original_name} renamed to {display_name}"})


@app.route('/update-folder-contents', methods=['POST'])
def update_folder_contents():
    """
    Used to add or remove sequences to a user folder. The route takes in the new set of sequences in the folder.
    TODO include params
    """

    if not request.is_json:
        return jsonify({"error": "Invalid request format"}), 400  # TODO make more descriptive

    data = request.get_json()
    folder_id = data.get('folder_id')
    sequences = data.get('sequences')

    if folder_id is None:
        return jsonify({"error": "Missing folder ID"}), 400

    if sequences is None:
        return jsonify({"error": "Missing folder sequences"}), 400

    if not isinstance(sequences, list) or not all(isinstance(id, int) for id in sequences):
        return jsonify({"error": "Invalid sequence IDs"}), 400
    
    # TODO verify that folder ID exists

    # TODO update "Contains" table in database

    display_name = ''  # TODO get display name from database

    return jsonify({"message": f"{display_name} updated successfully"})


if __name__ == '__main__':
    app.run()
