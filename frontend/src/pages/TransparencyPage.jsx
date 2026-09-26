import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Search, Download, Eye, FileText, CheckCircle2,
  AlertTriangle, Filter, ExternalLink, IndianRupee, Users,
  Landmark, Calendar, ArrowRight, Building2, MapPin, Globe, Check
} from 'lucide-react';

const GAZETTE_NOTIFICATIONS = [
  {
    id: "NOTIF-2026-MH-0891",
    section: "Section 11(1)",
    title: "Preliminary Notification for Pune–Satara Expressway 6-Lane Expansion",
    district: "Pune",
    state: "Maharashtra",
    areaAcres: 680.5,
    affectedVillages: ["Mandawali", "Khed-Shivapur", "Shiwal"],
    publishedDate: "2026-09-12",
    objectionDeadline: "2026-11-12",
    disbursedCrores: 45.2,
    totalBudgetCrores: 142.5,
    status: "Public Objections Open",
    siaAgency: "Gokhale Institute of Politics & Economics",
    gramSabhaStatus: "Passed (100% quorum)"
  },
  {
    id: "NOTIF-2026-UP-1402",
    section: "Section 19(1)",
    title: "Declaration of Acquisition for Lucknow Eastern Ring Road Corridor",
    district: "Lucknow",
    state: "Uttar Pradesh",
    areaAcres: 420.0,
    affectedVillages: ["Chinhat", "Gosainganj", "Mohanlalganj"],
    publishedDate: "2026-08-04",
    objectionDeadline: "Completed",
    disbursedCrores: 78.6,
    totalBudgetCrores: 95.0,
    status: "Award Declaration Finalized",
    siaAgency: "Tata Institute of Social Sciences (TISS)",
    gramSabhaStatus: "Ratified"
  },
  {
    id: "NOTIF-2026-GJ-0512",
    section: "Section 11(1)",
    title: "DMIC Industrial Feeder Corridor & Freight Rail Spur",
    district: "Ahmedabad",
    state: "Gujarat",
    areaAcres: 310.2,
    affectedVillages: ["Sanand", "Bavla", "Dholka"],
    publishedDate: "2026-09-01",
    objectionDeadline: "2026-10-31",
    disbursedCrores: 28.0,
    totalBudgetCrores: 92.0,
    status: "Hearing in Progress",
    siaAgency: "Gujarat Institute of Development Research",
    gramSabhaStatus: "Passed"
  },
  {
    id: "NOTIF-2026-KA-0774",
    section: "Section 23(1)",
    title: "Bengaluru Peripheral Ring Road Phase 1 Land Acquisition Award",
    district: "Bengaluru Urban",
    state: "Karnataka",
    areaAcres: 560.8,
    affectedVillages: ["Varthur", "Sarjapur", "Bidarahalli"],
    publishedDate: "2026-07-19",
    objectionDeadline: "Disbursal Stage",
    disbursedCrores: 210.4,
    totalBudgetCrores: 280.0,
    status: "Direct DBT Disbursal",
    siaAgency: "Institute for Social and Economic Change",
    gramSabhaStatus: "Approved with R&R package"
  },
  {
    id: "NOTIF-2026-WB-0331",
    section: "Section 4(2)",
    title: "Kolkata–Siliguri Economic Expressway Social Impact Assessment Notice",
    district: "North 24 Parganas",
    state: "West Bengal",
    areaAcres: 890.0,
    affectedVillages: ["Barasat", "Habra", "Gaighata"],
    publishedDate: "2026-09-18",
    objectionDeadline: "2026-11-18",
    disbursedCrores: 0.0,
    totalBudgetCrores: 195.0,
    status: "Social Impact Assessment",
    siaAgency: "Centre for Studies in Social Sciences",
    gramSabhaStatus: "Scheduled for Oct 2026"
  }
];

export default function TransparencyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [downloadingId, setDownloadingId] = useState(null);

  const filteredNotifs = useMemo(() => {
    return GAZETTE_NOTIFICATIONS.filter(n => {
      const matchSearch =
        !searchTerm ||
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchState = selectedState === 'ALL' || n.state === selectedState;
      return matchSearch && matchState;
    });
  }, [searchTerm, selectedState]);

  const handleDownloadGazette = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Gazette Notification ${id} verified via National Cadastral Registry (Cert-In signed). Simulated PDF opened.`);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1a1a2e]">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-orange-100" style={{ background: 'linear-gradient(135deg, #0D1F0A 0%, #122810 100%)' }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/hero-farm.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F0A] via-transparent to-[#0D1F0A]/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Shield size={14} className="text-orange-400" />
            RFCTLARR Act 2013 · Statutory Public Disclosures
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            National Land Acquisition <span className="text-gradient-saffron">Transparency Portal</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
            Access certified gazette notifications, social impact assessments (SIA), Gram Sabha quorum resolutions, and direct benefit transfer (DBT) compensation audit logs across all 28 States and Union Territories.
          </p>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card-tiranga rounded-2xl p-4 text-white">
              <div className="text-xs text-gray-300 font-medium">Published Gazette Notices</div>
              <div className="text-2xl font-black text-amber-400 mt-1">1,420+</div>
              <div className="text-[11px] text-emerald-400 mt-1">100% Digitized</div>
            </div>
            <div className="glass-card-tiranga rounded-2xl p-4 text-white">
              <div className="text-xs text-gray-300 font-medium">DBT Disbursed Compensation</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">₹14,850 Cr</div>
              <div className="text-[11px] text-gray-300 mt-1">Audited via PFMS</div>
            </div>
            <div className="glass-card-tiranga rounded-2xl p-4 text-white">
              <div className="text-xs text-gray-300 font-medium">SIA Quorum Compliance</div>
              <div className="text-2xl font-black text-sky-400 mt-1">99.4%</div>
              <div className="text-[11px] text-gray-300 mt-1">Gram Sabha verified</div>
            </div>
            <div className="glass-card-tiranga rounded-2xl p-4 text-white">
              <div className="text-xs text-gray-300 font-medium">Public Grievance Resolution</div>
              <div className="text-2xl font-black text-orange-400 mt-1">14.2 Days</div>
              <div className="text-[11px] text-emerald-400 mt-1">Average SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Search & Table Container ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-100/80">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-black text-[#1a1a2e] flex items-center gap-2">
                <FileText size={22} className="text-[#FF9933]" />
                Certified Public Gazette Disclosures & SIA Records
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Updated in real-time under Section 4, 11, 15, and 19 of the Right to Fair Compensation Act
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by project, gazette ID, or district..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-72 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:border-[#FF9933] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* State Filter */}
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-[#FF9933] bg-white cursor-pointer"
              >
                <option value="ALL">All States</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
          </div>

          {/* Notifications Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-orange-50/40">
                  <th className="px-5 py-4">Gazette ID & Act Section</th>
                  <th className="px-5 py-4">Project & Location</th>
                  <th className="px-5 py-4">Area & Villages</th>
                  <th className="px-5 py-4">Compensation Progress</th>
                  <th className="px-5 py-4">SIA Agency & Quorum</th>
                  <th className="px-5 py-4">Status & Gazette Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredNotifs.map((n) => (
                  <tr key={n.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-mono text-xs font-bold text-gray-800">{n.id}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-[#003580]">
                        {n.section}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-[#1a1a2e] max-w-xs">{n.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <MapPin size={12} className="text-orange-500" />
                        {n.district}, {n.state}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-mono font-bold text-gray-800">{n.areaAcres} Acres</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate max-w-[160px]" title={n.affectedVillages.join(', ')}>
                        {n.affectedVillages.join(', ')}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-[#138808]">₹{n.disbursedCrores} Cr</div>
                      <div className="text-xs text-gray-400">of ₹{n.totalBudgetCrores} Cr Total</div>
                      <div className="w-28 h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-emerald-600 rounded-full"
                          style={{ width: `${Math.round((n.disbursedCrores / n.totalBudgetCrores) * 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-xs font-semibold text-gray-700">{n.siaAgency}</div>
                      <div className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                        <Check size={12} /> {n.gramSabhaStatus}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
                        {n.status}
                      </span>
                      <div>
                        <button
                          onClick={() => handleDownloadGazette(n.id)}
                          disabled={downloadingId === n.id}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003580] hover:text-orange-600 transition-colors"
                        >
                          <Download size={13} />
                          {downloadingId === n.id ? 'Generating...' : 'Download Gazette (PDF)'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Social Audit & RTI Section ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
            <h3 className="font-bold text-[#1a1a2e] text-base flex items-center gap-2 mb-2">
              <Landmark size={18} className="text-orange-500" />
              Social Audit Committees
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every acquisition project over 100 acres is subject to independent social audit review comprising 50% non-official members, local farmers, and certified civil engineers.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
            <h3 className="font-bold text-[#1a1a2e] text-base flex items-center gap-2 mb-2">
              <Shield size={18} className="text-emerald-600" />
              RTI Section 4(1)(b) Compliance
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              All valuation formulas, circle rates, Solatium computations (100%), and 12% annual interest computations are proactive public disclosures under the RTI Act 2005.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
            <h3 className="font-bold text-[#1a1a2e] text-base flex items-center gap-2 mb-2">
              <Globe size={18} className="text-blue-600" />
              GIS Land Boundary Open Data
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Open cadastral boundaries can be independently cross-verified on our interactive map with ISRO Bhuvan satellite imagery and Survey of India coordinate baselines.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
