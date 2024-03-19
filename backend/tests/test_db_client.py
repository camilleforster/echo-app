import os
import pytest

import db_client



@pytest.fixture
def host_name():
    return db_client.DB_HOST

@pytest.fixture
def port():
    return db_client.DB_PORT

@pytest.fixture
def name():
    return db_client.DB_NAME

@pytest.fixture
def user():
    return db_client.DB_USER

@pytest.fixture
def password():
    return db_client.DB_PASSWORD

@pytest.fixture
def client():
    return db_client.Client()


"""
A test for the Client constructor
"""
def test_init(client, host_name, port, name, user, password):
    assert isinstance(client, db_client.Client)
    assert client.db_host == host_name
    assert client.db_port == port    
    assert client.db_name == name
    assert client.user == user
    assert client.password == password


@pytest.mark.parametrize(('email', 'username'), [
	("example@gmail.com", "username1"),
	("example2@gmail.com", "username2")
	])
def test_create_user(client, email, username):
	assert client.create_user(email, username) == f"INSERT INTO Users (email, display_name) VALUES ('{email}', '{username}'); SELECT LAST_INSERT_ID() as id;"


@pytest.mark.parametrize(('email', 'folder_name'), [
	("email1", "folder1"),
	("email2", "folder2")
	])
def test_create_folder(client, email, folder_name):
	assert client.create_folder(email, folder_name) == f"INSERT INTO Folders (display_name, owner) VALUES ('{folder_name}', '{email}'); SELECT LAST_INSERT_ID() as id;"



@pytest.mark.parametrize(('email', 'instrument_id', 'bpm', 'name', 'filename'), [
    ("email1@example.com", 1, 10, 'name1', 'filename1'),
    ("email2@example.com", 2, 20, 'name2', 'filename2')
    ])
def test_create_sequence(client, email, instrument_id, bpm, name, filename):
    assert client.create_sequence(email, instrument_id, bpm, name, filename) == f"INSERT INTO Sequences (instrument, bpm, creator, display_name, filename) VALUES ({instrument_id}, {bpm}, '{email}', '{name}', '{filename}'); SELECT LAST_INSERT_ID() as id;"


@pytest.mark.parametrize(('folder_id', 'sequence_id'), [
    (1, 2),
    (3, 4)
    ])
def test_add_sequence_to_folder(client, folder_id, sequence_id):
    assert client.add_sequence_to_folder(folder_id, sequence_id) == f"INSERT INTO Contains (folder, sequence) VALUES ({folder_id}, {sequence_id})"


@pytest.mark.parametrize(('folder_id',), [
    (1,),
    (3,)
    ])
def test_get_folder_data(client, folder_id):
    assert client.get_folder_data(folder_id) == f"SELECT display_name as folder_name, owner as user_email FROM Folders WHERE folder_id  = {folder_id}"


@pytest.mark.parametrize(('email',), [
    ("email1@example.com",),
    ("email2@example.com",)
    ])
def test_get_user_data(client, email):
    assert client.get_user_data(email) == f"""
        SELECT Users.display_name as username, Folders.folder_id as folder_id,
        Folders.display_name as folder_name, Sequences.sequence_id as sequence_id,
        Sequences.display_name as sequence_name 
        FROM Users, Folders, Sequences, Contains 
        WHERE Users.email = '{email}' AND Folders.owner = '{email}'
        AND Contains.folder = Folders.folder_id
        AND Contains.sequence = Sequences.sequence_id"""



@pytest.mark.parametrize(('sequence_id', 'fields_to_values', 'string'), [
    (1, {}, ""),
    (2, {}, ""),
    (1, {'instrument': 1}, "instrument = 1"),    
    (1, {'instrument': 1, 'bpm': 2}, "instrument = 1, bpm = 2"),    
    (1, {'instrument': 1, 'bpm': 2, 'creator':'email1@example.com'}, "instrument = 1, bpm = 2, creator = 'email1@example.com'"),    
    ])
def test_update_sequence_data(client, sequence_id, fields_to_values, string):
    assert client.update_sequence_data(sequence_id, fields_to_values) == f"UPDATE Sequences SET {string} WHERE sequence_id = {sequence_id}"


@pytest.mark.parametrize(('folder_id', 'fields_to_values', 'string'), [
    (1, {}, ""),
    (2, {}, ""),
    (1, {'display_name': 'folder1'}, "display_name = 'folder1'"),    
    (1, {'display_name': 'folder1', 'owner':'email1@example.com'}, "display_name = 'folder1', owner = 'email1@example.com'"),    
    ])
def test_update_folder_data(client, folder_id, fields_to_values, string):
    assert client.update_folder_data(folder_id, fields_to_values) == f"UPDATE Folders SET {string} WHERE folder_id = {folder_id}"




