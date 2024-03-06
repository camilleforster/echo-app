CREATE DATABASE echo_db;

-- TODO see if we can use variables for string lengths

CREATE TABLE IF NOT EXISTS User (
    email VARCHAR(255) PRIMARY KEY, -- maximum length for email and display_name to handle any future allowances in UW system for student accounts
    display_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Instrument (
    instrument_id INT AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(32) -- can be shortened or lengthened in the future
);

CREATE TABLE IF NOT EXISTS Sequence (
    sequence_id INT AUTO_INCREMENT PRIMARY KEY,
    instrument INT,
    bpm INT,  -- TODO possibly remove/just store in files
    creator VARCHAR(255),
    display_name VARCHAR(255), -- can be shortened in the future
    filename VARCHAR(255),
    created DATETIME,
    FOREIGN KEY (instrument) REFERENCES Instrument(instrument_id),
    FOREIGN KEY (creator) REFERENCES User(email)
);

CREATE TABLE IF NOT EXISTS Folder (
    folder_id INT AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(255), -- can be shortened in the future
    owner VARCHAR(255),
    FOREIGN KEY (owner) REFERENCES User(email)
);

CREATE TABLE IF NOT EXISTS Contains (
    folder INT,
    sequence INT,
    FOREIGN KEY (folder) REFERENCES Folder(folder_id),
    FOREIGN KEY (sequence) REFERENCES Sequence(sequence_id)
);
