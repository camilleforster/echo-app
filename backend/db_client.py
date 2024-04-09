import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) # read local .env file


# Creating a connection object.
DB_HOST = '127.0.0.1'
DB_PORT = '53346'
DB_NAME = 'echo_db'

DB_USER = 'root' # create more users
DB_PASSWORD = os.environ['MYSQL_ROOT_PASSWORD']



class Client:
    """A class representing the database client.

    Attributes
    ----------
    db_host : str, optional
        the hostname of the MySQL database (default is value of DB_HOST)
    db_port : str, optional
        the port of the MySQL database (default is value of DB_PORT)
    db_name : str, optional
        the name of the MySQL database (default is value of DB_NAME)
    user : str, optional
        the username of the MySQL client (default is value of DB_USER)
    password : str, optional
        the password of the MySQL client (default is value of DB_PASSWORD)

    Methods
    -------
    create_user(email, username)
        Returns an SQL query for creating a new user username whose email is email.
        
    create_folder(folder_name, username)
        Returns an SQL query for creating a new folder with name folder_name for user username.
    
    create_sequence(email, instrument_id, bpm, name, filename)
        Returns an SQL query for creating a new recording with name 

    get_user_data(email)
        Returns an SQL query for the user's data, including display name, sequences, and folders.

    update_sequence_data(sequence_id, fields_to_values)
        Returns an SQL query for the updating sequence (sequence_id)'s data using a dict of (column name, value) pairs

    update_folder_data(folder_id, fields_to_values)
        Returns an SQL query for the updating folder (folder_id)'s data using a dict of (column name, value) pairs
    """

    def __init__(self, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT, db_name=DB_NAME):
        self.db_host = host
        self.db_port = port
        self.db_name = db_name
        self.user = user
        self.password = password


    def create_user(self, email, username):
        """Returns an SQL query for creating a new user username whose email is email.
       The query then returns the id of the inserted user in a column namesd "id"

        Parameters
        ----------
        email : str
        username : str
        
        Returns
        -------
        str
        """
        return f"INSERT INTO Users (email, display_name) VALUES ('{email}', '{username}'); SELECT LAST_INSERT_ID() as id;"


    def create_folder(self, email, folder_name):
        """Returns an SQL query for creating a new folder with name folder_name for user username.
        The query then returns the id of the inserted folder in a column namesd "id".

        Parameters
        ----------
        email : str
        folder_name : str
        
        Returns
        -------
        str
        """
        return f"INSERT INTO Folders (display_name, owner) VALUES ('{folder_name}', '{email}'); SELECT LAST_INSERT_ID() as id;"

    def create_sequence(self, email, instrument_id, bpm, name, filename):
        """Returns an SQL query for creating a new sequence with the properties given as arguments
        ans asks the database to set the value of the "created" column of the sequence
        automatically. The query then returns the id of the inserted sequence in a column namesd "id"

        Parameters
        ----------
        email : str
        username : str
        instrument_id : int
        bpm : int
        instrument_name : str
        filename : str

        Returns
        -------
        str
        """
        return f"INSERT INTO Sequences (instrument, bpm, creator, display_name, filename) VALUES ({instrument_id}, {bpm}, '{email}', '{name}', '{filename}'); SELECT LAST_INSERT_ID() as id;"

    def add_sequence_to_folder(self, folder_id, sequence_id):
        """Returns an SQL query for adding a sequence to a specific folder

        Parameters
        ----------
        sequence_id : int
            unique sequence_id of a sequence that already exists in the database
        folder_id : int
            unique folder_id of a folder that already esists in the database

        Returns
        -------
        str
        """
        return f"INSERT INTO Contains (folder, sequence) VALUES ({folder_id}, {sequence_id})"


    def get_folder_data(self, folder_id):
        """Returns an SQL query for the folder's data, including display name,
        and owner.
        
        Parameters
        ----------
        folder_id : int
            unique id of a folder that already exists in the database

        Returns
        -------
        str
            returns an SQL query that gets the folder name and its owner's email 
        """
        return f"SELECT display_name as folder_name, owner as user_email FROM Folders WHERE folder_id  = {folder_id}"

    def get_user_data(self, email):
        """Returns an SQL query for the user's data, including display name,
        sequences, and folders.
        
        Parameters
        ----------
        email : str
            email of a user that already exists in the database

        Returns
        -------
        str
            returns an SQL query that gets the username, folder id, folder name,
            sequence id, sequence name of every sequence created by the user
        """
        return f"""
        SELECT Users.display_name as username, Folders.folder_id as folder_id,
        Folders.display_name as folder_name, Sequences.sequence_id as sequence_id,
        Sequences.display_name as sequence_name 
        FROM Users, Folders, Sequences, Contains 
        WHERE Users.email = '{email}' AND Folders.owner = '{email}'
        AND Contains.folder = Folders.folder_id
        AND Contains.sequence = Sequences.sequence_id"""

    def update_sequence_data(self, sequence_id, fields_to_values):
        """Returns an SQL query for the updating sequence (sequence_id)'s data using a dict of (column name, value) pairs

        Parameters
        ----------
        sequence_id : int
            unique id of the record existing in the database to be updated.
        fields_to_values : dict
            a dictionary mapping column names in Sequences table to updated
            values for record with id sequence_id. 
            contains columns in Folders table other than folder_id and owner.
            columns available for update are: instrument, bpm, creator,
            display_name, filename, and created. 
            the new value of instrument has to exist in the table Instrument
            column instrument_id.

        Returns
        -------
        str
        """
        str_typed_columns = set(['display_name', 'filename', 'creator'])
        updated_col_to_val = [f"{f} = '{v}'" if f in str_typed_columns else f"{f} = {v}"for f,v in fields_to_values.items()]
        updated_col_to_val_str = ", ".join(updated_col_to_val)
        return f"UPDATE Sequences SET {updated_col_to_val_str} WHERE sequence_id = {sequence_id}"

    def update_folder_data(self, folder_id, fields_to_values):
        """Returns an SQL query for the updating folder (folder_id)'s data using a dict of (column name, value) pairs

        Parameters
        ----------
        folder_id : int
        fields_to_values : dict
            a dictionary mapping column names in Sequences table to updated
            values for record with id sequence_id.
            columns available for update are: display_name and owner.
            the new value of owner has to exist in table Users, column email.

        Returns
        -------
        str
        """
        str_typed_columns = set(['display_name', 'owner'])
        updated_col_to_val = [f"{f} = '{v}'" if f in str_typed_columns else f"{f} = {v}"for f,v in fields_to_values.items()]
        updated_col_to_val_str = ", ".join(updated_col_to_val)
        return f"UPDATE Folders SET {updated_col_to_val_str} WHERE folder_id = {folder_id}"

client = Client()
