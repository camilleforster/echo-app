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



@pytest.mark.parametrize(('folder_name', 'username'), [
	("folder1", "username1"),
	("folder2", "username2")
	])
def test_create_folder(client, folder_name, username):
	assert client.create_folder(folder_name, username) == f"INSERT INTO Folder (display_name, owner) VALUES ('{folder_name}', '{username}')"




















