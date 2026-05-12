# 🐾 ITPM Pet Care System

A comprehensive MERN stack web application for pet healthcare management, developed as part of the ITPM university module. This system enables pet owners to register, log in, book appointments, manage prescriptions, and receive AI-powered health predictions for their pets.

![License](https://img.shields.io/badge/License-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![React](https://img.shields.io/badge/React-v19-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

---

## ✨ Features

- **User Authentication**: Secure login and registration system with JWT tokens
- **Admin Dashboard**: Comprehensive admin panel for system management
- **Appointment Booking**: Easy-to-use appointment scheduling with calendar integration
- **AI Health Predictions**: OpenAI-powered pet health condition prediction based on symptoms
- **Prescription Management**: Digital prescription tracking and management
- **Doctor Management**: Add and manage veterinary doctors
- **Pain Control Tracking**: Monitor and track pet pain control records
- **Responsive Design**: Beautiful, mobile-friendly UI built with React and Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- **React** (v19.0.0) - UI library
- **React Router DOM** (v7.3.0) - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn** - High-quality component library
- **FullCalendar** (v6.1.17) - Calendar integration
- **Axios** (v1.8.3) - HTTP client
- **SweetAlert2** (v11.17.2) - Beautiful alerts and dialogs
- **Lucide React** (v0.485.0) - Icon library
- **React Icons** (v5.5.0) - Additional icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** (v4.21.2) - Web framework
- **MongoDB** (Atlas) - NoSQL database
- **Mongoose** (v8.12.1) - MongoDB ODM
- **OpenAI API** (v4.98.0) - AI predictions for pet health
- **JWT** (jsonwebtoken v9.0.2) - Authentication tokens
- **BCryptJS** (v3.0.2) - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** (v16.4.7) - Environment variable management
- **Nodemon** (v3.1.9) - Development auto-reload

### Tools & Techniques
- **Git** - Version control
- **npm** - Package management
- **REST API** - Backend API architecture
- **MongoDB Atlas** - Cloud database hosting
- **CORS** - Cross-origin requests handling
- **JWT Authentication** - Secure user sessions
- **Bcrypt** - Secure password hashing
- **Environment Variables** - Secure configuration management

---

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Git**
- **MongoDB Atlas Account** (for database)
- **OpenAI API Key** (for AI predictions)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sadeepa02/ITPM_Pet-Care-System.git
cd ITPM_Pet-Care-System
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` folder (copy from `.env.example`):

```env
# Server Configuration
PORT=8070

# Database Configuration
DB_NAME=petcare
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=pet-care

# OpenAI Configuration (Get your API key from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MAX_TOKENS=200

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-here
```

#### Start the Backend Server
```bash
npm install -g nodemon  # Install nodemon globally (optional)
npx nodemon server.js
```

The backend will run on **http://localhost:8070**

---

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start the Development Server
```bash
npm start
```

The frontend will automatically open at **http://localhost:3000**

---

## 📂 Project Structure

```
ITPM_Pet-Care-System/
├── README.md
├── backend/
│   ├── server.js                 # Main server file
│   ├── .env.example              # Environment variables template
│   ├── package.json
│   ├── models/
│   │   ├── AdminModel.js
│   │   ├── Appointment.js
│   │   ├── DoctorAddModel.js
│   │   ├── painControlBookModel.js
│   │   └── Prescription.js
│   ├── routes/
│   │   ├── AdminRoutes.js
│   │   ├── appointments.js
│   │   ├── DoctorAddRoutes.js
│   │   ├── painControlBookRoutes.js
│   │   ├── predict.js            # AI prediction endpoint
│   │   └── prescriptionRoutes.js
│   └── utils/
│
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       ├── api/
│       │   └── api.js            # Axios configuration
│       ├── components/
│       │   ├── Header.js
│       │   ├── Navbar.js
│       │   ├── Footer.js
│       │   ├── Hero.js
│       │   ├── ServiceCards.js
│       │   ├── AdminLoginForm.js
│       │   ├── Emergency.js
│       │   └── Dashboard/        # Admin dashboard components
│       │       ├── Appointments.js
│       │       ├── Doctors.js
│       │       ├── PrescriptionForm.js
│       │       ├── AIpredective.js
│       │       └── Settings.js
│       ├── pages/
│       │   ├── HomePage.js
│       │   ├── Dashboard.js
│       │   ├── ServiceBooking1.js
│       │   └── services.js
│       └── images/
```

---

## 📚 Educational Value & Learning Outcomes

This project demonstrates comprehensive full-stack web development concepts:

### Backend Development
- ✅ **RESTful API Design** - Building scalable REST endpoints
- ✅ **Database Design** - MongoDB schema modeling and relationships
- ✅ **Authentication & Authorization** - JWT-based secure authentication
- ✅ **API Integration** - Integrating third-party APIs (OpenAI)
- ✅ **Error Handling** - Robust error management and logging
- ✅ **Security** - Password hashing with bcrypt, environment variable management

### Frontend Development
- ✅ **React Hooks** - State management with hooks
- ✅ **Routing** - Multi-page application with React Router
- ✅ **Component Architecture** - Reusable, modular components
- ✅ **Styling** - Tailwind CSS for responsive design
- ✅ **API Communication** - Axios for HTTP requests
- ✅ **UI/UX Design** - User-friendly interfaces

### DevOps & Version Control
- ✅ **Git Workflow** - Version control best practices
- ✅ **Environment Management** - Secure configuration handling
- ✅ **Package Management** - npm dependencies and scripts
- ✅ **CI/CD Concepts** - Understanding deployment pipelines

### Database Management
- ✅ **MongoDB Atlas** - Cloud database management
- ✅ **Mongoose ODM** - Object document mapping
- ✅ **Data Validation** - Input validation and data integrity
- ✅ **Indexing & Optimization** - Query optimization

---

## 🔑 Key API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Admin registration

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### AI Predictions
- `POST /api/predict` - Get AI health prediction for pet

### Doctors
- `GET /api/doctoradd` - Get all doctors
- `POST /api/doctoradd` - Add new doctor
- `DELETE /api/doctoradd/:id` - Remove doctor

### Prescriptions
- `GET /api/prescriptions` - Get all prescriptions
- `POST /api/prescriptions` - Create prescription
- `PUT /api/prescriptions/:id` - Update prescription

---

## 🔐 Security Features

- ✅ JWT-based authentication with token expiration
- ✅ Password hashing using bcryptjs
- ✅ CORS protection against unauthorized requests
- ✅ Environment variables for sensitive data
- ✅ Input validation and sanitization
- ✅ HTTPS-ready configuration

---

## 📖 Development Guidelines

### Code Standards
- Follow ES6+ JavaScript conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent code formatting

### Git Workflow
```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to remote
git push origin feature/your-feature-name
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Environment Variables

### Backend `.env` Example
```env
PORT=8070
DB_NAME=petcare
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
OPENAI_API_KEY=sk-your-api-key
OPENAI_MAX_TOKENS=200
JWT_SECRET=your-super-secret-jwt-key
```

⚠️ **Never commit `.env` files to version control!** Use `.env.example` as a template.

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8070
netstat -ano | findstr :8070
taskkill /PID <PID> /F
```

### MongoDB Connection Issues
- Verify your MongoDB Atlas credentials
- Check IP whitelist in MongoDB Atlas dashboard
- Ensure VPN/network allows connections

### CORS Errors
- Verify CORS configuration in `server.js`
- Ensure frontend URL is whitelisted
- Check `Access-Control-Allow-Origin` headers

---

## 📞 Support

For support, email: sadeepa02@example.com or create an issue in the repository.

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Sadeepa** - ITPM Student  
GitHub: [@sadeepa02](https://github.com/sadeepa02)

---

## 🙏 Acknowledgments

- MongoDB Atlas for cloud database hosting
- OpenAI for AI prediction capabilities
- React and Express communities
- FullCalendar library for scheduling
- Tailwind CSS for styling framework

---

## 📅 Project Status

✅ **Active Development**  
Last Updated: May 2026

---

**⭐ If you found this project helpful, please consider giving it a star on GitHub!**
