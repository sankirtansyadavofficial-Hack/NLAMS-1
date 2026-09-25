// ─── Centralized API Service ─────────────────────────────────────────────────
// All frontend API calls route through here.
// Falls back to mock data when the backend is unreachable.

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Generic fetch wrapper with error handling and timeout
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(error.error || `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw err;
  }
}

// ─── Health Check ────────────────────────────────────────────────────────────
export async function checkHealth() {
  return request('/api/health');
}

// ─── Parcel APIs (already implemented in backend) ────────────────────────────
export async function getAllParcels() {
  return request('/api/parcels');
}

export async function searchParcel(plotNumber) {
  return request(`/api/parcels/search?plot_number=${encodeURIComponent(plotNumber)}`);
}

// ─── Dashboard / Stats APIs ─────────────────────────────────────────────────
export async function getDashboardStats() {
  return request('/api/dashboard/stats');
}

export async function getStateStats(stateCode) {
  return request(`/api/dashboard/states/${encodeURIComponent(stateCode)}`);
}

// ─── Project APIs ────────────────────────────────────────────────────────────
export async function getAllProjects() {
  return request('/api/projects');
}

export async function getProjectById(id) {
  return request(`/api/projects/${id}`);
}

export async function getProjectsByState(state) {
  return request(`/api/projects?state=${encodeURIComponent(state)}`);
}

// ─── Proposal APIs ──────────────────────────────────────────────────────────
export async function getAllProposals() {
  return request('/api/proposals');
}

export async function getProposalById(id) {
  return request(`/api/proposals/${id}`);
}

export async function createProposal(proposalData) {
  return request('/api/proposals', {
    method: 'POST',
    body: JSON.stringify(proposalData),
  });
}

export async function updateProposalStatus(id, status, note) {
  return request(`/api/proposals/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, note }),
  });
}


// ─── User / Auth APIs ───────────────────────────────────────────────────────
export async function loginUser(credentials) {
  return request('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function getUserProfile(userId) {
  return request(`/api/users/${userId}`);
}

// ─── Compensation APIs ──────────────────────────────────────────────────────
export async function getCompensationByParcel(parcelId) {
  return request(`/api/compensations?parcel_id=${parcelId}`);
}

export async function getCompensationStats() {
  return request('/api/compensations/stats');
}

// ─── Notification APIs ──────────────────────────────────────────────────────
export async function getNotifications(userId) {
  return request(`/api/notifications?user_id=${userId}`);
}

// ─── Document APIs ──────────────────────────────────────────────────────────
export async function getDocumentsByParcel(parcelId) {
  return request(`/api/documents?parcel_id=${parcelId}`);
}

// ─── Grievance APIs ─────────────────────────────────────────────────────────
export async function submitGrievance(grievanceData) {
  return request('/api/grievances', {
    method: 'POST',
    body: JSON.stringify(grievanceData),
  });
}

export async function getGrievancesByUser(userId) {
  return request(`/api/grievances?user_id=${userId}`);
}

// ─── Export base URL for components that need it directly ────────────────────
export { API_BASE };
