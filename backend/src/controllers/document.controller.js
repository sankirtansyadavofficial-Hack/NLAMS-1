// ─── Document Controller ─────────────────────────────────────────────────────
// Returns document metadata for a parcel/project.

exports.getDocuments = (req, res) => {
  const { parcel_id } = req.query;
  
  res.json([
    { id: 1, name: 'Section 11 Notification', type: 'notification', dateIssued: '2025-06-12', fileSize: '245 KB', available: true },
    { id: 2, name: 'Social Impact Assessment Report', type: 'report', dateIssued: '2025-07-20', fileSize: '1.2 MB', available: true },
    { id: 3, name: 'Award Order — Section 23', type: 'award', dateIssued: '2025-10-18', fileSize: '380 KB', available: true },
    { id: 4, name: 'Compensation Sanction Letter', type: 'compensation', dateIssued: '2025-11-05', fileSize: '190 KB', available: true },
    { id: 5, name: 'R&R Scheme Eligibility Certificate', type: 'rrScheme', dateIssued: '2026-01-10', fileSize: '120 KB', available: true },
    { id: 6, name: 'Possession Notice', type: 'possession', dateIssued: null, fileSize: null, available: false },
  ]);
};