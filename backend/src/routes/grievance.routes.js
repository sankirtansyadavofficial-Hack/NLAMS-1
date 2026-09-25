const express = require('express');
const router = express.Router();
const controller = require('../controllers/grievance.controller');

// POST /api/grievances — Submit a new grievance
router.post('/', controller.createGrievance);

// GET /api/grievances?user_id=... — Get grievances for a user
router.get('/', controller.getGrievances);

module.exports = router;
