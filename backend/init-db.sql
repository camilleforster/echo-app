CREATE DATABASE echo_db;

-- TODO see if we can use variables for string lengths

CREATE TABLE IF NOT EXISTS Users (
    email VARCHAR(255) PRIMARY KEY, -- maximum length for email and display_name to handle any future allowances in UW system for student accounts
    display_name VARCHAR(255),
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Instruments (
    instrument_id INT AUTO_INCREMENT PRIMARY KEY,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    display_name VARCHAR(32) -- can be shortened or lengthened in the future
);

CREATE TABLE IF NOT EXISTS Sequences (
    sequence_id INT AUTO_INCREMENT PRIMARY KEY,
    instrument INT,
    bpm INT,  -- TODO possibly remove/just store in files
    creator VARCHAR(255),
    display_name VARCHAR(255), -- can be shortened in the future
    filename VARCHAR(255),
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instrument) REFERENCES Instruments(instrument_id),
    FOREIGN KEY (creator) REFERENCES Users(email)
);

CREATE TABLE IF NOT EXISTS Folders (
    folder_id INT AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(255), -- can be shortened in the future
    owner VARCHAR(255),
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner) REFERENCES Users(email)
);

CREATE TABLE IF NOT EXISTS Contains (
    folder INT,
    sequence INT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (folder) REFERENCES Folders(folder_id),
    FOREIGN KEY (sequence) REFERENCES Sequences(sequence_id)
);
