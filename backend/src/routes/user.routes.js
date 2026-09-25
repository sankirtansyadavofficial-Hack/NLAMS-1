const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// POST /api/users/login — Login (mock for now)
router.post('/login', controller.login);

// GET /api/users/:id — Get user profile
router.get('/:id', controller.getProfile);

module.exports = router;