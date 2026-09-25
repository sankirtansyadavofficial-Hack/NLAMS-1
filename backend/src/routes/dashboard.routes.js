const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboard.controller');

// GET /api/dashboard/stats — National-level KPIs and state-wise aggregated stats
router.get('/stats', controller.getStats);

// GET /api/dashboard/states/:stateCode — Per-state dashboard data
router.get('/states/:stateCode', controller.getStateDashboard);

// GET /api/dashboard/activity — Recent activity feed
router.get('/activity', controller.getActivityFeed);

module.exports = router;
