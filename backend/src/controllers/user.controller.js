// ─── User Controller ─────────────────────────────────────────────────────────
// Mock auth and profile endpoints. Will integrate with Firebase Auth later.

const mockUsers = {
  central: { id: 'usr-001', name: 'Dr. Anil Kumar', role: 'central', designation: 'Joint Secretary', department: 'Ministry of Land Resources', email: 'anil.kumar@gov.in' },
  state: { id: 'usr-002', name: 'Rajesh Patil', role: 'state', designation: 'Deputy Secretary', department: 'Revenue & Land Records Dept.', email: 'rajesh.patil@mh.gov.in', state: 'Maharashtra' },
  district: { id: 'usr-003', name: 'Amit Sharma', role: 'district', designation: 'District Collector & Magistrate', department: 'District Revenue Office, Pune', email: 'collector.pune@maharashtra.gov.in', district: 'Pune', state: 'Maharashtra' },
  landowner: { id: 'usr-004', name: 'Ramesh Patel', role: 'landowner', phone: '+91 98765 43210', village: 'Mandawali', district: 'Pune', state: 'Maharashtra', plotNumber: 'MH/PUN/MND/247-B' },
};

exports.login = (req, res) => {
  const { role, email, password } = req.body;
  
  if (!role) {
    return res.status(400).json({ error: 'role is required' });
  }

  const user = mockUsers[role];
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Mock token
  const token = Buffer.from(JSON.stringify({ userId: user.id, role: user.role })).toString('base64');

  res.json({
    token,
    user,
    message: 'Login successful',
  });
};

exports.getProfile = (req, res) => {
  const { id } = req.params;
  const user = Object.values(mockUsers).find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};