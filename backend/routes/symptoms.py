
from flask import Blueprint, request, jsonify
import datetime
import uuid
from models.data_store import symptoms_data
from utils.analysis import analyze_symptoms

# Create a blueprint for symptom-related routes
symptoms_routes = Blueprint('symptoms', __name__)

@symptoms_routes.route('/api/symptoms', methods=['POST'])
def submit_symptoms():
    data = request.json
    symptoms = data.get('symptoms', {})
    notes = data.get('notes', '')
    
    # Process with your ML model
    analysis_result = analyze_symptoms(symptoms, notes)
    
    # Save to our simulated database
    entry = {
        "id": str(uuid.uuid4()),
        "symptoms": symptoms,
        "notes": notes,
        "timestamp": datetime.datetime.now().isoformat(),
        "analysis": analysis_result
    }
    symptoms_data.append(entry)
    
    return jsonify({
        "success": True,
        "message": "Symptoms analyzed successfully",
        "analysis": analysis_result
    })
