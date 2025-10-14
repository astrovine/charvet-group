# Charvet Group Sales Dashboard 🏛️

A full web application for managing and visualizing sales data, built with FastAPI and React. This dashboard provides comprehensive tools for tracking product sales, managing user accounts, and analyzing business performance.

## Overview
Engineered to automate sales tracking and provide real-time business intelligence, this platform transforms raw sales data into actionable insights through a secure, role-based system. Key features include JWT-based authentication with a multi-tiered permission model (admin vs. superadmin), a dynamic analytics dashboard with interactive data visualizations, and a data ingestion pipeline for bulk-processing sales records from Excel files.

## Features

### Frontend
- **Modern UI/UX**: Built with React and styled using Tailwind CSS
- **Interactive Dashboard**: Real-time sales metrics with animated statistics
- **Product Showcase**: Dynamic product catalog with visual presentations
- **User Authentication**: Secure login and signup functionality
- **Admin Panel**: Comprehensive tools for data management and user administration
- **Responsive Design**: Optimized for desktop and mobile devices

### Backend
- **RESTful API**: Built with FastAPI for high performance
- **JWT Authentication**: Secure token-based authentication system
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **User Management**: Role-based access control (Admin/Superadmin)
- **Data Processing**: Sales data upload and processing capabilities
- **API Documentation**: Auto-generated interactive API docs

### Backend
- **RESTful API**: Built with FastAPI for high performance
- **JWT Authentication**: Secure token-based authentication system
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **User Management**: Role-based access control (Admin/Superadmin)
- **Data Processing**: Sales data upload and processing capabilities
- **API Documentation**: Auto-generated interactive API docs

### Backend
- **RESTful API**: Built with FastAPI for high performance
- **JWT Authentication**: Secure token-based authentication system
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **User Management**: Role-based access control (Admin/Superadmin)
- **Data Processing**: Sales data upload and processing capabilities
- **API Documentation**: Auto-generated interactive API docs

### Backend
- **RESTful API**: Built with FastAPI for high performance
- **JWT Authentication**: Secure token-based authentication system
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **User Management**: Role-based access control (Admin/Superadmin)
- **Data Processing**: Sales data upload and processing capabilities
- **API Documentation**: Auto-generated interactive API docs

### Backend
- **RESTful API**: Built with FastAPI for high performance
- **JWT Authentication**: Secure token-based authentication system
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **User Management**: Role-based access control (Admin/Superadmin)
- **Data Processing**: Sales data upload and processing capabilities
- **API Documentation**: Auto-generated interactive API docs

### Backend
- **RESTful API**: Built with FastAPI for high performance
- **JWT Authentication**: Secure token-based authentication system
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **User Management**: Role-based access control (Admin/Superadmin)
- **Data Processing**: Sales data upload and processing capabilities
- **API Documentation**: Auto-generated interactive API docs

### Backend
- **RESTful API**: Built with FastAPI for high performance
- **JWT Authentication**: Secure token-based authentication system
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **User Management**: Role-based access control (Admin/Superadmin)
- **Data Processing**: Sales data upload and processing capabilities
- **API Documentation**: Auto-generated interactive API docs

### Backend
- **RESTful API**: Built with FastAPI for high performance
- **JWT Authentication**: Secure token-based authentication system
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **User Management**: Role-based access control (Admin/Superadmin)
- **Data Processing**: Sales data upload and processing capabilities
- **API Documentation**: Auto-generated interactive API docs

## Technology Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion (animations)
- React Router (navigation)
- Axios (HTTP client)
- Vite (build tool)

### Backend
- Python 3.9+
- FastAPI
- SQLAlchemy (ORM)
- PostgreSQL
- Alembic (database migrations)
- JWT (authentication)
- Passlib (password hashing)

## Project Structure

```
charvet-group/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routers/         # API endpoints
│   │   ├── schemas/         # Pydantic schemas
│   │   └── utilities/       # Config, database, auth utilities
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context providers
│   │   └── utils/           # Utility functions
│   └── package.json
├── alembic/                 # Database migrations
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.9 or higher
- Node.js 16 or higher
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/charvet-group.git
   cd charvet-group
   ```

2. **Backend Setup**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

   # Install dependencies
   cd backend
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   PG_DBNAME=your_database_name
   PG_USER=your_database_user
   PG_PASSWORD=your_database_password
   PG_HOST=your_database_host
   PG_PORT=5432
   
   # Authentication
   SECRET_KEY=your_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   ```

   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

5. **Database Setup**
   ```bash
   # Run migrations
   alembic upgrade head
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://localhost:8000`
   API documentation: `http://localhost:8000/docs`

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration

### Users
- `GET /users/me` - Get current user
- `GET /users/` - Get all users (Admin only)
- `PUT /users/{id}` - Update user (Admin only)
- `DELETE /users/{id}` - Delete user (Admin only)

### Dashboard
- `GET /dashboard/sales` - Get sales data
- `POST /dashboard/upload` - Upload sales data
- `GET /dashboard/stats` - Get dashboard statistics

## Database Schema

### Users Table (admins)
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- role (admin/superadmin)
- is_active
- is_superadmin
- created_at
- last_login

### Sales Data Table
- id (Primary Key)
- date
- location
- customer_name
- phone_no
- imperial_crown (quantity)
- cranberry (quantity)
- orange (quantity)
- mango (quantity)
- black_stallion (quantity)
- sales_rep
- user_id (Foreign Key)

## Deployment

### Backend (Render)

1. Push code to GitHub
2. Create a new Web Service on Render
3. Configure build and start commands:
   - Build: `pip install -r backend/requirements.txt`
   - Start: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set environment variables in Render dashboard

### Frontend (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Configure:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Set `VITE_API_URL` environment variable to your Render backend URL

## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Environment variables are used for sensitive configuration
- CORS is configured to allow only specified origins
- Database credentials are never committed to version control

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved by Charvet Group.

## Contact

For questions or support, please contact the development team.

## Acknowledgments

- Built as part of an internship project
- Designed for sales operations management
- Optimized for real-world business use cases

