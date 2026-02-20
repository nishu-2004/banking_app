# KodBank - Development Notes

## 🎯 Project Overview

**KodBank** is a full-stack modern banking web application with:
- User registration and authentication
- Secure JWT token-based login
- Balance checking with premium animations
- Professional banking-style UI
- Production-ready code structure

## 🏗️ Architecture

### Frontend (React + Vite)
- Single Page Application (SPA)
- Component-based architecture
- Custom hooks for state management
- Responsive Tailwind CSS design
- Premium CSS animations

### Backend (Node.js + Express)
- RESTful API with JSON responses
- Modular route/controller structure
- Middleware for auth and errors
- Database abstraction layer
- Environment variable configuration

### Database (MySQL)
- Relational schema with foreign keys
- Prepared statements to prevent SQL injection
- Proper indexing on frequently queried columns
- Connection pooling for performance

## 📋 File Organization

```
app/
├── backend/
│   ├── config/database.js        → MySQL connection pool & initialization
│   ├── middleware/
│   │   ├── auth.js               → JWT token verification
│   │   └── errorHandler.js       → Global error handling
│   ├── models/
│   │   ├── User.js               → User CRUD operations
│   │   └── Token.js              → Token management
│   ├── controllers/
│   │   ├── authController.js     → Register, Login, Logout logic
│   │   └── balanceController.js  → Balance retrieval
│   ├── routes/
│   │   ├── authRoutes.js         → Auth endpoints
│   │   └── balanceRoutes.js      → Balance endpoints
│   └── app.js                    → Express server setup
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── animations/       → Confetti, GlowWave, ParticleSparkle
│   │   │   ├── Card.jsx          → Reusable card wrapper
│   │   │   ├── Input.jsx         → Form input with validation
│   │   │   ├── Button.jsx        → Styled buttons
│   │   │   ├── Toast.jsx         → Notification system
│   │   │   └── LoadingSpinner.jsx → Loading indicator
│   │   ├── pages/
│   │   │   ├── Landing.jsx       → Home page with CTA
│   │   │   ├── Register.jsx      → Registration form
│   │   │   ├── Login.jsx         → Login form
│   │   │   └── Dashboard.jsx     → Protected user dashboard
│   │   ├── hooks/
│   │   │   └── useAuth.js        → Auth state management
│   │   ├── utils/
│   │   │   └── api.js            → Axios configuration & API methods
│   │   └── App.jsx               → Router & main layout
│   └── index.html                → HTML entry point
│
├── README.md                     → Full documentation
├── QUICKSTART.md                 → 5-minute setup guide
└── AIVEN_SETUP.md                → Database setup guide
```

## 🔑 Key Features Implementation

### 1. Authentication Flow
```
Register → Hash Password (bcrypt) → Store in DB
Login → Compare Password → Generate JWT → Store Token → Return Cookie
Protected Route → Verify JWT → Check Token in DB → Allow Access
```

### 2. Database Schema
```
KodUser
├── uid (PK)
├── username (UNIQUE)
├── email (UNIQUE)
├── password (hashed)
├── phone
├── balance (default: 100000)
├── role (ENUM: Customer, Manager, Admin)
└── timestamps

UserToken
├── tid (PK)
├── token (TEXT)
├── uid (FK → KodUser)
├── expiry (DATETIME)
└── created_at (TIMESTAMP)
```

### 3. Animation System
```
User clicks "Check Balance"
  ↓
API request with JWT
  ↓
Backend verifies token
  ↓
Returns balance
  ↓
Frontend shows balance
  ↓
Random animation selected (1 of 3)
  ↓
Confetti/Glow/Sparkle displayed
  ↓
Auto-cleanup after animation
```

## 🛡️ Security Features

1. **Password Hashing**: Bcryptjs with 10 salt rounds
2. **Token Security**: 
   - JWT with 24-hour expiry
   - Stored in database for validation
   - HTTP-only cookies (cannot be accessed from JS)
3. **Route Protection**: Middleware verifies JWT before allowing access
4. **SQL Injection Prevention**: All queries use prepared statements
5. **CORS Configuration**: Restricted to frontend origin
6. **Environment Variables**: Secrets never hardcoded

## 🎨 UI/UX Decisions

### Colors
- **Primary**: #1e40af (Professional blue)
- **Secondary**: #1e3a8a (Darker blue)
- **Accent**: #f59e0b (Gold)
- **Light Background**: #f0f9ff (Light blue)

### Components
- **Cards**: Rounded (16px), soft shadows, clean white
- **Buttons**: Full width on mobile, fixed on desktop
- **Forms**: Clean inputs with error messages
- **Animations**: Smooth transitions, 0.3-0.5s duration

### Animations
- **Confetti**: 50 particles, 2-3 second fall
- **Glow Wave**: 3 expanding circles, 200ms apart
- **Sparkle**: 30 particles, radial burst

## 🔧 Configuration

### Backend .env
```env
DB_HOST=          # Aiven hostname
DB_PORT=21707     # MySQL port
DB_USER=avnadmin  # Default Aiven user
DB_PASSWORD=      # Your Aiven password
DB_NAME=kodbank   # Database name
JWT_SECRET=       # Your secret key
PORT=5000         # Server port
FRONTEND_URL=     # Frontend origin for CORS
```

### Frontend .env
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📊 Data Flow

### Registration
```
Frontend Form → Validation → Post /api/auth/register → Hash Password → Insert User → Success Response
```

### Login
```
Frontend Form → Post /api/auth/login → Find User → Compare Password → Generate JWT → Store Token → Set Cookie → Dashboard
```

### Balance Check
```
Dashboard → GET /api/balance/check (JWT) → Verify Token → Get Balance → Return Balance → Show with Animation
```

## 🚀 Performance Optimizations

1. **Database Connection Pool**: Reuses connections instead of creating new ones
2. **Prepared Statements**: Prevents SQL injection and improves performance
3. **Async/Await**: Non-blocking operations
4. **Lazy Loading**: Components load on demand
5. **CSS Animations**: Hardware-accelerated (GPU)
6. **API Caching**: None (balance is always fresh)

## 🧪 Testing Scenarios

### Happy Path
1. Register new user with valid data
2. Login with registered credentials
3. See dashboard with welcome message
4. Check balance and see animation
5. Logout successfully

### Error Handling
1. Register with existing username → Error message
2. Login with wrong password → Error message
3. Access dashboard without login → Redirect to login
4. Expired token → Redirect to login
5. Check balance without token → 401 error

## 📱 Responsive Breakpoints

- **Mobile**: max-width 640px (full width)
- **Tablet**: max-width 1024px (2 columns)
- **Desktop**: 1024px+ (full layout)

## 🔄 Session Management

- JWT stored in HTTP-only cookie
- 24-hour expiration
- Token also stored in database for validation
- User stays logged in across page refreshes
- Logout clears both cookie and database token

## 💾 Storage

- **Client**: HTTP-only cookies (tokens), localStorage (user data)
- **Server**: MySQL database for all persistent data
- **Environment**: .env files (secrets)

## 🎓 Code Quality

- Modular structure (separation of concerns)
- Reusable components
- Custom hooks for logic
- Consistent naming conventions
- Comments on complex logic
- Error handling throughout
- No hardcoded values

## 🚀 Deployment Ready

The code is production-ready with:
- ✅ Environment variable management
- ✅ Error handling
- ✅ Security best practices
- ✅ Modular architecture
- ✅ Responsive design
- ✅ Performance optimized
- ✅ Database abstraction
- ✅ Middleware pattern

## 🔮 Future Enhancement Ideas

1. **Features**
   - Transaction history
   - Money transfer
   - Bill payments
   - Savings goals
   - Budget tracking

2. **Security**
   - Two-factor authentication (2FA)
   - Email verification
   - Phone OTP
   - Login notifications

3. **UI/UX**
   - Dark mode
   - Multiple languages
   - Accessibility improvements
   - Mobile app (React Native)

4. **Backend**
   - Redis caching
   - Elasticsearch for transactions
   - Message queue for notifications
   - Admin dashboard

## 📞 Support

If you have questions:
1. Check README.md for overview
2. Check QUICKSTART.md for setup
3. Check AIVEN_SETUP.md for database
4. Review code comments
5. Check error messages in console

---

**Happy coding! Build amazing features on top of this foundation. 🚀**
