import os

from flask_mysqldb import MySQL
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
        self.user = user
        self.password = password
        self.db_name = db_name



    "returns an SQL query for creating a new user"
    def create_user(email, display_name):
        return f"INSERT INTO User (email, display_name) VALUES ('{email}', '{display_name}')"



"""
# Establishing the connection 
client = pymysql.connect(host=host, user=user, database=database)
# Creating the cursor object 
cursor = connection.cursor()
# Executing the SQL queries 
query = "SELECT * FROM User"
cursor.execute(query)
# Printing the results
results = cursor.fetchall()
for row in results:
   print(row)
# closing the connection
cursor.close()
connection.close()

"""
