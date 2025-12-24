# backend/model_service.py
import joblib
from flask import Flask, request, jsonify

app = Flask(__name__)
vectorizer = joblib.load("models/tfidf_vectorizer.pkl")
model_dict = joblib.load("models/hair_model.pkl")

clf_scalp = model_dict["clf_scalp"]
clf_hair = model_dict["clf_hair"]
clf_concerns = model_dict["clf_concerns"]
concern_list = model_dict["concern_list"]

# Keyword dictionaries for hybrid fallback
SCALP_KEYWORDS = {
    "oily": ["oily", "greasy"],
    "dry": ["dry", "itchy", "flaky"],
    "sensitive": ["sensitive", "irritated"]
}

HAIR_KEYWORDS = {
    "curly": ["curly", "wavy"],
    "straight": ["straight", "smooth"],
    "coily": ["coily", "kinky"],
    "colored": ["colored", "dyed", "highlighted"]
}

CONCERN_KEYWORDS = ["dandruff", "frizz", "dryness", "hair fall", "split ends", "heat damage", "itchy scalp", "greasy"]

@app.route("/predict", methods=["POST"])
def predict():
    text = request.json.get("text", "").lower().strip()
    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Vectorize input
    X = vectorizer.transform([text])

    # ML model predictions
    # We treat 'normal' as the background/null class for these models usually
    pred_scalp = clf_scalp.predict(X)[0]
    pred_hair = clf_hair.predict(X)[0]
    conc_preds = clf_concerns.predict(X)[0]
    
    concerns = [c for c, v in zip(concern_list, conc_preds) if v == 1]

    # --- Result Variables (Default to None implies "Not Detected") ---
    final_scalp = None
    final_hair = None

    # --- Hybrid fallback for scalp ---
    # If model says specific class (not normal), trust it. Or if keyword found.
    if pred_scalp != "normal":
        final_scalp = pred_scalp
    
    # Keyword override/check
    for label, keywords in SCALP_KEYWORDS.items():
        if any(k in text for k in keywords):
            final_scalp = label
            break
    
    # Explicit check for "normal" keyword if model failed to pick specific
    if final_scalp is None:
        if "normal" in text:
            final_scalp = "normal"

    # --- Hybrid fallback for hair ---
    if pred_hair != "normal":
        final_hair = pred_hair

    for label, keywords in HAIR_KEYWORDS.items():
        if any(k in text for k in keywords):
            final_hair = label
            break
            
    # Explicit check for "normal" keyword
    if final_hair is None:
        if "normal" in text and "scalp" not in text: # weak heuristic
             # 'normal hair' usually implies hair type
             final_hair = "normal"

    # --- Hybrid fallback for concerns ---
    if not concerns:
        for word in CONCERN_KEYWORDS:
            if word in text:
                concerns.append(word)

    return jsonify({
        "scalp_type": final_scalp, # can be null
        "hair_type": final_hair,   # can be null
        "concerns": concerns
    })

# 🔹 Start server
if __name__ == "__main__":
    from flask_cors import CORS
    CORS(app)
    app.run(host="127.0.0.1", port=6000, debug=True)
