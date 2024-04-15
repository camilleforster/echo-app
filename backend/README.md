# Echo API User Guide

This document outlines the parameters, outputs, effects, and intended usage of all routes made available by the Echo backend (Flask API).

## User data

### /create-user/\<email>/\<username>

* **Function**: create a new user
* **REST Method**: `POST`
* **Parameters** (URL-based)
    * **email** (string) - the user's email, which will serve as the user's unique DB identifier and a parameter for other API routes when the user in question is relevant
    * **username** (string) - the user's display name (may go unused, but stored currently in case used on welcome pages, etc. in the future)
* **Returns**: a JSON confirmation

### /get-user-data/\<email>

* **Function**: get user data
* **REST method**: `GET`
* **Parameters** (URI-based)
    * **email** (string) - the email of the user corresponding to their DB entry's primary key
* **Returns**: a JSON object containing the user's display name, folder data, and sequence data. Note that to retrieve the actual audio recording affiliated with each sequence, the `get-recording-file` route must be called for an individual sequence (using the sequence ID) as a single route cannot include several MP3 files.

```
{
    "username": # the user's display name,
    "folders": [
        {
            "id": # folder ID,
            "display_name": # folder display name,
            "created": # created timestamp,
            "sequences": # an array of the sequence IDs contained in the folder
        }
        ...
    ],
    "sequences": [
        {
            "id": # sequence ID,
            "bpm": # sequence BPM,
            "display_name": # sequence display name,
            "created": # created timestamp,
            "notes": # the notes of the sequence, formatted sequentially as a string
        }
        ...
    ]
}
```

### /get-recording-file/\<int:sequence_id>

* **Function**: get recording file for a sequence
* **REST Method**: `GET`
* **Parameters** (URI-based)
    * **sequence_id** (int) - the unique identifier for a particular audio sequence
* **Returns**: the sequence's original recording as an MP3, for playback purposes

## Audio processing and sequences

### /process-recording

Currently under construction.

* **Function**: identify a recording's associated note sequence and add it to the database
* **REST Method**: `POST`
* **Parameters** (web form-based)
    * **file** (.mp3 file) - an MP3 file of the vocal recording of the audio sequence 
    * **display_name** (string) - the sequence's display name indicated by the user
    * **instrument** (int) - the ID of the instrument associated with default playback (this can just be set to 0 if we do not plan on implementing this functionality)
* **Returns**: a JSON response containing the processed sequence data

```
{
    "id": # sequence ID,
    "bpm": # sequence BPM,
    "display_name": # sequence display name,
    "created": # created timestamp,
    "notes": # the notes of the sequence, formatted sequentially as a string
}
```

### /update-sequence-data/\<int:sequence_id>/\<updated_sequence>

Currently under construction.

* **Function**: update the note data associated with an audio sequence, as indicated by the user
* **REST Method**: `PUT`
* **Parameters** (URL-based)
    * **sequence_id** (int) - the unique identifier for a particular audio sequence
    * **updated_sequence** (string) - the new note data of the sequence, formatted sequentially as a string
* **Returns**: a JSON confirmation

### /rename-sequence/\<int:sequence_id>/\<display_name>

* **Function**: rename a sequence
* **REST Method**: `PUT`
* **Parameters** (URL-based)
    * **sequence_id** (int) - the unique identifier for a particular audio sequence
    * **display_name** (string) - the new name of the sequence
* **Returns**: a JSON confirmation

### /delete-sequence/\<int:sequence_id>

* **Function**: delete a sequence
* **REST Method**: `DELETE`
* **Parameters** (URL-based)
    * **sequence_id** (int) - the unique identifier for the particular sequence
* **Returns**: a JSON confirmation

## Folders

### /create-folder/\<display_name>/\<owner>

* **Function**: create an empty folder owned by a particular user
* **REST Methods**: `POST`
* **Parameters** (URL-based)
    * **display_name** (string) - the display name for the folder
    * **owner** (string) - the email of the user who created the folder
* **Returns**: a JSON response containing the folder ID

```
{
    "folder_id": # folder_id
}
```

### /rename-folder/\<int:folder_id>/\<display_name>

* **Function**: rename a folder
* **REST Method**: `PUT`
* **Parameters** (URL-based)
    * **folder_id** (int) - the unique identifier for a particular folder
    * **display_name** (string) - the new name of the folder
* **Returns**: a JSON confirmation

### /update-folder-contents

The frontend team has requested that this route be replaced with `add` and `delete` routes. This is currently in the backlog; for now, use this route.

* **Function**: update the contents of a folder
* **REST Method**: `PUT`
* **Parameters** (JSON-based)
    * **folder_id** (int) - the unique identifier for the particular folder
    * **sequences** (int[]) - an array of the sequences now contained in the folder
* **Returns**: a JSON confirmation

### /delete-folder/\<int:folder_id>

* **Function**: delete a folder
* **REST Method**: `DELETE`
* **Parameters** (URL-based)
    * **folder_id** (int) - the unique identifier for the particular folder
* **Returns**: a JSON confirmation