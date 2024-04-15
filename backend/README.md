# Echo API User Guide

This document outlines the parameters, outputs, effects, and intended usage of all routes made available by the Echo backend (Flask API).

## /user/\<email>

* **Function**: get user data
* **REST method**: GET
* **Parameters**
    * **email** - the email of the user corresponding to their DB entry's primary key
* **Returns**

A JSON object containing the user's display name, folder data, and sequence data. Note that to retrieve the actual audio recording affiliated with each sequence, the `get-recording-file` route must be called for an individual sequence (using the sequence ID) as a single route cannot include several MP3 files.

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