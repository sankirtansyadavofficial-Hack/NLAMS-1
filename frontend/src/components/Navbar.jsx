import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronDown, Bell, LogOut,
  LayoutDashboard, FileText, Map, Shield, Globe
} from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

const navLinks = [
  { label: 'Home', path: '/', hasDropdown: false },
  {
    label: 'Platform',
    hasDropdown: true,
    dropdown: [
      { label: 'Dashboard', icon: <LayoutDashboard size={15} />, path: '/district-dashboard' },
      { label: 'Land Map (GIS)', icon: <Map size={15} />, path: '/map' },
      { label: 'Proposals', icon: <FileText size={15} />, path: '/proposals' },
      { label: 'Compliance', icon: <Shield size={15} />, path: '/compliance' },
    ],
  },
  { label: 'About NLAMS', path: '/about', hasDropdown: false },
  { label: 'Transparency Portal', path: '/transparency', hasDropdown: false },
  { label: 'Contact', path: '/contact', hasDropdown: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleSignIn = async () => {
    try {
      await loginWithRedirect({ appState: { returnTo: '/district-dashboard' } });
    } catch (err) {
      console.warn('Auth0 redirect error, falling back to /auth:', err);
      navigate('/auth');
    }
  };

  const handleSignUp = async () => {
    try {
      await loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
    } catch (err) {
      console.warn('Auth0 signup redirect error, falling back to /auth:', err);
      navigate('/auth?tab=register');
    }
  };

  const isHome = location.pathname === '/';
  const isNavSolid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      {/* Tiranga accent strip — ultra thin */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 tiranga-bar" />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ${
          isNavSolid
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-orange-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
                className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 shadow-md"
                style={{ background: 'linear-gradient(135deg, #FF9933, #fff, #138808)' }}
              >
                <span className="w-full h-full flex items-center justify-center text-lg">🇮🇳</span>
              </motion.div>
              <div>
                <div
                  className={`font-black text-lg leading-tight tracking-tight ${
                    isNavSolid ? 'text-[#003580]' : 'text-white'
                  }`}
                >
                  NLAMS
                </div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-[#138808]">
                  Govt. of India
                </div>
              </div>
            </Link>

            {/* ── Desktop Links ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.hasDropdown ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                        ${isNavSolid
                          ? 'text-gray-700 hover:text-[#FF9933] hover:bg-orange-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {link.label}
                      <motion.span
                        animate={{ rotate: activeDropdown === idx ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={13} />
                      </motion.span>
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        location.pathname === link.path
                          ? 'text-[#FF9933] bg-orange-50'
                          : isNavSolid
                          ? 'text-gray-700 hover:text-[#FF9933] hover:bg-orange-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl p-2 border border-orange-100"
                      >
                        {link.dropdown.map((item, i) => (
                          <Link
                            key={i}
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 hover:text-[#FF9933] hover:bg-orange-50 transition-all duration-150 group"
                          >
                            <span className="text-[#138808] group-hover:text-[#FF9933] transition-colors">
                              {item.icon}
                            </span>
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* ── Right Actions ── */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2.5 rounded-xl transition-all relative ${
                  isNavSolid
                    ? 'text-gray-500 hover:text-[#FF9933] hover:bg-orange-50'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF9933] rounded-full animate-pulse" />
              </motion.button>

              {!isAuthenticated ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleSignIn}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                      isNavSolid
                        ? 'text-[#003580] border-[#003580]/30 hover:bg-[#003580]/5'
                        : 'text-white border-white/30 hover:bg-white/10'
                    }`}
                  >
                    Sign In
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleSignUp}
                    className="btn-glow px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #FF9933, #E07800)',
                      boxShadow: '0 4px 18px rgba(255,153,51,0.35)',
                    }}
                  >
                    Get Started
                  </motion.button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 ${isNavSolid ? 'text-gray-700' : 'text-white'}`}>
                    <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-[#FF9933]" />
                    <span className="text-sm font-semibold">{user.name}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    className={`p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all flex items-center gap-1 text-sm font-semibold`}
                  >
                    <LogOut size={16} />
                    Logout
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile burger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all ${
                isNavSolid ? 'text-gray-700' : 'text-white'
              }`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-orange-100 overflow-hidden shadow-xl"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link, idx) => (
                  <div key={idx}>
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:text-[#FF9933] hover:bg-orange-50 transition-all"
                        >
                          {link.label}
                          <ChevronDown
                            size={14}
                            className={`transition-transform text-gray-400 ${activeDropdown === idx ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === idx && (
                            <motion.div
                              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {link.dropdown.map((item, i) => (
                                <Link
                                  key={i} to={item.path}
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-[#FF9933] hover:bg-orange-50 transition-all"
                                >
                                  <span className="text-[#138808]">{item.icon}</span>
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className="block px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:text-[#FF9933] hover:bg-orange-50 transition-all"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 flex flex-col gap-3 border-t border-orange-100">
                  {!isAuthenticated ? (
                    <>
                      <button
                        onClick={handleSignIn}
                        className="w-full py-3 rounded-xl text-sm font-semibold text-[#003580] border border-[#003580]/30 hover:bg-blue-50 transition-all"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={handleSignUp}
                        className="w-full py-3 rounded-xl text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #FF9933, #E07800)' }}
                      >
                        Get Started Free
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-red-500 border border-red-500/30 hover:bg-red-50 transition-all"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
