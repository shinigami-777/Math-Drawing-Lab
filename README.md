# Math Drawing Lab
An AI tool to make drawings by plotting math equations.

## How to setup and use

Have a system with python, python-pip, nodejs and npm installed.\
You will also need a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

Now clone the project and follow these steps:

### Backend

1. Navigate to the backend directory and create and activate a Python virtual environment.
```
cd backend
python -m venv venv
source venv/bin/activate
```

2. Install the required dependencies:
```
pip install fastapi uvicorn pydantic numpy google-genai tenacity
```

3. Set your Gemini API key as an environment variable and start the server.
```
export GEMINI_API_KEY="your-api-key-here"
uvicorn app.main:app --reload
```

The backend will be running locally at `http://127.0.0.1:8000`.

### Frontend

1. Open a new terminal window and navigate to the frontend directory.
```
cd frontend
```

2. Install the dependencies
```
npm install
```

3. Start the Vite server
```
npm run dev
```

If all goes well, you should be able to access the application at `http://localhost:5173`.

