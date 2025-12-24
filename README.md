# Hairlytics – Intelligent Hair Analysis
Hairlytics is an web application that combines machine learning, NLP, and a modern healthcare-inspired interface to provide personalized hair-care insights and product recommendations.

---

## Key Features

### Chatbot — Dr. HairBot

* Context-Aware: Remembers scalp type, hair texture, and concerns throughout the conversation
* Stateful Memory: Avoids repetitive questions by intelligently filling missing details
* Natural Language Understanding: Powered by a Python NLP microservice (TF-IDF + ML Classifiers)
* Hybrid Fallback Logic: Keyword extraction ensures accuracy when ML confidence is low

---

### Professional Analysis Dashboard

* Medical-Grade UI: Clean slate & blue color palette designed for trust and clarity
* Comprehensive Assessment:

  * Scalp condition (Oily / Dry / Normal)
  * Hair structure
  * Concerns (Dandruff, Frizz, Hair Fall)
* Smart Product Recommendations: Ranking algorithm scores products based on a composite user profile

---

### Modern & Secure Architecture

* JWT Authentication with Bcrypt password encryption
* Dark Mode Support using Tailwind CSS `dark:` variant
* Fully Responsive Design with a mobile-first approach

---

## Technology Stack

### Frontend

* React 18 (Vite)
* Tailwind CSS v4 (Native CSS Configuration)
* PostCSS
* Framer Motion – animations & transitions
* Lucide React – icons
* React Context API – state management

---

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose ORM
* JWT Authentication
* bcryptjs – password hashing
* Axios – API communication

---

### AI / NLP Microservice

* Python 3.12+
* Flask
* Scikit-learn
* Joblib
* NumPy
* TF-IDF Vectorization
* Multi-class Machine Learning Classification

---

## Installation & Setup

### Prerequisites

* Node.js v18+
* Python v3.10+
* MongoDB (running locally on port 27017)

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HAPR-NLP
```

---

### 2. Backend Setup (Node.js)

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/haircare_db
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

---

### 3. AI Microservice Setup (Python)

Open a new terminal inside `backend/`:

```bash
pip install flask flask-cors scikit-learn joblib numpy
python model_service.py
```

---

### 4. Frontend Setup

Open a third terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## Usage Guide

* Start interaction using the Floating Chatbot (bottom-right) 
* Sign Up / Login to save your analysis profile
* Analyze hair data via the Dashboard (`/analysis`)
* Explore UI pages like Reviews and Contact

---

## Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

Inspiration for this project came from the need for efficient task management tools.
