import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2,
  Building2, Shield, User, Globe, AlertCircle, HelpCircle, ChevronDown
} from 'lucide-react';

const NODAL_OFFICERS = [
  {
    role: "National Land Acquisition Commissioner",
    name: "Dr. Rajeshwar Rao, IAS",
    department: "Ministry of Rural Development & Land Resources",
    location: "Krishi Bhawan, New Delhi",
    email: "nlams.director@nic.in",
    phone: "+91 11 2338 4120",
    jurisdiction: "All India Policy & Appeals"
  },
  {
    role: "Special Land Acquisition Officer (West)",
    name: "Amit Sharma, IAS",
    department: "District Revenue Office & Collectorate",
    location: "Collectorate Compound, Pune, Maharashtra",
    email: "collector.pune@maharashtra.gov.in",
    phone: "+91 20 2612 3456",
    jurisdiction: "Pune, Satara & Western Ghats"
  },
  {
    role: "Chief Revenue Officer & Nodal Officer (North)",
    name: "Pooja Verma, PCS",
    department: "Uttar Pradesh Land Acquisition Authority",
    location: "Kaiserbagh Collectorate, Lucknow, Uttar Pradesh",
    email: "lao.lucknow@up.gov.in",
    phone: "+91 522 262 8901",
    jurisdiction: "Lucknow, Ayodhya & Purvanchal"
  },
  {
    role: "Joint Director (GIS & Survey)",
    name: "Dr. M. S. Venkatesh",
    department: "Karnataka Revenue & Survey Department",
    location: "Kandaya Bhawan, K.G. Road, Bengaluru, Karnataka",
    email: "surveydir@karnataka.gov.in",
    phone: "+91 80 2221 4455",
    jurisdiction: "Southern Industrial Corridors"
  }
];

const FAQS = [
  {
    q: "How is compensation calculated under RFCTLARR Act 2013?",
    a: "Compensation consists of: (1) Market Value determined from circle rates or average registered sale deeds, (2) Rural Multiplier of 1.25x to 2.0x, (3) 100% Solatium (mandatory statutory addition), and (4) 12% annual interest from Section 11 preliminary notification until award date."
  },
  {
    q: "How do I file an objection to a land acquisition notice?",
    a: "Under Section 15 of the Act, any affected landowner or citizen can submit written objections within 60 days of the Section 11 gazette publication. You can submit directly at the District Collector's office or through this portal."
  },
  {
    q: "How can I verify if my survey number is in the acquisition alignment?",
    a: "Open the 'Interactive GIS Map' on our portal, search by your Khasra / Survey Number or plot ID, and inspect the parcel boundary overlay and circle rate valuation."
  },
  {
    q: "What is Solatium?",
    a: "Solatium is a statutory monetary compensation equivalent to 100% of the total assessed market value of the land and all attached assets (wells, trees, structures) granted to acknowledge the compulsory nature of the acquisition."
  }
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    district: 'Pune',
    state: 'Maharashtra',
    category: 'Compensation Valuation Inquiry',
    khasraNo: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const ticketId = `TKT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1a1a2e]">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-orange-100" style={{ background: 'linear-gradient(135deg, #0D1F0A 0%, #122810 100%)' }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/hero-farm.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F0A] via-transparent to-[#0D1F0A]/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Phone size={14} className="text-orange-400" />
            24x7 Citizen Assistance & Support
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Contact & Grievance <span className="text-gradient-saffron">Helpdesk</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
            Connect directly with designated Land Acquisition Officers, track compensation status, or submit statutory objections under Section 15 of RFCTLARR Act 2013.
          </p>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card-tiranga rounded-2xl p-5 text-white">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400 mb-3">
                <Phone size={20} />
              </div>
              <div className="text-xs text-gray-300 font-medium">Toll-Free National Helpline</div>
              <div className="text-xl font-black text-white mt-1">1800-180-5263</div>
              <div className="text-[11px] text-emerald-400 mt-1">Available 24x7 (Hindi & English)</div>
            </div>

            <div className="glass-card-tiranga rounded-2xl p-5 text-white">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-3">
                <Mail size={20} />
              </div>
              <div className="text-xs text-gray-300 font-medium">Official Grievance Email</div>
              <div className="text-base font-black text-white mt-1">grievance@nlams.gov.in</div>
              <div className="text-[11px] text-gray-300 mt-1">Direct acknowledgment within 2 hrs</div>
            </div>

            <div className="glass-card-tiranga rounded-2xl p-5 text-white">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 mb-3">
                <Building2 size={20} />
              </div>
              <div className="text-xs text-gray-300 font-medium">Central Ministry Headquarters</div>
              <div className="text-base font-black text-white mt-1">Krishi Bhawan, New Delhi</div>
              <div className="text-[11px] text-gray-300 mt-1">Dept. of Land Resources, GoI</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Submit Inquiry / Grievance */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-100">
              <h2 className="text-2xl font-black text-[#1a1a2e] mb-2 flex items-center gap-2">
                <MessageSquare size={22} className="text-[#FF9933]" />
                Submit Citizen Inquiry or Objection
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                All submissions receive a real-time digital tracking ID and are routed to the Special LAO.
              </p>

              {submittedTicket ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">Grievance Registered Successfully</h3>
                  <p className="text-xs text-gray-600 mb-4">Your official tracking reference number is:</p>
                  <div className="inline-block px-4 py-2 rounded-xl bg-white border border-emerald-300 font-mono text-base font-black text-[#003580] shadow-sm mb-4">
                    {submittedTicket}
                  </div>
                  <p className="text-xs text-gray-500">
                    A verification SMS and email have been dispatched. The District Officer SLA for review is 7 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setForm({ name: '', email: '', phone: '', district: 'Pune', state: 'Maharashtra', category: 'Compensation Valuation Inquiry', khasraNo: '', message: '' });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#003580] hover:bg-[#002560] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patel"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Khasra / Survey Number</label>
                      <input
                        type="text"
                        placeholder="e.g. 142/1 or UP/LKO/100-A"
                        value={form.khasraNo}
                        onChange={e => setForm({ ...form, khasraNo: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">State</label>
                      <select
                        value={form.state}
                        onChange={e => setForm({ ...form, state: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-400 bg-white"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Inquiry Category *</label>
                      <select
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-400 bg-white"
                      >
                        <option value="Compensation Valuation Inquiry">Compensation Valuation Inquiry</option>
                        <option value="Section 15 Boundary Objection">Section 15 Boundary Objection</option>
                        <option value="Delayed DBT Payment">Delayed DBT Payment</option>
                        <option value="Mutation & Title Conflict">Mutation & Title Conflict</option>
                        <option value="RTI Information Request">RTI Information Request</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Details & Description *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please specify your query or objection details, including plot number and relevant revenue village..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF9933] to-[#E07800] hover:from-[#E07800] hover:to-[#FF9933] shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Send size={16} />
                    {submitting ? 'Registering with National Cadastral Helpdesk...' : 'Submit Inquiry to Special LAO'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Key Officers & Helpline Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-orange-100">
              <h3 className="text-lg font-black text-[#1a1a2e] mb-4 flex items-center gap-2">
                <Shield size={20} className="text-[#138808]" />
                Designated Land Acquisition Nodal Officers
              </h3>

              <div className="space-y-4">
                {NODAL_OFFICERS.map((off, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-orange-50/40 border border-orange-100 hover:border-orange-300 transition-colors">
                    <div className="text-[11px] font-bold text-[#FF9933] uppercase tracking-wider">{off.role}</div>
                    <div className="font-bold text-[#1a1a2e] text-sm mt-0.5">{off.name}</div>
                    <div className="text-xs text-gray-500">{off.department}</div>
                    <div className="text-xs text-gray-600 mt-2 flex items-center gap-1.5">
                      <MapPin size={13} className="text-gray-400 shrink-0" />
                      <span>{off.location}</span>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-orange-100/80 flex items-center justify-between text-xs">
                      <a href={`mailto:${off.email}`} className="font-semibold text-[#003580] hover:underline flex items-center gap-1">
                        <Mail size={12} /> Email
                      </a>
                      <a href={`tel:${off.phone}`} className="font-semibold text-gray-700 hover:text-orange-600 flex items-center gap-1">
                        <Phone size={12} /> {off.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-orange-100">
              <h3 className="text-lg font-black text-[#1a1a2e] mb-4 flex items-center gap-2">
                <HelpCircle size={20} className="text-blue-600" />
                Frequently Asked Questions
              </h3>

              <div className="space-y-2">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3.5 text-left text-xs font-bold text-gray-800 flex items-center justify-between hover:bg-orange-50/30 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={15}
                        className={`text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180 text-orange-500' : ''}`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-3.5 pt-0 text-xs text-gray-600 leading-relaxed bg-orange-50/20 border-t border-gray-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
