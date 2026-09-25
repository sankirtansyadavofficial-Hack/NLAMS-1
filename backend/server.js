require('dotenv').config();
const express = require('express');
const cors = require('cors');

const parcelRoutes = require('./src/routes/parcel.routes');
const userRoutes = require('./src/routes/user.routes');
const proposalRoutes = require('./src/routes/proposal.routes');
const projectRoutes = require('./src/routes/project.routes');
const compensationRoutes = require('./src/routes/compensation.routes');
const notificationRoutes = require('./src/routes/notification.routes');
const documentRoutes = require('./src/routes/document.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');
const grievanceRoutes = require('./src/routes/grievance.routes');

const app = express();

// ─── CORS Configuration ─────────────────────────────────────────────────────
// Allow the Vite dev server and any future deployed frontend
app.use(cors({
  origin: [
    'http://localhost:5173',     // Vite dev server
    'http://localhost:4173',     // Vite preview
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL,   // production URL (set via env)
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/parcels', parcelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/compensations', compensationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/grievances', grievanceRoutes);

// ─── Root & Health ───────────────────────────────────────────────────────────
app.get('/', (req, res) => res.send('<h1>NLAMS Backend is Running!</h1><p>Visit <a href="/api/health">/api/health</a> or <a href="/api/parcels">/api/parcels</a></p>'));
app.get('/api/health', (req, res) => res.json({
  status: 'ok',
  structure: 'MVC setup complete',
  timestamp: new Date().toISOString(),
  routes: [
    '/api/parcels', '/api/users', '/api/proposals', '/api/projects',
    '/api/compensations', '/api/notifications', '/api/documents',
    '/api/dashboard', '/api/grievances',
  ],
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 CORS enabled for frontend at http://localhost:5173`);
});
