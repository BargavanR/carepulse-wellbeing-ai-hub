
# CarePulse Flask Backend

This is the Python Flask backend for the CarePulse health monitoring application. It provides API endpoints for the React frontend and integrates with machine learning models for health analysis.

## Project Structure

```
backend/
├── app.py                 # Main application entry point
├── models/                # Data models and simulated database
│   ├── __init__.py
│   └── data_store.py      # In-memory data storage
├── routes/                # API route handlers
│   ├── __init__.py
│   ├── alerts.py          # Health alerts endpoints
│   ├── health.py          # API health check
│   ├── predictions.py     # Health predictions
│   ├── reports.py         # Health reports
│   ├── symptoms.py        # Symptom analysis
│   └── wearables.py       # Wearable device data
└── utils/                 # Utility functions
    ├── __init__.py
    └── analysis.py        # Health data analysis functions
```

## Setup and Installation

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python app.py
   ```

The API will be available at `http://localhost:5000`.

## API Endpoints

- `POST /api/symptoms` - Submit symptom data for analysis
- `GET /api/predictions/:userId` - Get health predictions for a user
- `POST /api/wearables` - Submit wearable device data
- `GET /api/alerts/:userId` - Get health alerts for a user
- `POST /api/reports/generate` - Generate a health report

## Integrating Your ML Models

To integrate your machine learning models:

1. Uncomment the ML libraries in `requirements.txt`
2. Modify the analysis functions in `utils/analysis.py` with your actual ML code
3. Expand the data models in `models/data_store.py` as needed
4. Add additional ML functions as needed

## Production Deployment

For production, consider:

1. Using a proper WSGI server (Gunicorn is included in requirements.txt)
2. Setting environment variables for configuration
3. Implementing proper authentication
4. Using a production database instead of in-memory storage
