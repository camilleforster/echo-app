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


    def create_folder(self, folder_name, username):
        """Returns an SQL query for creating a new folder with name folder_name for user username.

        Parameters
        ----------
        folder_name : str
        username : str
        
        Returns
        -------
        str
        """
        return f"INSERT INTO Folder (display_name, owner) VALUES ('{folder_name}', '{username}')"


