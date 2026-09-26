const express = require('express');
const router = express.Router();
const controller = require('../controllers/proposal.controller');

// GET /api/proposals — List all proposals
router.get('/', controller.getAllProposals);

// GET /api/proposals/:id — Get a single proposal by ID
router.get('/:id', controller.getProposalById);

// POST /api/proposals — Create a new proposal
router.post('/', controller.createProposal);

// PATCH /api/proposals/:id/status — Update proposal status
router.patch('/:id/status', controller.updateProposalStatus);

module.exports = router;