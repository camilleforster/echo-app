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

from flask import Flask, request, jsonify

from db_client import Client
# TODO create unit tests for routes

app = Flask(__name__)

client = Client()

app.config['MYSQL_HOST'] = client.db_host
app.config['MYSQL_DB'] = client.db_name
app.config['MYSQL_PORT'] = client.db_port
app.config['MYSQL_USER'] = client.user  # TODO create new user
app.config['MYSQL_PASSWORD'] = client.password

db = MySQL(app)
CORS(app)


# TODO look into if each route can go into other files/modules

@app.route('/user/<email>', methods=['GET'])
def get_user_data(email):
    """Fetches data for a particular user.

    Parameters
    ----------
    email : str
        The email address of the user to fetch data for.
    TODO only allow this route to provide data with verification from Duo authentication, rather than taking param

    Returns
    -------
    JSON response
        A JSON response containing the user's data, including display name, sequences, and folders.
    """

    user_data = {}  # TODO populate from database; data includes display name, folders, and sequences

    return jsonify(user_data)


@app.route('/process-recording', methods=['POST'])
def process_recording():
    """
    Processes an uploaded vocal recording by converting it into
    a note sequence, saving it, and returning it to the frontend.

    Parameters
    ----------
    File file: An MP3 file of the vocal recording of the audio sequence.
    str display_name: The display name associated with the recording.
    int instrument: The ID of the default playback instrument.

    Returns
    -------
    JSON response
        A JSON response containing the processed sequence data for the frontend.
    """

    if 'file' not in request.files:
        return jsonify({"error": "No recording provided"}), 400

    recording = request.files['file']

    if not recording or not recording.filename.endswith('.mp3'):
        return jsonify({"error": "Invalid recording format"}), 400

    display_name = request.form.get('display_name')
    instrument = request.form.get('instrument', type=int)  # default playback instrument

    # TODO ensure all parameters are here

    sequence = {}  # TODO process sequence, save to database, and return sequence data for frontend

    return jsonify(sequence)


@app.route('/rename-sequence', methods=['PATCH'])
def rename_sequence():
    """
    TODO complete docstring
    -------
    JSON response
        A JSON response containing ...
    """

    if not request.is_json:
        return jsonify({"error": "Invalid request format"}), 400  # TODO make more descriptive

    data = request.get_json()

    sequence_id = data.get('sequence_id')
    display_name = data.get('display_name')

    if sequence_id is None or not isinstance(sequence_id, int):
        # TODO also validate that sequence ID exists as a record in database
        return jsonify({"error": "Missing or invalid sequence ID"}), 400

    if display_name is None:
        return jsonify({"error": "Missing new display name"}), 400

    # TODO process edit to sequence name, save to database

    return jsonify({"message": f"Sequence {sequence_id} renamed to {display_name} successfully"})


@app.route('/update-sequence-data', methods=['PUT'])
def update_sequence_data():
    """
    TODO complete docstring
    -------
    JSON response
        A JSON response containing ...
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
    TODO complete docstring
    -------
    JSON response
        A JSON response containing ...
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

    if not isinstance(sequences, list) or not all(isinstance(sequence_id, int) for sequence_id in sequences):
        # TODO also verify all sequence IDs exist in database
        return jsonify({"error": "Invalid sequence IDs"}), 400

    # TODO create folder in database

    return jsonify({"message": f"{display_name} created for {owner} successfully"})


@app.route('/rename-folder', methods=['PATCH'])  # TODO change method to PUT
def rename_folder():
    """
    TODO complete docstring
    -------
    JSON response
        A JSON response containing ...
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

    return jsonify({"message": f"{original_name} renamed to {display_name} successfully"})


@app.route('/update-folder-contents', methods=['PUT'])
def update_folder_contents():
    """
    TODO complete docstring
    -------
    JSON response
        A JSON response containing ...
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

    if not isinstance(sequences, list) or not all(isinstance(sequence_id, int) for sequence_id in sequences):
        # TODO also verify all sequence IDs exist in database
        # TODO verify that all sequences belong to the user whos folder it is
        return jsonify({"error": "Invalid sequence IDs"}), 400

    # TODO verify that folder ID exists

    # TODO update "Contains" table in database

    display_name = ''  # TODO get display name from database

    return jsonify({"message": f"{display_name} updated successfully"})

# TODO add routes to delete sequences and folders


@app.route('/create_user/<email>/<username>', methods=['POST'])
def create_user(email, username):
    cursor = db.connection.cursor()
    query = client.create_user(email, username)
    cursor.execute(query)
    db.connection.commit()
    cursor.close()
    # TODO in future, rollback DB in case of errors
    message = f"Database updated successfully; new user ({username}) created"
    print(message)
    response = jsonify({"message": message})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True)
