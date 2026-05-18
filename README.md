# AI-Based Employee Performance Analytics & Recommendation System

A full-stack MERN application that analyzes employee performance data and provides AI-powered recommendations using the OpenRouter API.

## 🚀 Features

- **Employee Management**: Add, view, update, and delete employee records
- **Performance Tracking**: Track performance scores and skill metrics
- **AI Recommendations**: Generate AI-powered promotion and training suggestions
- **Employee Rankings**: Automated ranking based on performance analytics
- **Department Analytics**: Performance breakdown by department
- **Search & Filter**: Search employees by name, filter by department
- **Authentication**: JWT-based login/signup with bcrypt password hashing
- **Protected Routes**: Secure all sensitive endpoints with token verification

## 🛠️ Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Frontend   | React 19 + Vite   |
| Backend    | Node.js + Express |
| Database   | MongoDB + Mongoose|
| AI API     | OpenRouter (GPT-4o-mini) |
| Auth       | JWT + bcrypt      |

## 📁 Project Structure

```
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── services/        # API service layer
│   │   ├── App.jsx          # Root component with routing
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Design system
│   ├── index.html
│   └── package.json
│
├── server/                  # Express Backend
│   ├── config/              # Database configuration
│   ├── controllers/         # Route handlers
│   ├── middleware/           # Auth & error middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route definitions
│   ├── services/            # External API services
│   ├── server.js            # Entry point
│   └── package.json
│
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- OpenRouter API key

### Backend Setup
```bash
cd server
npm install
# Create .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_uri
# OPENROUTER_API_KEY=your_api_key
# JWT_SECRET=your_secret
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## 📡 API Endpoints

### Authentication
| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| POST   | /api/auth/signup   | Register new user  |
| POST   | /api/auth/login    | Login user         |

### Employee Management (Protected)
| Method | Endpoint                              | Description              |
|--------|---------------------------------------|--------------------------|
| POST   | /api/employees                        | Add new employee         |
| GET    | /api/employees                        | Get all employees        |
| GET    | /api/employees/search?department=Dev  | Search/filter employees  |
| PUT    | /api/employees/:id                    | Update employee          |
| DELETE | /api/employees/:id                    | Delete employee          |

### AI Recommendations (Protected)
| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| POST   | /api/ai/recommend  | Generate AI recommendations    |

## 📋 Sample Request Body

### Add Employee
```json
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3
}
```

## 🔒 Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiry
- Protected routes require valid Bearer token
- Input validation on all endpoints
- CORS configured for allowed origins

## 👤 Author

Employee Performance Analytics System
