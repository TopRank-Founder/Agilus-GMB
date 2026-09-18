import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Instagram, 
  Facebook, 
  Truck, 
  FlaskConical, 
  HelpCircle, 
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { AgilusLogo } from './AgilusLogo';
import { LOCALIZATION } from '../localization';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0d10] text-gray-300 pt-12 pb-24 md:pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-google-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Brand & Fast Contact Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          <div className="lg:col-span-5 space-y-4">
            <AgilusLogo variant="white" className="h-8 w-auto" />
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
              <strong className="text-white">Agilus Diagnostics (formerly SRL Diagnostics)</strong> is Mohali's premier NABL accredited pathology and diagnostic center in Sector 69. Providing hospital-grade diagnostic integrity, automated sample analysis, and complimentary 24/7 doorstep blood test home collection across Mohali, Kharar, and Tricity.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-emerald-400 font-semibold border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5" /> NABL Accredited Lab
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-blue-400 font-semibold border border-white/5">
                <Clock className="w-3.5 h-3.5" /> 24/7 Home Pickup
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* WhatsApp Booking Card */}
            <a
              href="https://wa.me/919115459115?text=Hi%2C%20I%20want%20to%20book%20a%20blood%20test%20home%20collection%20in%20Mohali."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-[#128C7E]/20 to-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  Instant WhatsApp Booking
                </div>
                <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                  Chat with Phlebotomist
                </div>
                <div className="text-[11px] text-gray-400 font-medium">Reports sent directly to WhatsApp</div>
              </div>
            </a>

            {/* Direct Phone Call Card */}
            <a
              href="tel:09115459115"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-google-blue/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-google-blue text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-wider text-blue-400">
                  Customer Support Hotline
                </div>
                <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  +91 91154 59115
                </div>
                <div className="text-[11px] text-gray-400 font-medium">Sector 69, Mohali Branch</div>
              </div>
            </a>
          </div>
        </div>

        {/* 4-Column Topical Internal Linking Structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-white/10 text-xs">
          {/* Silo 1: At-Home Healthcare (Mohali) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-google-blue" />
              At-Home Healthcare
            </h3>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <RouterLink
                  to="/home-collection"
                  className="hover:text-google-blue transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-google-blue/60" />
                  <span className="font-semibold text-gray-200 hover:text-white">
                    Blood Test Home Collection Mohali
                  </span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/home-collection"
                  className="hover:text-google-blue transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-google-blue/60" />
                  <span>Doorstep Blood Sample Pickup</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/home-collection#health-packages"
                  className="hover:text-google-blue transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-google-blue/60" />
                  <span>Full Body Health Checkup At Home</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/home-collection#health-packages"
                  className="hover:text-google-blue transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-google-blue/60" />
                  <span>Senior Citizen Health Screening</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/home-collection#booking-form"
                  className="hover:text-google-blue transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-google-blue/60" />
                  <span>Fasting Blood Sugar & Lipid Pickup</span>
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Silo 2: Diagnostic Services & Pathology Tests */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-400" />
              Diagnostic Services
            </h3>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <RouterLink
                  to="/services"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400/60" />
                  <span className="font-semibold text-gray-200 hover:text-white">
                    Diagnostic Services in Mohali
                  </span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/services"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400/60" />
                  <span>Complete Blood Count (CBC Test)</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/services"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400/60" />
                  <span>Thyroid Profile (T3, T4, TSH)</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/services"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400/60" />
                  <span>Lipid & Cholesterol Profile</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/services"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400/60" />
                  <span>Diabetes Screening (HbA1c & Glucose)</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/services"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400/60" />
                  <span>Liver (LFT) & Kidney Function (KFT)</span>
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Silo 3: Patient Trust & E-E-A-T */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              Patient Trust & Info
            </h3>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <RouterLink
                  to="/about"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-orange-400/60" />
                  <span className="font-semibold text-gray-200 hover:text-white">
                    About SRL Agilus Mohali
                  </span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/about"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-orange-400/60" />
                  <span>NABL Accredited Lab Standards</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/faq"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-orange-400/60" />
                  <span>Blood Test Preparation FAQs</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/faq"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-orange-400/60" />
                  <span>Fasting Blood Test Guidelines</span>
                </RouterLink>
              </li>
              <li>
                <a
                  href="https://reports.agilus.in/secure/login.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3 text-orange-400" />
                  <span>Download Patient Lab Reports</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Silo 4: Local Reach & Service Areas */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400" />
              Mohali Service Areas
            </h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Centrally based in Sector 69 with dedicated phlebotomist zones across:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Sector 69',
                'Sector 70',
                'Sector 71',
                'Sector 68',
                'Sector 67',
                'Phase 1 to 11',
                'Aerocity',
                'IT City',
                'Kharar',
                'Kumbra',
                'Sohana',
              ].map((area) => (
                <RouterLink
                  key={area}
                  to="/home-collection"
                  className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-google-blue hover:text-white transition-colors text-[10px] text-gray-300 font-medium border border-white/5"
                  title={`Blood test home collection in ${area}, Mohali`}
                >
                  {area}
                </RouterLink>
              ))}
            </div>
            <div className="pt-2 text-[11px] text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Doorstep phlebotomist available now</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Social & Accreditation */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <p className="text-center sm:text-left leading-relaxed">
            © {currentYear} TopRank Health Care. Authorized Diagnostic Franchise of Agilus Diagnostics (formerly SRL), Sector 69 Mohali. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/srl_lab_mohali_home_collection/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-[#E1306C] text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/SRLLabMohali/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-[#1877F2] text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://maps.app.goo.gl/tPN5MedC4LLAbe4P8"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-google-blue text-gray-300 hover:text-white transition-colors"
                aria-label="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-4 text-gray-400 uppercase tracking-widest font-semibold text-[10px]">
              <RouterLink to="/" className="hover:text-white transition-colors">Home</RouterLink>
              <RouterLink to="/services" className="hover:text-white transition-colors">Services</RouterLink>
              <RouterLink to="/home-collection" className="hover:text-white transition-colors">Home Collection</RouterLink>
              <RouterLink to="/about" className="hover:text-white transition-colors">About</RouterLink>
              <RouterLink to="/faq" className="hover:text-white transition-colors">FAQs</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
