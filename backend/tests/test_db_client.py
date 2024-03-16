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
	assert client.create_user(email, username) == f"INSERT INTO User (email, display_name) VALUES ('{email}', '{username}')"



@pytest.mark.parametrize(('email', 'folder_name'), [
	("email1", "folder1"),
	("email2", "folder2")
	])
def test_create_folder(client, email, folder_name):
	assert client.create_folder(email, folder_name) == f"INSERT INTO Folder (display_name, owner) VALUES ('{folder_name}', '{email}')"


@pytest.mark.parametrize(('email', 'instrument_id', 'bpm', 'name', 'filename', 'datetime'), [
    ("email1", 1, 10, 'name1', 'filename1', 'datetime1'),
    ("email2", 2, 20, 'name2', 'filename2', 'datetime2')
    ])
def test_create_sequence(client, email, instrument_id, bpm, name, filename, datetime):
    assert client.create_sequence(email, instrument_id, bpm, name, filename, datetime) == f"INSERT INTO Sequence (instrument, bpm, creator, display_name, filename, created) VALUES ('{instrument_id}', '{bpm}, {email}, {name}, {filename}, {datetime}')"





















