Here's a professional and informative `README.md` for your **Lung Disease Prediction Dashboard** project:

---

# 🫁 Lung Disease Prediction Dashboard

This project is a full-stack AI-powered application that predicts the risk of pulmonary (lung) diseases based on lifestyle, environmental, and physiological inputs. It includes a **React frontend**, **Flask backend**, and a **Random Forest model** with calibrated probability outputs and SHAP explainability.

---

## 🚀 Features

* ✅ **AI Risk Prediction** using a trained and calibrated Random Forest model.
* 📈 **SHAP Explainability** to visualize how each input feature influences predictions.
* 📊 **Interactive Dashboard** displaying:

  * Risk Level (Low, Medium, High)
  * SHAP Feature Importance Chart
  * Oxygen level trend chart (if applicable)
  * Educational graphics and animated content
* 📱 **Fully Responsive UI** with animations (GSAP) for enhanced user engagement.
* 🔒 **Backend Integration** with Flask serving prediction results and SHAP values.

---

## 🛠️ Tech Stack

### Frontend

* [React.js](https://reactjs.org/)
* [React Hook Form](https://react-hook-form.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [GSAP](https://greensock.com/gsap/) for animations

### Backend

* [Flask](https://flask.palletsprojects.com/)
* [scikit-learn](https://scikit-learn.org/)
* [SHAP](https://github.com/slundberg/shap)

---

## 📂 Folder Structure

```
/frontend     --> React UI for form and dashboard
/backend      --> Flask API and ML model
/model.pkl    --> Trained Random Forest model (with calibration)
```

---

## 🧪 Example Input

```json
{
  "Name": "John",
  "AGE": 65,
  "GENDER": 1,
  "SMOKING": 1,
  "FINGER_DISCOLORATION": 0,
  "MENTAL_STRESS": 1,
  "EXPOSURE_TO_POLLUTION": 1,
  "LONG_TERM_ILLNESS": 0,
  "ENERGY_LEVEL": 60,
  "IMMUNE_WEAKNESS": 1,
  "BREATHING_ISSUE": 1,
  "ALCOHOL_CONSUMPTION": 0,
  "THROAT_DISCOMFORT": 1,
  "OXYGEN_SATURATION": 94.5,
  "CHEST_TIGHTNESS": 1,
  "FAMILY_HISTORY": 1,
  "SMOKING_FAMILY_HISTORY": 1,
  "STRESS_IMMUNE": 0
}
```

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/lung-disease-dashboard.git
cd lung-disease-dashboard
```

### 2. Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Model Overview

* **Random Forest Classifier** for classification.
* **CalibratedClassifierCV** ensures the probability outputs are trustworthy.
* **SHAP** for model interpretability and feature impact visualizations.
* **Link :** https://drive.google.com/drive/folders/1L40TgvU_rk-mcsTzTz9l65xBHGOqehOq?usp=sharing

---

## 🖼️ Sample Screenshots

![image](https://github.com/user-attachments/assets/1d689b4e-c792-4129-95e0-474dc10125c1)
![image](https://github.com/user-attachments/assets/6be3176b-7542-47bb-a02a-bde3618a5c02)


---

## 📜 License

This project is for academic and educational purposes. Customize and expand as needed!

---

Let me know if you want this formatted into a downloadable `.md` file or if you'd like to include deployment instructions (Render, Vercel).
