
from flask import Blueprint, request, jsonify
import uuid
from models.data_store import predictions_data

# Create a blueprint for prediction-related routes
predictions_routes = Blueprint('predictions', __name__)

@predictions_routes.route('/api/predictions/<user_id>', methods=['GET'])
def get_health_predictions(user_id):
    # In a real app, you would query your database for this user's predictions
    # Here we'll generate some sample predictions
    
    # Check if we already have predictions for this user
    if user_id not in predictions_data:
        predictions_data[user_id] = [
            {
                "id": str(uuid.uuid4()),
                "title": "Sleep Pattern Analysis",
                "description": "Your sleep patterns suggest mild sleep disruption. Consider adjusting your evening routine.",
                "riskLevel": "low"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Heart Rate Variability",
                "description": "Your heart rate variability is below your typical baseline. This may indicate increased stress.",
                "riskLevel": "moderate"
            }
        ]
    
    return jsonify({
        "success": True,
        "predictions": predictions_data[user_id]
    })
