const express = require('express');
const router = express.Router();
const controller = require('../controllers/compensation.controller');

// GET /api/compensations?parcel_id=... — Get compensation by parcel
router.get('/', controller.getCompensation);

// GET /api/compensations/stats — Aggregated compensation stats
router.get('/stats', controller.getStats);

module.exports = router;