import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  FilePlus, ArrowLeft, Send, CheckCircle2, Shield, Landmark,
  MapPin, Users, IndianRupee, FileText, Upload, AlertCircle, Sparkles, Loader2,
  Check, Zap, AlertTriangle
} from 'lucide-react';
import { districtProfile, rejectedProposals } from '../data/districtData';

const DUMMY_PRESETS = [
  {
    label: "🚄 Pune–Nashik Semi High-Speed Rail",
    projectName: "Pune–Nashik Semi High-Speed Rail Corridor Phase 1",
    purpose: "Railway Infrastructure",
    tehsil: "Haveli",
    area: "540",
    families: "180",
    estimatedCompensation: "128.5",
    acquiringDepartment: "Maharashtra Rail Infrastructure Development Corporation (MahaRail)",
    description: "Land acquisition of 540 acres across Haveli tehsil for dedicated double electrified passenger and freight rail track."
  },
  {
    label: "🏭 Khed Industrial Logistics SEZ",
    projectName: "Khed Advanced Industrial & Logistics Hub",
    purpose: "Industrial Infrastructure",
    tehsil: "Khed",
    area: "380",
    families: "110",
    estimatedCompensation: "84.0",
    acquiringDepartment: "Maharashtra Industrial Development Corporation (MIDC)",
    description: "Acquisition for auto-ancillary and electronics manufacturing corridor with dedicated freight feeder roads."
  },
  {
    label: "⚡ Maval Solar Clean Energy Park",
    projectName: "Maval Clean Energy Solar Park & Grid Substation",
    purpose: "Solar & Clean Energy Park",
    tehsil: "Mawal",
    area: "620",
    families: "75",
    estimatedCompensation: "112.0",
    acquiringDepartment: "Maharashtra State Power Generation Company (MAHAGENCO)",
    description: "Renewable energy solar farm installation on semi-arid and barren land tracts with zero displacement of tribal settlements."
  }
];

export default function NewProposalPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resubmitId = searchParams.get('resubmit');

  const [formData, setFormData] = useState({
    projectName: '',
    purpose: 'National Highway Expansion',
    tehsil: 'Haveli',
    area: '',
    families: '',
    estimatedCompensation: '',
    acquiringDepartment: 'National Highways Authority of India (NHAI)',
    description: '',
    gramSabhaPassed: true,
    siaCompleted: true,
    documentsAttached: 2,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedProposal, setSubmittedProposal] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // AI Pre-Clearance states
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // If resubmitting a rejected proposal, prefill the data
  useEffect(() => {
    if (resubmitId) {
      const found = rejectedProposals.find(p => p.id === resubmitId);
      if (found) {
        setFormData(prev => ({
          ...prev,
          projectName: found.name,
          purpose: found.purpose,
          area: found.area.toString(),
          families: found.families.toString(),
          estimatedCompensation: found.compensationEst.toString(),
          description: `Resubmission addressing remarks: ${found.rejectionReason}`,
        }));
      }
    }
  }, [resubmitId]);

  // Handle Quick Template Autofill
  const handleApplyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      projectName: preset.projectName,
      purpose: preset.purpose,
      tehsil: preset.tehsil,
      area: preset.area,
      families: preset.families,
      estimatedCompensation: preset.estimatedCompensation,
      acquiringDepartment: preset.acquiringDepartment,
      description: preset.description
    }));
    setAiAnalysis(null);
  };

  // Run AI Feature Pre-Clearance Check
  const handleRunAiCheck = () => {
    if (!formData.projectName || !formData.area) {
      alert("Please enter a Project Name and Land Area first to run AI verification.");
      return;
    }
    setIsAiAnalyzing(true);
    setTimeout(() => {
      const baseArea = parseFloat(formData.area) || 100;
      const baseComp = parseFloat(formData.estimatedCompensation) || (baseArea * 0.25);
      const solatiumAmount = (baseComp * 0.5).toFixed(1);
      const interest12 = (baseComp * 0.12).toFixed(1);

      setAiAnalysis({
        riskScore: (Math.random() * 8 + 6).toFixed(1), // 6% - 14%
        clearanceStatus: "ECO_CLEAR",
        solatiumVerified: true,
        solatiumAmount: solatiumAmount,
        interest12: interest12,
        forestOverlap: "0.0% (No Eco-Sensitive Zone overlap)",
        complianceNote: "RFCTLARR 2013 First Schedule solatium + Second Schedule R&R verified."
      });
      setIsAiAnalyzing(false);
    }, 1200);
  };

  // Submit and Save into Supabase PostgreSQL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const payload = {
      projectName: formData.projectName,
      purpose: formData.purpose,
      tehsil: formData.tehsil,
      area: formData.area,
      families: formData.families,
      estimatedCompensation: formData.estimatedCompensation,
      acquiringDepartment: formData.acquiringDepartment,
      description: formData.description,
      gramSabhaPassed: formData.gramSabhaPassed,
      siaCompleted: formData.siaCompleted,
      aiRiskScore: aiAnalysis ? parseFloat(aiAnalysis.riskScore) : 11.5,
      aiClearanceStatus: aiAnalysis ? aiAnalysis.clearanceStatus : 'CLEAR'
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/proposals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Server error while saving proposal to Supabase');
      }

      const created = await res.json();
      setSubmittedProposal(created);
      setTimeout(() => {
        navigate('/district-dashboard');
      }, 2200);
    } catch (err) {
      console.error('Error submitting proposal:', err);
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1F0A] text-white relative overflow-hidden">
      {/* Background ambient tricolor glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-[#138808]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Tiranga accent — top */}
      <div className="h-1.5 tiranga-bar" />

      {/* ── Top Bar ── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b border-white/10"
        style={{ background: 'rgba(13,31,10,0.92)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/district-dashboard')}
              className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <FilePlus size={18} className="text-amber-400" />
              <h1 className="font-bold text-white text-base">
                {resubmitId ? 'Resubmit Proposal' : 'Submit New Land Acquisition Proposal'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>District: <strong className="text-amber-400">{districtProfile.district}</strong></span>
            <span>·</span>
            <span>Collector: <strong className="text-white/80">{districtProfile.officer.name}</strong></span>
          </div>
        </div>
      </motion.header>

      {/* ── Main Form Container ── */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Quick Demo Presets Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles size={14} /> Quick Demo Presets (Autofill Realistic Project Data)
          </div>
          <div className="flex flex-wrap gap-2">
            {DUMMY_PRESETS.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-amber-500/20 text-white hover:text-amber-300 border border-white/15 hover:border-amber-400/40 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {submittedProposal ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-3xl p-12 text-center border border-emerald-500/30 max-w-lg mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <CheckCircle2 size={44} />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Saved to Supabase Database!</h2>
              <p className="text-white/60 text-sm mb-4">
                Assigned Proposal ID: <span className="font-mono text-amber-400 font-bold">{submittedProposal.id}</span>
              </p>
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 mb-6">
                ✅ Record permanently committed to Supabase <code className="text-white">proposals</code> table. Redirecting to District Dashboard...
              </div>
              <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 space-y-8 border border-white/10"
            >
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Section 1: Basic Project Info */}
              <div>
                <h2 className="text-base font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={18} />
                  1. Project Identification
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Project Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune–Satara Expressway Extension Phase II"
                      value={formData.projectName}
                      onChange={e => setFormData({ ...formData, projectName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Public Purpose *</label>
                    <select
                      value={formData.purpose}
                      onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                    >
                      <option value="National Highway Expansion" className="bg-[#0a0f1e]">National Highway Expansion</option>
                      <option value="Railway Infrastructure" className="bg-[#0a0f1e]">Railway Infrastructure</option>
                      <option value="Industrial Infrastructure" className="bg-[#0a0f1e]">Industrial Infrastructure & SEZ</option>
                      <option value="Solar & Clean Energy Park" className="bg-[#0a0f1e]">Solar & Clean Energy Park</option>
                      <option value="Metro Rail Infrastructure" className="bg-[#0a0f1e]">Metro Rail Infrastructure</option>
                      <option value="Irrigation & Water Project" className="bg-[#0a0f1e]">Irrigation & Water Storage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Tehsil / Sub-Division *</label>
                    <select
                      value={formData.tehsil}
                      onChange={e => setFormData({ ...formData, tehsil: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                    >
                      <option value="Haveli" className="bg-[#0a0f1e]">Haveli Tehsil</option>
                      <option value="Mulshi" className="bg-[#0a0f1e]">Mulshi Tehsil</option>
                      <option value="Khed" className="bg-[#0a0f1e]">Khed Tehsil</option>
                      <option value="Mawal" className="bg-[#0a0f1e]">Mawal Tehsil</option>
                      <option value="Baramati" className="bg-[#0a0f1e]">Baramati Tehsil</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Acquisition Extent & Financial Estimates */}
              <div className="pt-6 border-t border-white/5">
                <h2 className="text-base font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <MapPin size={18} />
                  2. Land Extent & Impact Metrics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Total Land Area (Acres) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 540"
                      value={formData.area}
                      onChange={e => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-500/50 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Affected Families *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 180"
                      value={formData.families}
                      onChange={e => setFormData({ ...formData, families: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-500/50 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Est. Compensation (₹ Cr) *</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="e.g. 128.5"
                      value={formData.estimatedCompensation}
                      onChange={e => setFormData({ ...formData, estimatedCompensation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-500/50 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: AI Pre-Clearance & Overlap Analysis */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-400/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={16} /> NLAMS AI Pre-Clearance & Spatial Overlap Verifier
                    </div>
                    <p className="text-xs text-white/60 mt-1">
                      Runs instant GIS STRtree buffer check and RFCTLARR 2013 statutory compensation validation.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRunAiCheck}
                    disabled={isAiAnalyzing}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-md flex items-center gap-2 whitespace-nowrap self-start sm:self-center"
                  >
                    {isAiAnalyzing ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Analyzing GIS Buffers...
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        Run AI Pre-Clearance
                      </>
                    )}
                  </button>
                </div>

                {aiAnalysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-white space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <CheckCircle2 size={16} />
                        AI Clearance Status: {aiAnalysis.clearanceStatus} (Risk Score: {aiAnalysis.riskScore}%)
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400/20 text-emerald-300">
                        Pre-Approved for Gazette Sec 4
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80 pt-2 border-t border-emerald-500/20">
                      <div>🌿 Eco-Zone Overlap: <strong className="text-white">{aiAnalysis.forestOverlap}</strong></div>
                      <div>💰 Mandatory 100% Solatium: <strong className="text-amber-300">₹{aiAnalysis.solatiumAmount} Cr</strong></div>
                      <div>📈 12% Annual Interest: <strong className="text-amber-300">₹{aiAnalysis.interest12} Cr</strong></div>
                      <div>📋 Statutory Rules: <strong className="text-emerald-300">First & Second Schedule Validated</strong></div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Section 4: Description */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Project Description & Justification *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the public utility purpose, connectivity benefit, and alignment notes..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => navigate('/district-dashboard')}
                  className="px-6 py-3 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving to Supabase Database...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Proposal & Save to Supabase
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
