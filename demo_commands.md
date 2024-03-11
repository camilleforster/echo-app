# Commands to launch walking skeleton

## Launch frontend

```
ssh -L 8081:localhost:8081 -L 5000:localhost:5000 <cslogin>@cs506-team-23.cs.wisc.edu
cd private/music-transcription-from-voice-app/frontend
npm start
```

Then, visit localhost:8081 in browser.

## Launch backend

You will need a `.env` file in the `backend` directory containing the `MYSQL_ROOT_PASSWORD` variable.

```
ssh -L 8081:localhost:8081 -L 5000:localhost:5000 <cslogin>@cs506-team-23.cs.wisc.edu
cd private/music-transcription-from-voice-app/backend
source venv/bin/activate
python3 app.py
```

## Launch database

You will need the root password for the database.

```
ssh -L 8081:localhost:8081 -L 5000:localhost:5000 <cslogin>@cs506-team-23.cs.wisc.edu
mysql -h localhost -P 53346 --protocol=TCP -u root -p
```