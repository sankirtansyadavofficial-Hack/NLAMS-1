const express = require('express');
const router = express.Router();
const controller = require('../controllers/project.controller');

// GET /api/projects — List all projects (optionally filter by ?state=...)
router.get('/', controller.getAllProjects);

// GET /api/projects/:id — Get a single project
router.get('/:id', controller.getProjectById);

module.exports = router;