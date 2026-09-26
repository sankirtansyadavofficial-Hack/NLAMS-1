const pool = require('../config/db');

class Proposal {
  static async getAll() {
    const query = `
      SELECT 
        id,
        name,
        purpose,
        tehsil,
        district,
        state,
        department,
        CAST(area AS FLOAT) AS area,
        families,
        CAST(compensation_est AS FLOAT) AS "compensationEst",
        description,
        gram_sabha_passed AS "gramSabhaPassed",
        sia_completed AS "siaCompleted",
        status,
        status_note AS "statusNote",
        rejection_reason AS "rejectionReason",
        rejected_date AS "rejectedDate",
        submitted_date AS "submittedDate",
        CAST(ai_risk_score AS FLOAT) AS "aiRiskScore",
        ai_clearance_status AS "aiClearanceStatus",
        created_at
      FROM proposals
      ORDER BY created_at DESC, id DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = `
      SELECT 
        id,
        name,
        purpose,
        tehsil,
        district,
        state,
        department,
        CAST(area AS FLOAT) AS area,
        families,
        CAST(compensation_est AS FLOAT) AS "compensationEst",
        description,
        gram_sabha_passed AS "gramSabhaPassed",
        sia_completed AS "siaCompleted",
        status,
        status_note AS "statusNote",
        rejection_reason AS "rejectionReason",
        rejected_date AS "rejectedDate",
        submitted_date AS "submittedDate",
        CAST(ai_risk_score AS FLOAT) AS "aiRiskScore",
        ai_clearance_status AS "aiClearanceStatus",
        created_at
      FROM proposals
      WHERE id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async create(data) {
    const countRes = await pool.query('SELECT COUNT(*) FROM proposals');
    const seq = Number(countRes.rows[0].count) + 1;
    const year = new Date().getFullYear();
    const id = data.id || `PROP-PUN-${year}-${String(seq).padStart(3, '0')}`;
    const submittedDate = data.submittedDate || new Date().toISOString().slice(0, 10);

    const query = `
      INSERT INTO proposals (
        id, name, purpose, tehsil, district, state, department,
        area, families, compensation_est, description,
        gram_sabha_passed, sia_completed, status, status_note,
        submitted_date, ai_risk_score, ai_clearance_status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11,
        $12, $13, $14, $15,
        $16, $17, $18
      )
      RETURNING 
        id, name, purpose, tehsil, district, state, department,
        CAST(area AS FLOAT) AS area,
        families,
        CAST(compensation_est AS FLOAT) AS "compensationEst",
        description,
        gram_sabha_passed AS "gramSabhaPassed",
        sia_completed AS "siaCompleted",
        status,
        status_note AS "statusNote",
        submitted_date AS "submittedDate",
        CAST(ai_risk_score AS FLOAT) AS "aiRiskScore",
        ai_clearance_status AS "aiClearanceStatus",
        created_at;
    `;

    const values = [
      id,
      data.projectName || data.name,
      data.purpose || 'Infrastructure Development',
      data.tehsil || 'Haveli',
      data.district || 'Pune',
      data.state || 'Maharashtra',
      data.acquiringDepartment || data.department || 'National Highways Authority of India (NHAI)',
      parseFloat(data.area) || 100,
      parseInt(data.families, 10) || 50,
      parseFloat(data.estimatedCompensation || data.compensationEst) || 50.0,
      data.description || '',
      data.gramSabhaPassed !== undefined ? Boolean(data.gramSabhaPassed) : true,
      data.siaCompleted !== undefined ? Boolean(data.siaCompleted) : true,
      data.status || 'Pending',
      data.statusNote || 'Submitted to State Revenue Department for Section 4 Gazette Clearance.',
      submittedDate,
      data.aiRiskScore || 11.5,
      data.aiClearanceStatus || 'CLEAR'
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async updateStatus(id, status, note) {
    const query = `
      UPDATE proposals
      SET status = $2, status_note = COALESCE($3, status_note)
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id, status, note]);
    return rows[0];
  }
}

module.exports = Proposal;