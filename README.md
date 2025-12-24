# Hairlytics – Intelligent Hair Analysis & AI Consultant

Hairlytics bridges AI, healthcare-inspired UI, and NLP to deliver a smart hair-care consultation experience. It analyzes scalp and hair conditions, remembers user context, and provides intelligent recommendations through an AI-powered assistant.

---

## Overview

Hairlytics is an AI-powered web application that combines machine learning, NLP, and a modern healthcare-inspired interface to provide personalized hair-care insights and product recommendations.

---

## Key Features

### Advanced AI Chatbot — Dr. HairBot
- Context-Aware: Remembers scalp type, hair texture, and concerns throughout the conversation
- Stateful Memory: Avoids repetitive questions by intelligently filling missing details
- Natural Language Understanding: Powered by a Python NLP microservice (TF-IDF + ML Classifiers)
- Hybrid Fallback Logic: Keyword extraction ensures accuracy when ML confidence is low

---

### Professional Analysis Dashboard
- Medical-Grade UI: Clean slate & blue color palette designed for trust and clarity
- Comprehensive Assessment:
  - Scalp condition (Oily / Dry / Normal)
  - Hair structure
  - Concerns (Dandruff, Frizz, Hair Fall)
- Smart Product Recommendations: Ranking algorithm scores products based on a composite user profile

---

### Modern & Secure Architecture
- JWT Authentication with Bcrypt password encryption
- Dark Mode Support using Tailwind CSS `dark:` variant
- Fully Responsive Design with a mobile-first approach

---

## Technology Stack

### Frontend
- React 18 (Vite)
- Tailwind CSS v4 (Native CSS Configuration)
- PostCSS
- Framer Motion – animations & transitions
- Lucide React – icons
- React Context API – state management

---

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ORM
- JWT Authentication
- bcryptjs – password hashing
- Axios – API communication

---

### AI / NLP Microservice
- Python 3.12+
- Flask
- Scikit-learn
- Joblib
- NumPy
- TF-IDF Vectorization
- Multi-class Machine Learning Classification

---

## Installation & Setup

### Prerequisites
- Node.js v18+
- Python v3.10+
- MongoDB (running locally on port 27017)

---

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HAPR-NLP

### 2. Backend Setup (Node.js)
```bash
Copy code
cd backend
npm install
Create a .env file inside backend/:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/haircare_db
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
Copy code
npm run dev
3. AI Microservice Setup (Python)
Open a new terminal inside backend/:

bash
Copy code
pip install flask flask-cors scikit-learn joblib numpy
python model_service.py
4. Frontend Setup
Open a third terminal:

bash
Copy code
cd frontend
npm install
npm run dev
Usage Guide
Start interaction using the Floating Chatbot (bottom-right) or AI Assistant page

Sign Up / Login to save your analysis profile

Analyze hair data via the Dashboard (/analysis)

Explore UI pages like Reviews and Contact
---
## Project Structure
HAPR-NLP/
├── backend/
│   ├── models/            # MongoDB Schemas (User, Product)
│   ├── routes/            # Express Routes (Auth, Chatbot, Products)
│   ├── model_service.py   # Python Flask ML Service
│   └── server.js          # Node Entry Point
│
└── frontend/
    ├── src/
    │   ├── components/    # UI Components
    │   ├── context/       # Global State (Auth, Theme)
    │   ├── pages/         # Pages (Home, Chatbot, Login)
    │   └── assets/        # Images & Icons
    └── index.css          # Tailwind v4 Configuration

---
##Contributing
Contributions are welcome. Please fork the repository and create a pull request with your changes.
---
## License
This project is licensed under the MIT License.
---
## Acknowledgements
Inspiration for this project came from the need for efficient task management tools.


