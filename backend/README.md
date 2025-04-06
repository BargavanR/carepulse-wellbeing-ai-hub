
# CarePulse Flask Backend

This is the Python Flask backend for the CarePulse health monitoring application. It provides API endpoints for the React frontend and integrates with machine learning models for health analysis.

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
   python main.py
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
2. Import your model files or libraries in `main.py`
3. Replace the placeholder `analyze_symptoms` function with your actual ML code
4. Add additional ML functions as needed

## Production Deployment

For production, consider:

1. Using a proper WSGI server (Gunicorn is included in requirements.txt)
2. Setting environment variables for configuration
3. Implementing proper authentication
4. Using a production database instead of in-memory storage
