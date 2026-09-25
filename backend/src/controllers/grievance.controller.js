const pool = require('../config/db');

// ─── Submit a Grievance ──────────────────────────────────────────────────────
exports.createGrievance = async (req, res) => {
  try {
    const { user_id, type, description, plot_number } = req.body;
    
    if (!type || !description) {
      return res.status(400).json({ error: 'type and description are required' });
    }

    // Generate a grievance ID
    const grievanceId = `GRV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
    
    res.status(201).json({
      id: grievanceId,
      user_id: user_id || 'anonymous',
      type,
      description,
      plot_number: plot_number || null,
      status: 'Submitted',
      submittedOn: new Date().toISOString().split('T')[0],
      message: 'Grievance submitted successfully. You will be notified of updates.',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── Get Grievances ──────────────────────────────────────────────────────────
exports.getGrievances = async (req, res) => {
  try {
    const { user_id } = req.query;
    
    // Return sample grievances (will be backed by DB table later)
    res.json([
      {
        id: 'GRV-2026-0412',
        type: 'Compensation Delay',
        description: 'Third installment of compensation has not been received despite the due date passing.',
        status: 'Under Review',
        submittedOn: '2026-09-10',
        lastUpdate: '2026-09-18',
        responseNote: 'Your complaint has been forwarded to the District Collector\'s office. Expected resolution within 15 working days.',
      }
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
