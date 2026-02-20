# KodBank - Modern Banking Web Application

A complete, production-ready banking web application built with **React**, **Node.js/Express**, and **MySQL**. Features secure authentication, JWT tokens, balance checking, and premium celebration animations.

## 🎯 Features

✅ **User Authentication**
- Registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- HTTP-only cookie storage
- Protected routes

✅ **User Management**
- Role-based access (Customer/Manager/Admin)
- Default balance: ₹100,000
- User profile management
- Secure token expiry (24 hours)

✅ **Balance Checking**
- Secure balance verification with JWT
- Real-time balance display
- Beautiful UI with loading states

✅ **Premium Animations**
- **Confetti Burst** - Colorful particles falling
- **Glow Wave** - Expanding luminous waves
- **Particle Sparkle** - Floating sparkle effects
- Randomly triggered on each balance check
- No overlapping animations

✅ **Modern UI/UX**
- Clean, professional banking-style design
- Responsive (mobile + desktop)
- Smooth transitions and animations
- Toast notifications
- Card-based layout with shadows
- Centered, minimal aesthetic

✅ **Security**
- JWT authentication
- Bcrypt password hashing
- Token database validation
- Protected API routes
- CORS configuration
- Environment variables for secrets

## 📁 Project Structure

```
app/
├── backend/                    # Node.js Express Server
│   ├── config/
│   │   └── database.js         # MySQL connection & initialization
│   ├── middleware/
│   │   ├── auth.js             # JWT verification
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   ├── User.js             # User database operations
│   │   └── Token.js            # Token database operations
│   ├── controllers/
│   │   ├── authController.js   # Register, Login, Logout
│   │   └── balanceController.js# Balance checking
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── balanceRoutes.js    # Balance endpoints
│   ├── app.js                  # Express server setup
│   ├── package.json            # Backend dependencies
│   └── .env.example            # Environment variables template
│
├── frontend/                   # React + Vite App
│   ├── src/
│   │   ├── components/
│   │   │   ├── animations/
│   │   │   │   ├── Confetti.jsx
│   │   │   │   ├── GlowWave.jsx
│   │   │   │   └── ParticleSparkle.jsx
│   │   │   ├── Card.jsx        # Reusable card component
│   │   │   ├── Input.jsx       # Form input component
│   │   │   ├── Button.jsx      # Button component
│   │   │   ├── Toast.jsx       # Notification component
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx     # Home page
│   │   │   ├── Register.jsx    # Registration page
│   │   │   ├── Login.jsx       # Login page
│   │   │   └── Dashboard.jsx   # User dashboard
│   │   ├── hooks/
│   │   │   └── useAuth.js      # Auth custom hook
│   │   ├── utils/
│   │   │   └── api.js          # Axios API configuration
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS config
│   ├── tailwind.config.js      # PostCSS config
│   ├── package.json            # Frontend dependencies
│   └── .env.example            # Environment template
│
└── README.md                   # This file
```

## 🗄️ Database Schema

### KodUser Table
```sql
- uid (INT, PRIMARY KEY, AUTO_INCREMENT)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- phone (VARCHAR)
- balance (DECIMAL, default: 100000)
- role (ENUM: Customer, Manager, Admin)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### UserToken Table
```sql
- tid (INT, PRIMARY KEY, AUTO_INCREMENT)
- token (TEXT)
- uid (INT, FOREIGN KEY → KodUser.uid)
- expiry (DATETIME)
- created_at (TIMESTAMP)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Aiven MySQL account (or any MySQL database)
- Git

### Step 1: Setup Aiven MySQL Database

1. **Create Aiven Account**
   - Go to [Aiven.io](https://aiven.io)
   - Sign up and log in

2. **Create MySQL Service**
   - Click "Create Service"
   - Select "MySQL"
   - Choose region and plan (free tier available)
   - Set password for `avnadmin` user

3. **Get Connection Details**
   - Go to Service overview
   - Copy: Host, Port, User, Password
   - Create database named `kodbank`

4. **Connection String Example**
   ```
   Host: your-db.a.aivencloud.com
   Port: 21707
   User: avnadmin
   Password: your-password
   Database: kodbank
   ```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your Aiven MySQL credentials
# DB_HOST=your-aiven-db-host.a.aivencloud.com
# DB_PORT=21707
# DB_USER=avnadmin
# DB_PASSWORD=your-password
# DB_NAME=kodbank
# JWT_SECRET=your-secret-key

# Start backend server
npm start
# or for development with auto-reload
npm run dev

# Server will run on http://localhost:5000
```

### Step 3: Frontend Setup

```bash
# In new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# App will run on http://localhost:5173
```

### Step 4: Access the Application

1. Open browser to `http://localhost:5173`
2. You'll see the landing page with Register and Login options
3. Create a new account or login

## 📱 Application Flow

### Landing Page (`/`)
- Welcome screen with app features
- Register and Login buttons
- Feature highlights (Secure, Fast, Smooth)

### Registration (`/register`)
- Create account with username, email, phone, password
- Form validation
- Password hashing with bcrypt
- Default role: Customer
- Default balance: ₹100,000
- Redirect to login after success

### Login (`/login`)
- Username and password authentication
- JWT token generation
- Token stored in HTTP-only cookies
- Redirect to dashboard on success

### Dashboard (`/dashboard`)
- Welcome message with username
- Account information cards
- **Check Balance Button**
  - Click to fetch balance from database
  - Shows formatted balance: `Your Balance is: ₹ 100,000`
  - Triggers random animation:
    - 33% chance: Confetti burst
    - 33% chance: Glow wave
    - 33% chance: Particle sparkle
  - Hide balance option

### Logout
- Clears token from database
- Removes HTTP-only cookie
- Redirects to landing page

## 🔐 Security Features

✅ **Password Security**
- Bcryptjs hashing with 10 rounds
- Passwords never stored in plain text

✅ **JWT Authentication**
- 24-hour token expiry
- Token includes: uid, username, email, role
- Secure signing key from environment

✅ **Token Management**
- Tokens stored in database
- Expiry validation on each request
- Automatic token cleanup on logout

✅ **Protected Routes**
- JWT middleware verification
- Cookie-based token transport
- Token must be valid and not expired

✅ **Environment Security**
- All secrets in .env files
- .env not committed to git
- Example .env.example provided

✅ **HTTP-Only Cookies**
- Cookies not accessible from JavaScript
- CSRF protection enabled
- Secure flag in production

## 🎨 UI/UX Highlights

- **Colors**: Professional blue (#1e40af) with accent gold
- **Typography**: Clean sans-serif system fonts
- **Spacing**: Consistent padding and margins
- **Cards**: Soft shadows with rounded corners (16px)
- **Animations**: Smooth fade-in and slide-up effects
- **Loading**: Spinning loader during requests
- **Notifications**: Toast messages for feedback
- **Responsive**: Fully responsive grid layouts

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/register    - Create new account
POST   /api/auth/login       - Login user
POST   /api/auth/logout      - Logout user (protected)
GET    /api/auth/profile     - Get user profile (protected)
```

### Balance
```
GET    /api/balance/check    - Check user balance (protected)
```

### Health
```
GET    /api/health           - Server health check
```

## 🎭 Animation Details

### Confetti Burst
- 50 colorful particles
- Random hues (0-360°)
- Fall animation with rotation
- 2-3 second duration
- Smooth opacity fade

### Glow Wave
- 3 expanding circle waves
- Golden color (#fbbf24)
- 200ms delay between waves
- Glowing box-shadow effect
- 1 second expansion

### Particle Sparkle
- 30 golden particles
- Radial burst from center
- Sparkle effect with glow
- 1.5-2 second flight time
- Smooth fade out

**Animation Triggering**
- Random selection (1 of 3)
- One per balance check
- Auto-cleanup before next trigger
- No overlap or memory leaks

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **JWT** - Token authentication
- **Bcryptjs** - Password hashing
- **Dotenv** - Environment variables
- **Cookie-Parser** - Cookie handling
- **CORS** - Cross-origin support

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Custom Hooks** - Auth management
- **CSS Animations** - Premium effects

## 📖 How to Use

### First Time Setup
1. Install all dependencies for both frontend and backend
2. Setup Aiven MySQL database
3. Configure .env files with your credentials
4. Run backend: `npm start`
5. Run frontend: `npm run dev`
6. Open http://localhost:5173

### Testing Registration
1. Go to Register page
2. Fill in details:
   - Username: `testuser`
   - Email: `test@example.com`
   - Phone: `9876543210`
   - Password: `password123`
3. Click Register
4. You'll get success message and redirect to login

### Testing Login
1. Use credentials from registration
2. Username: `testuser`
3. Password: `password123`
4. Click Login
5. You'll be redirected to dashboard

### Testing Balance Check
1. Click "Check Balance" on dashboard
2. Wait for request to process
3. Balance appears with animation
4. See one of three random animations
5. Click "Hide Balance" to reset

## 🔧 Environment Variables

### Backend (.env)
```
DB_HOST=your-aiven-db-host.a.aivencloud.com
DB_PORT=21707
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=kodbank
JWT_SECRET=your-super-secret-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📝 Default Test Credentials

After registration, you can use:
- **Username**: testuser
- **Password**: password123
- **Default Balance**: ₹100,000

## 🐛 Troubleshooting

### Database Connection Error
- Verify Aiven credentials in .env
- Check if database `kodbank` exists
- Ensure network/firewall allows connection

### CORS Error
- Check FRONTEND_URL in backend .env
- Ensure both apps are running
- Clear browser cache

### Token Expired Error
- Note: Tokens last 24 hours
- Login again for new token
- Tokens also stored in database

### Animation Not Showing
- Check browser console for errors
- Ensure JavaScript is enabled
- Try refreshing page

### Port Already in Use
- Change PORT in backend .env (default 5000)
- Change port in vite.config.js for frontend (default 5173)

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [JWT Guide](https://jwt.io/introduction)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [MySQL Documentation](https://dev.mysql.com/doc)

## 💡 Future Enhancements

Possible features to add:
- Money transfer between accounts
- Transaction history
- Account statements
- Bill payments
- Mobile app (React Native)
- Two-factor authentication
- Email OTP verification
- Dark mode
- Transaction notifications
- Admin dashboard

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a modern banking web application demonstration.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review error messages in console
3. Verify environment variables
4. Check Aiven MySQL connection

---

**Happy Banking! 🏦✨**

Remember to keep your .env files secure and never commit them to version control.
