
from flask import Blueprint, jsonify
import datetime

# Create a blueprint for health check routes
health_routes = Blueprint('health', __name__)

@health_routes.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint to verify the API is running"""
    return jsonify({
        "status": "healthy",
        "message": "CarePulse Flask API is running correctly",
        "timestamp": datetime.datetime.now().isoformat()
    })
