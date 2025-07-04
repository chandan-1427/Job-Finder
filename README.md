# 💼 Job Finder

**Job Finder** is a full-stack web application that enables users to search and apply for jobs, upload resumes, and manage their profiles.  
Employers can post job listings and manage applications, while admins have full control over platform data and activity.

---

## 🧩 Project Overview

Job-Finder/
├── job-finder-frontend/ # React + Tailwind CSS
└── job-finder-backend/ # Express.js + MongoDB

yaml
Copy
Edit

---

## 🚀 Key Features

### 👤 User
- Secure JWT-based authentication  
- Browse and apply for jobs  
- Upload resume and profile photo  
- Profile progress tracker  
- Application history and status view  

### 🧑‍💼 Employer
- Post, edit, and delete job listings  
- View and manage applicant submissions  

### 🛡️ Admin
- Platform-wide dashboard and analytics  
- Manage users, jobs, and content  
- Moderate resumes and job postings  

---

## 🖼️ Frontend Stack

- React 19  
- Tailwind CSS  
- React Router v7  
- Framer Motion  
- Recharts (for dashboard analytics)  
- Lucide Icons  
- Axios  
- JWT Decode  

### UI Highlights
- Fully responsive layout  
- Drag-and-drop functionality  
- Resume previews before submission  
- Animated transitions and modals  
- Dark mode-ready  

---

## ⚙️ Backend Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Multer (file uploads)  
- Puppeteer + html-pdf-node (resume to PDF)  
- Handlebars (for templating resumes)  
- dotenv  
- cookie-parser  
- CORS  

---

## 🛠️ Getting Started Locally

### 📦 Prerequisites
- Node.js ≥ 18  
- MongoDB (local or Atlas)

---

### 🔧 Install Dependencies

```bash
# Frontend
cd job-finder-frontend
npm install

# Backend
cd ../job-finder-backend
npm install

🚀 Run the Application
# Start the frontend
cd job-finder-frontend
npm start

# Start the backend
cd job-finder-backend
npm run dev
Ensure .env files are properly configured for both frontend and backend.

🔐 Environment Variables
Backend .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobFinderDB
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=http://localhost:3000
NODE_ENV=development

Frontend .env
REACT_APP_API_URL=http://localhost:5000

🗃️ Folder Structure
bash
Copy
Edit
job-finder-backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── templates/
└── server.js

job-finder-frontend/
├── public/
└── src/
    ├── assets/
    ├── components/
    ├── pages/
    ├── routes/
    ├── services/
    ├── styles/
    ├── utils/
    └── App.js

👨‍💻 Author
Chandan Dakka
GitHub Profile

📄 License
This project is licensed under the ISC License.

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Make sure to lint and test your code before submitting.

Let me know if you'd like:
- Deployment instructions (for Vercel + Render)
- GitHub badges (for Node.js, React, MongoDB, etc.)
