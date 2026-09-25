const express = require('express');
const router = express.Router();
const controller = require('../controllers/document.controller');

// GET /api/documents?parcel_id=... — Get documents for a parcel
router.get('/', controller.getDocuments);

module.exports = router;