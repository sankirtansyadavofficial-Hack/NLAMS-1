// ─── Proposal Controller ────────────────────────────────────────────────────
// Serves proposal data. Currently returns in-memory mock data matching the
// frontend's proposalsData.js structure, ready to be backed by a DB table.

const proposals = [
  {
    id: 'PROP-MH-2026-001',
    name: 'NH-48 Highway Expansion',
    district: 'Pune',
    purpose: 'Highway Expansion',
    area: 450,
    families: 210,
    submittedDate: '2026-09-22',
    status: 'Pending',
    submittedBy: 'Amit Sharma (District Collector, Pune)',
    description: 'Acquisition of 450 acres across Haveli and Mandawali villages for 6-lane widening of National Highway 48.',
  },
  {
    id: 'PROP-MH-2026-002',
    name: 'NPCIL Power Plant Zone B',
    district: 'Nashik',
    purpose: 'Nuclear Power / Energy',
    area: 230,
    families: 145,
    submittedDate: '2026-09-20',
    status: 'Pending',
    submittedBy: 'Suresh Rao (District Collector, Nashik)',
    description: 'Acquisition of 230 acres in Sinnar tehsil for auxiliary cooling facility & safety buffer zone of NPCIL.',
  },
  {
    id: 'PROP-MH-2026-003',
    name: 'Nagpur Freight Corridor Railway Line',
    district: 'Nagpur',
    purpose: 'Railway Infrastructure',
    area: 380,
    families: 190,
    submittedDate: '2026-09-18',
    status: 'Pending',
    submittedBy: 'Praveen Deshmukh (District Collector, Nagpur)',
    description: 'Dedicated freight rail spur connecting MIHAN Multi-modal Hub to Central Railway main trunk line.',
  },
  {
    id: 'PROP-MH-2026-004',
    name: 'Mumbai Trans Harbour Approach Link',
    district: 'Mumbai',
    purpose: 'Urban Bridge & Expressway',
    area: 620,
    families: 280,
    submittedDate: '2026-09-10',
    status: 'Approved',
    submittedBy: 'Kavita Patil (District Collector, Mumbai)',
    description: 'Land acquisition for Eastern Freeway connecting elevated ramp to Sewri interchange.',
  },
  {
    id: 'PROP-MH-2026-005',
    name: 'Pune Tech Park Zone B',
    district: 'Pune',
    purpose: 'IT Infrastructure & SEZ',
    area: 320,
    families: 95,
    submittedDate: '2026-09-02',
    status: 'Rejected',
    rejectionReason: 'Environmental clearance certificate missing from SIA documentation and Gram Sabha resolution not attached.',
    submittedBy: 'Amit Sharma (District Collector, Pune)',
    description: 'Proposed 320-acre SEZ expansion near Hinjawadi Phase 4.',
  },
];

exports.getAllProposals = (req, res) => {
  const { status, district } = req.query;
  let filtered = proposals;
  if (status) filtered = filtered.filter(p => p.status.toLowerCase() === status.toLowerCase());
  if (district) filtered = filtered.filter(p => p.district.toLowerCase() === district.toLowerCase());
  res.json(filtered);
};

exports.getProposalById = (req, res) => {
  const proposal = proposals.find(p => p.id === req.params.id);
  if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
  res.json(proposal);
};

exports.createProposal = (req, res) => {
  const newProposal = {
    id: `PROP-MH-${new Date().getFullYear()}-${String(proposals.length + 1).padStart(3, '0')}`,
    ...req.body,
    status: 'Pending',
    submittedDate: new Date().toISOString().split('T')[0],
  };
  proposals.push(newProposal);
  res.status(201).json(newProposal);
};

exports.updateStatus = (req, res) => {
  const proposal = proposals.find(p => p.id === req.params.id);
  if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
  
  const { status, note } = req.body;
  proposal.status = status || proposal.status;
  if (note) proposal.statusNote = note;
  
  res.json(proposal);
};