// ─── Notification Controller ─────────────────────────────────────────────────

exports.getNotifications = (req, res) => {
  const { user_id } = req.query;
  
  res.json([
    { id: 1, message: 'Your compensation second installment has been credited.', type: 'payment', read: false, timestamp: '2026-09-23T10:30:00Z' },
    { id: 2, message: 'Possession hearing scheduled for October 5, 2026.', type: 'hearing', read: false, timestamp: '2026-09-22T14:00:00Z' },
    { id: 3, message: 'Your grievance GRV-2026-0412 is under review.', type: 'grievance', read: true, timestamp: '2026-09-18T09:15:00Z' },
    { id: 4, message: 'New document uploaded: Award Order — Section 23.', type: 'document', read: true, timestamp: '2026-09-15T11:00:00Z' },
  ]);
};