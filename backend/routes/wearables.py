
from flask import Blueprint, request, jsonify
import datetime
import uuid
from models.data_store import wearable_data

# Create a blueprint for wearable-related routes
wearables_routes = Blueprint('wearables', __name__)

@wearables_routes.route('/api/wearables', methods=['POST'])
def submit_wearable_data():
    data = request.json
    
    # Process the wearable data (in a real app, this would feed into your ML models)
    wearable_data.append({
        "id": str(uuid.uuid4()),
        "data": data,
        "timestamp": datetime.datetime.now().isoformat()
    })
    
    return jsonify({
        "success": True,
        "message": "Wearable data received and processed"
    })
