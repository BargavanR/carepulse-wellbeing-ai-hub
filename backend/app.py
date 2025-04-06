
from flask import Flask
from flask_cors import CORS
import os

# Import route handlers
from routes.symptoms import symptoms_routes
from routes.predictions import predictions_routes
from routes.wearables import wearables_routes
from routes.alerts import alerts_routes
from routes.reports import reports_routes
from routes.health import health_routes

def create_app():
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Enable CORS for all routes to allow requests from the React frontend
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Register all blueprints/routes
    app.register_blueprint(symptoms_routes)
    app.register_blueprint(predictions_routes)
    app.register_blueprint(wearables_routes)
    app.register_blueprint(alerts_routes)
    app.register_blueprint(reports_routes)
    app.register_blueprint(health_routes)
    
    return app

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app = create_app()
    # In production, you would use a proper WSGI server
    # For development, the Flask development server is sufficient
    app.run(host='0.0.0.0', port=port, debug=True)
