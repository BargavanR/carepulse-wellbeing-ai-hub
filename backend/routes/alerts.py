
from flask import Blueprint, request, jsonify
import uuid
from models.data_store import alerts_data

# Create a blueprint for alerts-related routes
alerts_routes = Blueprint('alerts', __name__)

@alerts_routes.route('/api/alerts/<user_id>', methods=['GET'])
def get_health_alerts(user_id):
    # Generate alerts for the user based on their data
    # In a real app, these would come from your ML analysis of their health data
    
    # Check if we already have alerts for this user
    if user_id not in alerts_data:
        alerts_data[user_id] = [
            {
                "id": str(uuid.uuid4()),
                "title": "High Stress Detected",
                "description": "Your heart rate variability suggests elevated stress levels. Consider taking a break.",
                "timestamp": "2 hours ago",
                "type": "warning",  # Using a valid type from: 'critical', 'warning', 'info'
                "icon": "heart"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Low Hydration",
                "description": "You may be dehydrated based on your activity levels and water tracking.",
                "timestamp": "5 hours ago",
                "type": "warning",  # Using a valid type from: 'critical', 'warning', 'info'
                "icon": "droplets"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Elevated Body Temperature",
                "description": "Your temperature readings are slightly above your normal baseline.",
                "timestamp": "1 day ago",
                "type": "info",  # Using a valid type from: 'critical', 'warning', 'info'
                "icon": "flame"
            }
        ]
    
    return jsonify({
        "success": True,
        "alerts": alerts_data[user_id]
    })
