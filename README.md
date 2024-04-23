# Echo - Voice to Tabs

## Getting Started

### Frontend

#### Setup

```
cd frontend
npm install
```

#### Testing

Download the Expo Go app from the [iOS App Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US&pli=1).

Then run:

```
cd frontend
npm run start
```

You can now scan the QR code in the terminal to test the app on mobile.

#### Formatting

To ensure the files follow TSDoc and Prettier standards, run

```
npm run format
npm run lint
```

#### Unit Testing

```
npm run test
```

### Backend

#### Setup

Make sure you have a virtual environment in place. You will also need `portaudio` installed to install the package `pyaudio`, and `ffmpeg` to run the package `pydub`. You will need a mysql client installed on ypur computer and the following vars defined in your env: MYSQLCLIENT_CFLAGS and MYSQLCLIENT_LDFLAGS. 

##### Windows

```
cd backend
python3 -m venv venv  # create virtual environment
venv\Scripts\activate  # activate environment
pip install -r requirements.txt  # install necessary packages
```

##### macOS/Linux

Python 3 has built-in support for creating virtual environments. You can use any other way to create a virtual environment. After the initial setup, you will only need to activate the environment you initially created.

```
cd backend
python3 -m venv venv  # create virtual environment
source venv/bin/activate  # activate environment
pip install -r requirements.txt  # install necessary packages
```

### Running

##### Windows
```
cd backend
venv\Scripts\activate  # activate environment
python3 app.py  # temporary API launch; can be run with more specific Flask settings
```

##### macOS/Linux

```
cd backend
source venv/bin/activate  # activate environment
python3 app.py  # temporary API launch; can be run with more specific Flask settings
```

#### Testing
To run the unit tests, use the following command: 
```
cd backend
python -m pytest -q
```
Remove the `-q` option for a more detailed version of the testing output and use the `-v` option for the most verbose output.

To generate an output file of the result of the test file:
```
python -m pytest --junitxml="test_result.xml"
```