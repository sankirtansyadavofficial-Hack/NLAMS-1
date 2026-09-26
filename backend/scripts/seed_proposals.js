require('dotenv').config({ path: __dirname + '/../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function setupProposalsTable() {
  try {
    console.log('Connecting to Supabase PostgreSQL...');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS proposals (
        id VARCHAR(50) PRIMARY KEY,
        name TEXT NOT NULL,
        purpose VARCHAR(150),
        tehsil VARCHAR(100) DEFAULT 'Haveli',
        district VARCHAR(100) DEFAULT 'Pune',
        state VARCHAR(100) DEFAULT 'Maharashtra',
        department VARCHAR(200) DEFAULT 'National Highways Authority of India (NHAI)',
        area NUMERIC NOT NULL,
        families INT DEFAULT 0,
        compensation_est NUMERIC NOT NULL,
        description TEXT,
        gram_sabha_passed BOOLEAN DEFAULT TRUE,
        sia_completed BOOLEAN DEFAULT TRUE,
        status VARCHAR(50) DEFAULT 'Pending',
        status_note TEXT,
        rejection_reason TEXT,
        rejected_date VARCHAR(20),
        submitted_date VARCHAR(20) DEFAULT TO_CHAR(NOW(), 'YYYY-MM-DD'),
        ai_risk_score NUMERIC DEFAULT 12.0,
        ai_clearance_status VARCHAR(50) DEFAULT 'CLEAR',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ proposals table created or verified.');

    const seedProposals = [
      {
        id: "PROP-PUN-2026-001",
        name: "Pune–Satara Expressway Extension",
        purpose: "Expressway Widening",
        tehsil: "Haveli",
        area: 680,
        families: 210,
        compensation_est: 142.5,
        submitted_date: "2026-09-18",
        status: "Pending",
        status_note: "Under review by State Revenue Secretary. Preliminary SIA cleared.",
        ai_risk_score: 14.2,
        ai_clearance_status: "LOW_RISK"
      },
      {
        id: "PROP-PUN-2026-002",
        name: "Haveli Industrial Logistics Hub",
        purpose: "Industrial Infrastructure",
        tehsil: "Haveli",
        area: 450,
        families: 180,
        compensation_est: 95.0,
        submitted_date: "2026-09-10",
        status: "Approved",
        status_note: "Approved by State Govt. Forwarded to MoRTH for final clearance.",
        ai_risk_score: 8.5,
        ai_clearance_status: "CLEAR"
      },
      {
        id: "PROP-PUN-2026-003",
        name: "Pune Tech Park Zone B",
        purpose: "IT Infrastructure & SEZ",
        tehsil: "Pune City",
        area: 320,
        families: 95,
        compensation_est: 78.0,
        submitted_date: "2026-09-02",
        status: "Rejected",
        rejection_reason: "Environmental clearance certificate missing from SIA documentation and Gram Sabha resolution not attached.",
        rejected_date: "2026-09-14",
        status_note: "Requires resubmission with buffer zone analysis and local resolution.",
        ai_risk_score: 72.8,
        ai_clearance_status: "HIGH_OVERLAP_RISK"
      },
      {
        id: "PROP-PUN-2026-004",
        name: "NH-48 Land Acquisition Pune",
        purpose: "National Highway Expansion",
        tehsil: "Maval",
        area: 1250,
        families: 320,
        compensation_est: 185.5,
        submitted_date: "2025-06-10",
        status: "Live",
        status_note: "Fully approved & active in Compensation phase (78% disbursed).",
        ai_risk_score: 5.0,
        ai_clearance_status: "CLEAR"
      },
      {
        id: "PROP-PUN-2026-005",
        name: "Pune Ring Road Western Arc",
        purpose: "Outer Ring Road",
        tehsil: "Mulshi",
        area: 780,
        families: 290,
        compensation_est: 210.0,
        submitted_date: "2025-08-15",
        status: "Live",
        status_note: "Fully approved & active in Compensation phase (Delayed by court stay in Sector 4).",
        ai_risk_score: 28.4,
        ai_clearance_status: "LEGAL_STAY_MONITORED"
      },
      {
        id: "PROP-PUN-2026-006",
        name: "Mulshi Water Storage Reservoir",
        purpose: "Irrigation & Drinking Water",
        tehsil: "Mulshi",
        area: 890,
        families: 315,
        compensation_est: 160.0,
        submitted_date: "2026-08-28",
        status: "Approved",
        status_note: "Approved by State Cabinet. Final award declaration under progress.",
        ai_risk_score: 11.2,
        ai_clearance_status: "LOW_RISK"
      },
      {
        id: "PROP-PUN-2026-007",
        name: "Bhimashankar Eco-Tourism Corridor",
        purpose: "Tourism & Green Highway",
        tehsil: "Khed",
        area: 520,
        families: 140,
        compensation_est: 115.0,
        submitted_date: "2026-09-22",
        status: "Pending",
        status_note: "AI Forest Buffer Verification passed. Under public consultation review.",
        ai_risk_score: 9.8,
        ai_clearance_status: "ECO_CLEAR"
      }
    ];

    for (const p of seedProposals) {
      await pool.query(`
        INSERT INTO proposals (
          id, name, purpose, tehsil, area, families, compensation_est,
          submitted_date, status, status_note, rejection_reason, rejected_date,
          ai_risk_score, ai_clearance_status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          purpose = EXCLUDED.purpose,
          tehsil = EXCLUDED.tehsil,
          area = EXCLUDED.area,
          families = EXCLUDED.families,
          compensation_est = EXCLUDED.compensation_est,
          status = EXCLUDED.status,
          status_note = EXCLUDED.status_note,
          rejection_reason = EXCLUDED.rejection_reason,
          ai_risk_score = EXCLUDED.ai_risk_score,
          ai_clearance_status = EXCLUDED.ai_clearance_status;
      `, [
        p.id, p.name, p.purpose, p.tehsil, p.area, p.families, p.compensation_est,
        p.submitted_date, p.status, p.status_note || null, p.rejection_reason || null,
        p.rejected_date || null, p.ai_risk_score, p.ai_clearance_status
      ]);
    }

    const { rows } = await pool.query('SELECT count(*) FROM proposals');
    console.log(`🎉 Successfully seeded proposals in Supabase! Total proposals: ${rows[0].count}`);
  } catch (err) {
    console.error('Error seeding proposals:', err);
  } finally {
    await pool.end();
  }
}

setupProposalsTable();
