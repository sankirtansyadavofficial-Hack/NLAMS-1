const pool = require('../config/db');

// ─── National Dashboard Stats ────────────────────────────────────────────────
// Aggregates parcel data from the database and returns KPIs
exports.getStats = async (req, res) => {
  try {
    // Get aggregate stats from land_parcels table
    const statsQuery = `
      SELECT 
        COUNT(*) AS total_parcels,
        COALESCE(SUM(parcel_area), 0) AS total_area,
        COALESCE(SUM(valuation), 0) AS total_valuation,
        COUNT(DISTINCT usage) AS usage_types
      FROM land_parcels;
    `;
    const { rows: statsRows } = await pool.query(statsQuery);
    const dbStats = statsRows[0];

    // Get usage breakdown
    const usageQuery = `
      SELECT usage, COUNT(*) AS count, SUM(parcel_area) AS total_area
      FROM land_parcels
      GROUP BY usage
      ORDER BY count DESC;
    `;
    const { rows: usageRows } = await pool.query(usageQuery);

    res.json({
      totalParcels: parseInt(dbStats.total_parcels),
      totalArea: parseFloat(dbStats.total_area),
      totalValuation: parseFloat(dbStats.total_valuation),
      usageBreakdown: usageRows,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Dashboard stats error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// ─── State-level Dashboard ───────────────────────────────────────────────────
exports.getStateDashboard = async (req, res) => {
  try {
    const { stateCode } = req.params;
    // For now, return parcels filtered by state if available in address
    const query = `
      SELECT id, plot_number, owner_name, parcel_area, valuation, usage, owner_color
      FROM land_parcels
      WHERE owner_address ILIKE $1
      ORDER BY id;
    `;
    const { rows } = await pool.query(query, [`%${stateCode}%`]);
    res.json({
      state: stateCode,
      parcels: rows,
      count: rows.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── Activity Feed ───────────────────────────────────────────────────────────
// Returns recent system activity (placeholder for real event tracking)
exports.getActivityFeed = async (req, res) => {
  try {
    // For now, return the most recently inserted parcels as "activity"
    const query = `
      SELECT id, plot_number, owner_name, usage, parcel_area, valuation
      FROM land_parcels
      ORDER BY id DESC
      LIMIT 10;
    `;
    const { rows } = await pool.query(query);
    const activities = rows.map(row => ({
      id: row.id,
      message: `Parcel ${row.plot_number} registered — ${row.owner_name} (${row.usage}, ${row.parcel_area} acres)`,
      timestamp: 'Recently',
      type: 'registration',
    }));

    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
