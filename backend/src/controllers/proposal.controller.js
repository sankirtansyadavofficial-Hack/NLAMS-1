const Proposal = require('../models/proposal');

// GET /api/proposals — List all proposals from Supabase
exports.getAllProposals = async (req, res) => {
  try {
    const { district, status } = req.query;
    let list = await Proposal.getAll();
    if (district) {
      list = list.filter(p => p.district.toLowerCase() === district.toLowerCase());
    }
    if (status) {
      list = list.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    res.json(list);
  } catch (err) {
    console.error('Error fetching proposals from Supabase:', err);
    res.status(500).json({ error: 'Failed to fetch proposals from database' });
  }
};

// GET /api/proposals/:id — Get a single proposal by ID
exports.getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.getById(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    res.json(proposal);
  } catch (err) {
    console.error('Error fetching proposal by id:', err);
    res.status(500).json({ error: 'Database error fetching proposal' });
  }
};

// POST /api/proposals — Create and save a new proposal to Supabase
exports.createProposal = async (req, res) => {
  try {
    const created = await Proposal.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error('Error saving proposal to Supabase:', err);
    res.status(500).json({ error: 'Failed to create proposal in database: ' + err.message });
  }
};

// PATCH /api/proposals/:id/status — Update proposal status in Supabase
exports.updateProposalStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const updated = await Proposal.updateStatus(req.params.id, status, note);
    if (!updated) return res.status(404).json({ error: 'Proposal not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating proposal status:', err);
    res.status(500).json({ error: 'Failed to update proposal status' });
  }
};