import os

from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv()) # read local .env file


# Creating a connection object.
DB_HOST = '127.0.0.1'
DB_PORT = '53346'
DB_NAME = 'echo_db'

DB_USER = 'root' # create more users
DB_PASSWORD = os.environ['MYSQL_PASSWORD']



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
    
    create_sequence(email, instrument_id, bpm, name, filename, datetime)
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

        Parameters
        ----------
        email : str
        username : str
        
        Returns
        -------
        str
        """
        return f"INSERT INTO User (email, display_name) VALUES ('{email}', '{username}')"


    def create_folder(self, email, folder_name):
        """Returns an SQL query for creating a new folder with name folder_name for user username.

        Parameters
        ----------
        email : str
        folder_name : str
        
        Returns
        -------
        str
        """
        return f"INSERT INTO Folder (display_name, owner) VALUES ('{folder_name}', '{email}')"

    def create_sequence(self, email, instrument_id, bpm, name, filename, datetime):
        """Returns an SQL query for creating a new recording with name 

        Parameters
        ----------
        email : str
        username : str
        instrument_id : int
        bpm : int
        instrument_name : str
        filename : str
        datetime : str

        Returns
        -------
        str
        """
        return f"INSERT INTO Sequence (instrument, bpm, creator, display_name, filename, created) VALUES ('{instrument_id}', '{bpm}, {email}, {name}, {filename}, {datetime}')"

    def add_sequence_to_folder(self, sequence_id, folder_id):
        pass

    def get_user_data(self, email):
        """Returns an SQL query for the user's data, including display name, sequences, and folders.
        
        Parameters
        ----------
        email : str

        Returns
        -------
        str
        """
        return f"SELECT User.display_name, Folder.folder_id, Folder.display_name, Sequence.display_name, Sequence.sequence_id FROM User, Folder, Sequence, Contains  WHERE User.email == {email} AND Folder.owner == {email} AND Contains.folder == Folder.folder_id"

    def update_sequence_data(self, sequence_id, fields_to_values):
        """Returns an SQL query for the updating sequence (sequence_id)'s data using a dict of (column name, value) pairs

        Parameters
        ----------
        sequence_id : int
        fields_to_values : dict

        Returns
        -------
        str
        """
        updated_col_to_val = ", ".join([f"{f} = {v}" for f,v in fields_to_values.items()])
        return f"UPDATE Sequence SET {updated_col_to_val} WHERE sequence_id == {sequence_id}"

    def update_folder_data(self, folder_id, fields_to_values):
        """Returns an SQL query for the updating folder (folder_id)'s data using a dict of (column name, value) pairs

        fields_to_values only contains columns in Folder table other than folder_id and owner

        Parameters
        ----------
        folder_id : int
        fields_to_values : dict

        Returns
        -------
        str
        """
        updated_col_to_val = ", ".join([f"{f} = {v}" for f,v in fields_to_values.items()])
        return f"UPDATE Folder SET {updated_col_to_val} WHERE folder_id == {folder_id}"























