// ─── Compensation Controller ─────────────────────────────────────────────────
// Serves compensation data matching the frontend's farmerData.js structure.

const pool = require('../config/db');

exports.getCompensation = async (req, res) => {
  try {
    const { parcel_id } = req.query;
    
    // Return mock compensation data matching farmerData.js structure
    res.json({
      parcel_id: parcel_id || 'MH/PUN/MND/247-B',
      totalSanctioned: 4850000,
      amountPaid: 2910000,
      amountPending: 1940000,
      paymentMode: 'Bank Transfer',
      expectedPaymentDate: '2026-04-15',
      bankLinked: true,
      bankName: 'State Bank of India',
      payments: [
        { date: '2025-11-10', amount: 1455000, type: 'First Installment', status: 'Paid' },
        { date: '2026-02-20', amount: 1455000, type: 'Second Installment', status: 'Paid' },
        { date: '2026-04-15', amount: 1940000, type: 'Final Installment', status: 'Pending' },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    // Aggregate from land_parcels valuations
    const query = `
      SELECT 
        COALESCE(SUM(valuation), 0) AS total_valuation,
        COUNT(*) AS total_parcels,
        COALESCE(AVG(valuation), 0) AS avg_valuation
      FROM land_parcels;
    `;
    const { rows } = await pool.query(query);
    
    res.json({
      totalValuation: parseFloat(rows[0].total_valuation),
      totalParcels: parseInt(rows[0].total_parcels),
      avgValuation: parseFloat(rows[0].avg_valuation),
      disbursed: parseFloat(rows[0].total_valuation) * 0.6, // mock 60% disbursed
      pending: parseFloat(rows[0].total_valuation) * 0.4,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};