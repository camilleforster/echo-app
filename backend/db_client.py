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
    def __init__(self, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT, db_name=DB_NAME):
        self.db_host = host
        self.db_port = port
        self.db_name = db_name
        self.user = user
        self.password = password



    "returns an SQL query for creating a new user"
    def create_user(self, email, display_name):
        return f"INSERT INTO User (email, display_name) VALUES ('{email}', '{display_name}')"


    def create_folder(self, display_name, owner):
        return f"INSERT INTO Folder (display_name, owner) VALUES ('{display_name}', '{owner}')"


