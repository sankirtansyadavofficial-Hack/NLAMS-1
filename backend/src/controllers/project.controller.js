// ─── Project Controller ─────────────────────────────────────────────────────
// Serves project data matching the frontend's dashboardData.js/stateData.js structure.

const projects = [
  { id: 1, name: 'NH-48 Land Acquisition Pune', state: 'Maharashtra', purpose: 'National Highway Expansion', area: 1250, status: 'Ongoing', familiesAffected: 320, compensationCr: 185.5, lastUpdated: '2026-09-22' },
  { id: 2, name: 'NPCIL Gorakhpur Site B', state: 'Uttar Pradesh', purpose: 'Nuclear Power Plant', area: 2400, status: 'Ongoing', familiesAffected: 890, compensationCr: 420.0, lastUpdated: '2026-09-21' },
  { id: 3, name: 'Jaipur Metro Phase III', state: 'Rajasthan', purpose: 'Metro Rail Corridor', area: 680, status: 'Completed', familiesAffected: 210, compensationCr: 145.2, lastUpdated: '2026-09-18' },
  { id: 4, name: 'Chennai Peripheral Ring Road', state: 'Tamil Nadu', purpose: 'Ring Road Construction', area: 1580, status: 'Ongoing', familiesAffected: 540, compensationCr: 312.8, lastUpdated: '2026-09-23' },
  { id: 5, name: 'DMIC Dholera SIR Phase II', state: 'Gujarat', purpose: 'Industrial Corridor', area: 3200, status: 'Completed', familiesAffected: 180, compensationCr: 520.0, lastUpdated: '2026-09-15' },
  { id: 6, name: 'Bangalore Suburban Rail', state: 'Karnataka', purpose: 'Suburban Railway', area: 920, status: 'Delayed', familiesAffected: 410, compensationCr: 278.5, lastUpdated: '2026-09-20' },
  { id: 7, name: 'Narmada Canal Network Extension', state: 'Madhya Pradesh', purpose: 'Irrigation Canal', area: 4500, status: 'Ongoing', familiesAffected: 1200, compensationCr: 380.0, lastUpdated: '2026-09-22' },
  { id: 8, name: 'Kolkata East-West Corridor', state: 'West Bengal', purpose: 'Metro Rail Extension', area: 450, status: 'Delayed', familiesAffected: 680, compensationCr: 195.3, lastUpdated: '2026-09-19' },
  { id: 9, name: 'Hyderabad ORR Phase II', state: 'Telangana', purpose: 'Outer Ring Road', area: 1100, status: 'Completed', familiesAffected: 290, compensationCr: 225.0, lastUpdated: '2026-09-16' },
  { id: 10, name: 'Amaravati Capital City Block D', state: 'Andhra Pradesh', purpose: 'Capital City Development', area: 2800, status: 'Delayed', familiesAffected: 950, compensationCr: 610.0, lastUpdated: '2026-09-21' },
];

exports.getAllProjects = (req, res) => {
  const { state, status } = req.query;
  let filtered = projects;
  if (state) filtered = filtered.filter(p => p.state.toLowerCase() === state.toLowerCase());
  if (status) filtered = filtered.filter(p => p.status.toLowerCase() === status.toLowerCase());
  res.json(filtered);
};

exports.getProjectById = (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
};