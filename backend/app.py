from flask import Flask, request, jsonify, send_file
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load("model/calibrated_model.pkl")
explainer = joblib.load("model/shap_explainer.pkl")
feature_columns = joblib.load("model/feature_columns.pkl")


latest_result = {}

def get_risk_level(prob):
    if prob >= 0.6:
        return "high"
    elif prob >= 0.35:
        return "medium"
    else:
        return "low"

def get_recommendations_rule_based(shap_values, risk_level):
    recommendations = []

    # Example rules
    if risk_level == "high":
        recommendations.append("Schedule a comprehensive medical checkup ASAP.")
    
    if shap_values.get("smoking", 0) > 0.3:
        recommendations.append("Consider quitting smoking to improve lung health.")
    
    if shap_values.get("exercise", 0) < -0.2:
        recommendations.append("Increase physical activity and breathing exercises.")
    
    if shap_values.get("cough", 0) > 0.4:
        recommendations.append("Consult a pulmonologist for persistent cough.")
    
    if shap_values.get("weight", 0) < -0.1:
        recommendations.append("Maintain a healthy weight with balanced nutrition.")

    if not recommendations:
        recommendations.append("Maintain a healthy lifestyle and regular checkups.")

    return recommendations

@app.route('/predict', methods=['POST'])
def predict():
    global latest_result
    data = request.get_json()
    features = [
        data.get(col, 0) for col in feature_columns
    ]
    X_df = pd.DataFrame([features], columns=feature_columns)

    prediction = model.predict(X_df)[0]
    probability = model.predict_proba(X_df)[0][1]
    risk = get_risk_level(probability)

    # SHAP explanation
    shap_values = explainer(X_df)
    shap_vals_for_class_1 = shap_values.values[0][:, 1]  
    shap_output = dict(zip(feature_columns, shap_vals_for_class_1.tolist()))

    # Save latest result to serve dashboard
    latest_result = {
        "name": data.get("Name", "Unknown"),
        "prediction": int(prediction),
        "probability": round(probability, 3),
        "risk_level": risk,
        "shap_values": shap_output,
        "recommendations": [
            "Avoid smoking or exposure to pollutants",
            "Stay hydrated and eat a balanced diet",
            "Use an air purifier indoors if possible"
        ]
    }

    return jsonify(latest_result)

@app.route('/latest-prediction', methods=['GET'])
def latest_prediction():
    if not latest_result:
        return jsonify({"error": "No prediction data available yet"}), 404
    return jsonify(latest_result)

@app.route('/recommendations', methods=['POST'])
def recommendations():
    data = request.json
    shap_values = data.get("shap_values", {})
    risk_level = data.get("risk_level", "medium")

    recs = get_recommendations_rule_based(shap_values, risk_level)

    return jsonify({"recommendations": recs})

@app.route('/shap-plot', methods=['GET'])
def shap_plot():
    try:
        return send_file("shap_plot.png", mimetype='image/png')
    except FileNotFoundError:
        return jsonify({"error": "SHAP plot not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
