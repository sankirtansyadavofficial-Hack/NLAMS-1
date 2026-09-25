const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification.controller');

// GET /api/notifications?user_id=... — Get notifications for a user
router.get('/', controller.getNotifications);

module.exports = router;