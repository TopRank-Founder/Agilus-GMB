import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Smartphone, 
  Mail, 
  ShieldCheck, 
  Star, 
  ChevronDown, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Sparkles, 
  Droplets, 
  Activity, 
  HeartPulse, 
  Award, 
  Home, 
  FileText, 
  ArrowRight,
  Stethoscope,
  Building2,
  Check
} from "lucide-react";
import { LOCALIZATION } from '../localization';
import { AgilusLogo } from "../components/AgilusLogo";
import { BottomNav } from '../components/BottomNav';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { useSEO } from "../hooks/useSEO";

// Google G Logo Component
const GoogleGLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

// Verified Google Reviews Data
const verifiedReviews = [
  {
    name: "Gurpreet Singh",
    rating: 5,
    date: "1 week ago",
    avatarBg: "bg-emerald-600",
    service: "Full Body Checkup Home Collection - Sector 69",
    comment: "Booked SRL / Agilus home collection for my elderly parents in Sector 69 Mohali. The phlebotomist reached sharp at 6:30 AM with sealed vacutainers and proper cold-chain kits. Super smooth vein prick and got WhatsApp reports the same evening!",
  },
  {
    name: "Pooja Sharma",
    rating: 5,
    date: "2 weeks ago",
    avatarBg: "bg-indigo-600",
    service: "Complete Hemogram & Thyroid Profile",
    comment: "Prompt blood test service at home in Mohali. Clean hygiene, gloves, barcode-tagged tubes, and 100% transparent pricing. Best diagnostic lab experience in Tricity.",
  },
  {
    name: "Rajeev Singla",
    rating: 5,
    date: "3 weeks ago",
    avatarBg: "bg-blue-600",
    service: "Diabetes Care & Lipid Profile",
    comment: "I have been using SRL Diagnostics Mohali for routine fasting blood tests. Booking was seamless via WhatsApp. Phlebotomist was polite and very gentle with sample collection.",
  },
  {
    name: "Simran Kaur",
    rating: 5,
    date: "1 month ago",
    avatarBg: "bg-purple-600",
    service: "Vitamin D3 & B12 Home Pickup",
    comment: "Highly recommend SRL / Agilus Sector 69 for home sample collection in Mohali. Report accuracy is trusted by PGI and Fortis doctors. Very satisfied with the timely delivery.",
  },
  {
    name: "Amit Malhotra",
    rating: 5,
    date: "1 month ago",
    avatarBg: "bg-rose-600",
    service: "Senior Citizen Wellness Package",
    comment: "Zero waiting time at home! Phlebotomist followed complete sterile procedure. NABL accredited certified reports received on WhatsApp and email on time.",
  },
  {
    name: "Deepak Verma",
    rating: 5,
    date: "2 months ago",
    avatarBg: "bg-amber-600",
    service: "Liver & Kidney Function Tests (LFT/KFT)",
    comment: "Very professional team. They covered Sector 70 Mohali within 30 minutes of urgent booking. Great customer support and verified digital reports.",
  }
];

// Home Collection FAQs
const homeCollectionFaqs: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: "How do I book a blood test home collection in Mohali?",
    a: (
      <span>
        You can book home collection by submitting our quick online form above, calling our dedicated helpline at{" "}
        <a href="tel:+919115459115" className="font-bold text-google-blue hover:underline">
          +91 91154 59115
        </a>
        , or browsing our catalog of{" "}
        <RouterLink to="/services" className="font-bold text-google-blue hover:underline">
          diagnostic services in Mohali
        </RouterLink>
        . Our coordinator will immediately confirm your convenient time slot.
      </span>
    ),
  },
  {
    q: "Is home collection available across all sectors of Mohali?",
    a: (
      <span>
        Yes! We cover all sectors of Mohali including Sector 69, 70, 71, 68, 67, 82, Phase 1 to 11, Aerocity, IT City, and Kharar with 100% temperature-controlled cold-chain sample transport. You can check our{" "}
        <a href="#health-packages" className="font-bold text-google-blue hover:underline">
          full body checkup packages
        </a>{" "}
        for free doorstep pickup.
      </span>
    ),
  },
  {
    q: "How are blood samples safely handled and tested?",
    a: (
      <span>
        All blood and urine samples are collected using single-use, pre-barcoded vacuum tubes (Vacutainers) by certified phlebotomists. Samples are placed immediately in gel-pack insulated cold bags and processed under{" "}
        <RouterLink to="/about" className="font-bold text-google-blue hover:underline">
          NABL accredited lab standards
        </RouterLink>{" "}
        at our Mohali Sector 69 facility.
      </span>
    ),
  },
  {
    q: "When and how will I receive my test reports?",
    a: (
      <span>
        Most routine blood test reports (CBC, Lipid, LFT, KFT, Blood Sugar, Thyroid) are delivered within 6 to 12 hours directly on your WhatsApp and email. You can also securely{" "}
        <a
          href="https://reports.agilus.in/secure/login.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-google-blue hover:underline"
        >
          download patient lab reports online
        </a>
        .
      </span>
    ),
  },
  {
    q: "Do I need to fast before my blood sample is collected?",
    a: (
      <span>
        For tests like Fasting Blood Sugar, Lipid Profile, and Full Body Health Checkups, 10-12 hours of overnight fasting is recommended (plain water is permitted). For more details, visit our{" "}
        <RouterLink to="/faq" className="font-bold text-google-blue hover:underline">
          blood test fasting guidelines & FAQs
        </RouterLink>
        .
      </span>
    ),
  },
  {
    q: "Is there any extra charge for doorstep home collection?",
    a: "We offer FREE home sample collection across Mohali on all major health checkup packages and qualifying diagnostic test bills. For individual tests, a minimal nominal conveyance charge may apply.",
  },
];

// Popular Home Collection Packages
const popularHomePackages = [
  {
    title: "Agilus Active Care Basic",
    tests: "60+ Tests (CBC, Lipid, LFT, KFT, Fasting Sugar, Urine R/M)",
    price: "₹999",
    mrp: "₹2,800",
    discount: "64% OFF",
    fasting: "10-12 hrs fasting",
    popular: true
  },
  {
    title: "Agilus Active Care Comprehensive",
    tests: "85+ Tests (Includes Vitamin D, B12, HbA1c, Thyroid, Cardiac Risk, Iron)",
    price: "₹2,199",
    mrp: "₹5,600",
    discount: "60% OFF",
    fasting: "10-12 hrs fasting",
    popular: true
  },
  {
    title: "Senior Citizen Health Package",
    tests: "90+ Tests (Vital Organs, Bone Health, Electrolytes, Diabetes, Vitamins)",
    price: "₹2,799",
    mrp: "₹6,800",
    discount: "58% OFF",
    fasting: "10-12 hrs fasting",
    popular: false
  }
];

export const HomeCollectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success">("idle");

  useSEO({
    title: "Blood Test Home Collection Mohali | SRL / Agilus Diagnostics",
    description: "Book 24/7 blood test home collection in Mohali by SRL / Agilus Diagnostics. NABL certified reports, certified phlebotomist at your doorstep, free sample pickup.",
    canonicalUrl: "/home-collection"
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    packageOrTest: "Full Body Health Checkup",
    date: new Date().toISOString().split('T')[0],
    time: "07:00 AM - 09:00 AM"
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-+]/g, ''))) {
      errors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.location.trim()) errors.location = "Sector / House Address is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setBookingStatus("submitting");

    const message = `*Blood Test Home Collection Request (SRL Mohali)*\n\n👤 *Patient:* ${formData.name}\n📞 *Mobile:* ${formData.phone}\n📍 *Address/Sector:* ${formData.location}\n🧪 *Required Test/Package:* ${formData.packageOrTest}\n📅 *Preferred Date:* ${formData.date}\n⏰ *Time Slot:* ${formData.time}\n\n_Please confirm phlebotomist arrival time._`;
    const whatsappUrl = `https://wa.me/919115459115?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setBookingStatus("success");
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 400);
  };

  // Structured Data (JSON-LD) for Local Home Healthcare & Medical Test Service
  useEffect(() => {
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "SRL Diagnostics Mohali Home Blood Sample Collection",
      "alternateName": ["Agilus Diagnostics Home Collection Mohali", "SRL Blood Test Home Collection Sector 69"],
      "image": "https://media.agilus.in/consumer-web/agilusLogo.png",
      "url": "https://www.srlmohali.co.in/home-collection",
      "telephone": "+919115459115",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Booth No. 12, GMADA Market, Near Gurukul World School, Sector 69",
        "addressLocality": "Mohali",
        "addressRegion": "Punjab",
        "postalCode": "160069",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.7046,
        "longitude": 76.7179
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Mohali Sector 69" },
        { "@type": "AdministrativeArea", "name": "Mohali Sector 70" },
        { "@type": "AdministrativeArea", "name": "Mohali Sector 71" },
        { "@type": "AdministrativeArea", "name": "Mohali Sector 68" },
        { "@type": "AdministrativeArea", "name": "Mohali Phase 1-11" },
        { "@type": "AdministrativeArea", "name": "Aerocity Mohali" },
        { "@type": "AdministrativeArea", "name": "IT City Mohali" },
        { "@type": "AdministrativeArea", "name": "Kharar" }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "82",
        "bestRating": "5"
      }
    });
    document.head.appendChild(schemaScript);

    return () => {
      document.head.removeChild(schemaScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafd] text-[#202124] flex flex-col font-sans selection:bg-blue-100 selection:text-google-blue">
      {/* Top Emergency & Trust Alert Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-xs py-2 px-4 select-none shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white border border-white/30 uppercase tracking-widest animate-pulse">
              24/7 Available
            </span>
            <span className="hidden sm:inline">NABL Certified Doorstep Sample Pickup in Mohali</span>
            <span className="sm:hidden">Doorstep Sample Pickup in Mohali</span>
          </div>
          <a
            href="tel:+919115459115"
            className="flex items-center gap-1.5 hover:underline font-bold text-white tracking-wide shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 91154 59115</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              aria-label="Back to Homepage"
              className="p-2 -ml-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <RouterLink to="/" className="flex items-center gap-2">
              <AgilusLogo className="h-8 sm:h-10 w-auto" />
            </RouterLink>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:+919115459115"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Phone className="w-4 h-4 text-google-blue" />
              Call Lab
            </a>
            <a
              href="#book-home-collection"
              className="flex items-center gap-2 bg-google-blue hover:bg-blue-600 active:scale-95 text-white px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Book Collection</span>
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation for Crawlers & Users */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-3">
        <Breadcrumbs items={[{ name: 'Blood Test Home Collection Mohali', url: '/home-collection' }]} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8 w-full space-y-12">
        {/* Hero Section with Geo-Context */}
        <section className="relative rounded-3xl bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/40 border border-blue-100 p-6 sm:p-10 shadow-sm overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-google-blue text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-google-blue" />
                <span>Mohali Sector 69 • Certified SRL/Agilus Lab</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#202124] leading-[1.15]">
                Blood Test & Full Body Checkup <span className="text-google-blue">Home Collection</span> in Mohali
              </h1>

              <p className="text-base sm:text-lg text-google-grey leading-relaxed max-w-2xl">
                Experience sterile, hassle-free diagnostic blood sampling in the comfort of your home. Certified phlebotomists, 100% cold-chain sample preservation, and fast reports verified under{" "}
                <RouterLink
                  to="/about"
                  className="text-google-blue font-bold hover:underline"
                >
                  NABL accredited lab standards
                </RouterLink>
                . Explore our complete directory of{" "}
                <RouterLink
                  to="/services"
                  className="text-google-blue font-bold hover:underline"
                >
                  diagnostic services in Mohali
                </RouterLink>{" "}
                or schedule doorstep pickup below.
              </p>

              {/* Key Value Points */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200/80 shadow-2xs">
                  <Clock className="w-5 h-5 text-google-blue shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">30-Min Slot</p>
                    <p className="text-[10px] text-google-grey">Flexible Timing</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200/80 shadow-2xs">
                  <Droplets className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">Painless Prick</p>
                    <p className="text-[10px] text-google-grey">Sealed Vacutainers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200/80 shadow-2xs col-span-2 sm:col-span-1">
                  <Award className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">NABL Quality</p>
                    <p className="text-[10px] text-google-grey">WhatsApp Reports</p>
                  </div>
                </div>
              </div>

              {/* Verified Trust Strip */}
              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-gray-600 font-semibold">
                <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-gray-200">
                  <GoogleGLogo className="w-4 h-4" />
                  <span>4.9 / 5.0 Rating</span>
                  <div className="flex items-center text-amber-500">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <span className="text-gray-400">•</span>
                <span>80+ Verified Reviews</span>
                <span className="text-gray-400">•</span>
                <span className="text-emerald-700 font-bold">10,000+ Samples Collected</span>
              </div>
            </div>

            {/* Quick Booking Form Card (Right Column) */}
            <div id="book-home-collection" className="lg:col-span-5 scroll-mt-28">
              <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl p-6 sm:p-8 relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-google-blue bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      Quick Doorstep Booking
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mt-1">Book Home Sample Pickup</h2>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-google-blue flex items-center justify-center">
                    <Home className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs text-google-grey mb-6">
                  Fill details below or WhatsApp us. Our phlebotomist will reach your address at your scheduled time.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Patient Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Gurpreet Singh"
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue/20 transition-all ${formErrors.name ? "border-red-400 ring-2 ring-red-100" : "border-gray-300 focus:border-google-blue"}`}
                      />
                    </div>
                    {formErrors.name && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Phone Number (For WhatsApp Reports) *
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue/20 transition-all ${formErrors.phone ? "border-red-400 ring-2 ring-red-100" : "border-gray-300 focus:border-google-blue"}`}
                      />
                    </div>
                    {formErrors.phone && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Address / Mohali Sector / Landmark *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. House #142, Sector 69, Mohali"
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue/20 transition-all ${formErrors.location ? "border-red-400 ring-2 ring-red-100" : "border-gray-300 focus:border-google-blue"}`}
                      />
                    </div>
                    {formErrors.location && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.location}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Collection Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-google-blue transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-google-blue transition-all"
                      >
                        <option value="06:30 AM - 08:00 AM">06:30 AM - 08:00 AM (Early Fasting)</option>
                        <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM (Standard)</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="12:00 PM - 04:00 PM">12:00 PM - 04:00 PM (Afternoon)</option>
                        <option value="04:00 PM - 08:00 PM">04:00 PM - 08:00 PM (Evening)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Required Test / Package
                    </label>
                    <select
                      value={formData.packageOrTest}
                      onChange={(e) => setFormData({ ...formData, packageOrTest: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-google-blue transition-all"
                    >
                      <option value="Full Body Health Checkup (Active Care)">Full Body Health Checkup (Active Care) - ₹999</option>
                      <option value="Agilus Active Care Comprehensive">Agilus Comprehensive Package - ₹2,199</option>
                      <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC) - ₹350</option>
                      <option value="Thyroid Profile (T3, T4, TSH)">Thyroid Profile (T3, T4, TSH) - ₹600</option>
                      <option value="Diabetes Profile (HbA1c + Sugar)">Diabetes Profile (HbA1c + Sugar) - ₹650</option>
                      <option value="Lipid Profile (Cholesterol)">Lipid Profile (Cholesterol) - ₹750</option>
                      <option value="Liver Function Test (LFT)">Liver Function Test (LFT) - ₹800</option>
                      <option value="Kidney Function Test (KFT)">Kidney Function Test (KFT) - ₹800</option>
                      <option value="Vitamin D & B12 Combo">Vitamin D & B12 Combo - ₹1,499</option>
                      <option value="Doctor Prescription / Other Tests">Doctor Prescription / Other Tests</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingStatus === "submitting"}
                    className="w-full bg-google-blue hover:bg-blue-600 active:scale-[0.98] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {bookingStatus === "submitting" ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        <span>Confirm Home Collection on WhatsApp</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-google-grey">
                    🔒 Zero spam • Your contact details remain confidential & secure
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Hygiene & Protocol Standard */}
        <section className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-google-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Zero Contamination Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] mt-3">
              How SRL / Agilus Doorstep Collection Works
            </h2>
            <p className="text-sm text-google-grey mt-2">
              We follow global diagnostic safety guidelines to ensure exact test precision from sample collection to reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/60 relative group hover:bg-white hover:border-google-blue/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm mb-4 shadow-sm">
                01
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1.5">Sanitized Arrival</h3>
              <p className="text-xs text-google-grey leading-relaxed">
                Phlebotomist arrives on time wearing masks, gloves, and fresh shoe covers with a sanitized collection kit.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/60 relative group hover:bg-white hover:border-google-blue/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm mb-4 shadow-sm">
                02
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1.5">Sealed Vacutainers</h3>
              <p className="text-xs text-google-grey leading-relaxed">
                Pre-barcoded vacuum tubes are opened directly in front of the patient ensuring painless and pure collection.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/60 relative group hover:bg-white hover:border-google-blue/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm mb-4 shadow-sm">
                03
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1.5">Cold-Chain Transport</h3>
              <p className="text-xs text-google-grey leading-relaxed">
                Samples are placed in 2°C - 8°C gel-pack insulated carry cases to preserve biomolecule stability until lab arrival.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/60 relative group hover:bg-white hover:border-google-blue/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm mb-4 shadow-sm">
                04
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1.5">Digital WhatsApp Reports</h3>
              <p className="text-xs text-google-grey leading-relaxed">
                Certified NABL reports are dispatched straight to your WhatsApp and Email within 6 to 12 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Full Body Health Packages for Home Pickup */}
        <section id="health-packages" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-google-blue">
                Recommended Checkups
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] mt-1">
                Popular Full Body Packages for Doorstep Pickup
              </h2>
            </div>
            <RouterLink
              to="/services"
              className="text-xs sm:text-sm font-bold text-google-blue hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore All 300+ Tests</span>
              <ArrowRight className="w-4 h-4" />
            </RouterLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularHomePackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl border p-6 flex flex-col justify-between transition-all hover:shadow-lg relative ${pkg.popular ? "border-blue-300 shadow-md ring-2 ring-blue-100" : "border-gray-200"}`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Most Booked
                  </span>
                )}

                <div className="space-y-3">
                  <h3 className="text-lg font-black text-gray-900">{pkg.title}</h3>
                  <p className="text-xs text-google-grey font-medium leading-relaxed">
                    {pkg.tests}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 w-fit">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.fasting}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-gray-900">{pkg.price}</span>
                      <span className="text-xs text-gray-400 line-through">{pkg.mrp}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                      {pkg.discount}
                    </span>
                  </div>

                  <a
                    href="#book-home-collection"
                    className="bg-blue-50 hover:bg-blue-100 text-google-blue font-bold text-xs px-4 py-2.5 rounded-xl transition-all border border-blue-200"
                  >
                    Select Package
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Google Reviews Section (Google Logo on Cards + Default Avatars) */}
        <section id="google-reviews" className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GoogleGLogo className="w-6 h-6" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
                  Verified Google Patient Reviews
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-google-grey">
                Real experiences from patients across Sector 69, 70, 71 & Mohali Tricity.
              </p>
            </div>

            {/* Google Score Summary Card */}
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200/80 px-5 py-3 rounded-2xl shrink-0">
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-black text-gray-900">4.9</span>
                  <div className="flex items-center text-amber-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>
                </div>
                <p className="text-[11px] text-google-grey font-medium">80+ Reviews on Google</p>
              </div>
              <a
                href={LOCALIZATION.CONTACT.REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-xs font-bold text-gray-800 border border-gray-300 px-3.5 py-2 rounded-xl transition-all shadow-2xs"
              >
                Write Review
              </a>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {verifiedReviews.map((rev, index) => (
              <div
                key={index}
                className="bg-[#F8F9FA] rounded-2xl border border-gray-200/80 p-5 flex flex-col justify-between hover:border-google-blue/40 hover:shadow-md transition-all group"
              >
                <div>
                  {/* Reviewer Header with Google Logo & Avatar */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Google Default User Avatar Profile Picture */}
                      <div className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white font-bold text-base flex items-center justify-center shadow-xs shrink-0 select-none`}>
                        {rev.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-gray-900 leading-none">{rev.name}</h4>
                          <span title="Verified Google Review" className="inline-flex">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          </span>
                        </div>
                        <p className="text-[10px] text-google-grey mt-0.5">{rev.date}</p>
                      </div>
                    </div>

                    {/* Google Icon Badge on Review Card */}
                    <div className="p-1.5 rounded-lg bg-white border border-gray-200 shadow-2xs group-hover:scale-105 transition-transform">
                      <GoogleGLogo className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Rating Stars & Service Tag */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-google-blue bg-blue-50 px-2 py-0.5 rounded border border-blue-100 truncate max-w-[180px]">
                      {rev.service}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-gray-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-[10px] text-google-grey font-medium">
                  <span>Verified Patient</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Home Collection
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href={LOCALIZATION.CONTACT.REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-google-blue hover:underline bg-blue-50/80 hover:bg-blue-100 border border-blue-200 px-6 py-3 rounded-xl transition-all"
            >
              <GoogleGLogo className="w-4 h-4" />
              <span>Read all 80+ customer reviews on Google Maps</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Geo-Aligned Coverage & Mohali Neighborhoods */}
        <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                Doorstep Coverage Map
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Areas We Serve in Mohali & Tricity
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
                Our phlebotomy fleet provides fast, on-time sample collection across all residential sectors, societies, and corporate hubs in Mohali.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Sector 69", "Sector 70", "Sector 71", "Sector 68", "Sector 67",
                  "Phase 1 to 11", "Aerocity Mohali", "IT City", "Sector 82", "Kharar",
                  "Landran Road", "Kumbra", "Mattaur", "Sohana", "Sector 80"
                ].map((area, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-xl transition-colors cursor-default"
                  >
                    📍 {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-5 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-blue-200">
                Direct Lab Visit Address
              </h3>
              <p className="text-xs text-white leading-relaxed">
                <strong>SRL / Agilus Diagnostics:</strong><br />
                {LOCALIZATION.CONTACT.ADDRESS}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={LOCALIZATION.CONTACT.DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-gray-900 hover:bg-blue-50 font-bold text-xs py-2.5 px-3 rounded-xl text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-google-blue" />
                  <span>Google Maps</span>
                </a>
                <a
                  href="tel:+919115459115"
                  className="flex-1 bg-google-blue text-white hover:bg-blue-600 font-bold text-xs py-2.5 px-3 rounded-xl text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 91154 59115</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions Accordion */}
        <section className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-google-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] mt-2">
                Home Collection FAQs
              </h2>
              <p className="text-xs sm:text-sm text-google-grey mt-1">
                Everything you need to know about sample pickup, fasting rules, and report delivery.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {homeCollectionFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? "border-google-blue/50 bg-blue-50/20 shadow-xs" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-gray-900 flex items-center justify-between gap-4 select-none cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-google-blue text-xs font-black flex items-center justify-center shrink-0">
                          ?
                        </span>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-google-blue" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-google-grey leading-relaxed border-t border-blue-100/50">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* SEO Topical Linking Hub Footer */}
      <Footer />

      {/* Bottom Floating Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

export default HomeCollectionPage;
