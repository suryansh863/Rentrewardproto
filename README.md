# RentReward Authentication System

A complete authentication system for RentReward, supporting both email and phone number authentication with email verification.

## Features

- Email and phone number authentication
- Secure password hashing with bcrypt
- JWT-based authentication
- Email verification system
- MongoDB for data storage
- React frontend with Tailwind CSS
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a MongoDB Atlas account)
- Gmail account (or other email service) for sending verification emails

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/rentreward
JWT_SECRET=your-secret-key-change-this-in-production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_SERVICE=gmail
FRONTEND_URL=http://localhost:5173
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 3. Database Setup

Make sure MongoDB is running locally, or update the `MONGODB_URI` in `.env` to point to your MongoDB Atlas cluster.

### 4. Email Service Setup

1. Create a Gmail account or use an existing one
2. Enable 2-factor authentication
3. Generate an app-specific password
4. Update the `.env` file with your email credentials

### 5. Start the Application

```bash
# Start the backend server (from the backend directory)
npm start

# Start the frontend development server (from the root directory)
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3000`

## API Endpoints

### Authentication Routes

- `POST /api/auth/signup`: Create a new user account
  ```json
  {
    "email": "user@example.com",
    "phoneNumber": "+1234567890",
    "password": "password123",
    "displayName": "John Doe",
    "userType": "tenant"
  }
  ```

- `POST /api/auth/login`: Login with email/phone and password
  ```json
  {
    "identifier": "user@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/verify/:token`: Verify email address
- `POST /api/auth/resend-verification`: Resend verification email
  ```json
  {
    "email": "user@example.com"
  }
  ```

## Security Considerations

1. JWT tokens are stored in localStorage - consider implementing refresh tokens for production
2. Passwords are hashed using bcrypt
3. Email verification tokens expire after 24 hours
4. Environment variables are used for sensitive data
5. CORS is enabled for frontend communication

## Testing Email Functionality

To test email verification locally:

1. Set up your Gmail account with an app-specific password
2. Update the `.env` file with your email credentials
3. Sign up with a valid email address
4. Check your email for the verification link
5. Click the link to verify your email address

## Error Handling

The system includes comprehensive error handling for:
- Invalid credentials
- Duplicate email/phone
- Invalid verification tokens
- Expired verification tokens
- Network errors
- Server errors

## Frontend Routes

- `/login`: Login page
- `/signup`: Signup page
- `/verify-email/:token`: Email verification page

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request