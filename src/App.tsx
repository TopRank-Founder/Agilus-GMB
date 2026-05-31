/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import {
  useNavigate,
  Routes,
  Route,
  useLocation,
  Link as RouterLink,
} from "react-router-dom";
import TestDetailPage from "./pages/TestDetailPage";
import { BottomNav } from "./components/BottomNav";
import { testMenu } from "./constants";
import { LOCALIZATION, formatTemplate } from "./localization";
import {
  Phone,
  MapPin,
  Clock,
  Globe,
  Share2,
  Moon,
  Sun,
  Navigation,
  Star,
  StarHalf,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu,
  MessageSquare,
  House,
  Image as ImageIcon,
  Calendar,
  X,
  Play,
  ArrowRight,
  Info,
  Award,
  ShieldCheck,
  FileDown,
  Quote,
  ThumbsUp,
  Droplets,
  FlaskConical,
  HeartPulse,
  Syringe,
  Activity,
  Gauge,
  Stethoscope,
  Microscope as MicroscopeIcon,
  Instagram,
  Facebook,
  Map,
  LinkIcon as Link,
  ArrowLeft,
  ClipboardCheck,
  Smartphone,
  Download,
} from "lucide-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { generateHealthPackagesPDF } from "./services/pdfService";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Navigation as SwiperNavigation,
  Pagination,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LAB_WELLNESS_PACKAGES = [
  {
    id: "vital-pro",
    title: "Complete Care Vital Pro",
    priceText: "92 PARAMETERS",
    parameters: "92 Parameters",
    sub: "Comprehensive full body package covering Heart, Kidney, Liver, Thyroid and general Wellness.",
    desc: "Comprehensive full-body test panel monitoring cardiac health (Lipid Profile), diabetes indices (HbA1c & Blood Glucose), Liver, Kidneys, Thyroid profile, Vitamin D, Vitamin B12, and Iron studies.",
    features: [
      "Vitamin D & B12",
      "Sugar Monitoring",
      "Thyroid Panel",
      "Liver & Kidney",
      "Lipid Profile"
    ],
    link: "https://agilusdiagnostics.com/package/mohali/200025539/complete-care-vital-pro?srsltid=sr_1780169587878_qj7ogl&utm_source=Direct&utm_medium=none",
    bgClass: "bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC]",
    textColorClass: "text-[#034C7A]",
    badgeBg: "bg-[#034C7A]/10 border-[#034C7A]/15",
    badgeText: "text-[#034C7A]",
    icon: HeartPulse,
    testGroups: [
      { name: "Cardiac / Lipid Profile", details: "Cholesterol, Triglycerides, HDL, LDL, VLDL, Cholesterol/HDL Ratio" },
      { name: "Diabetes monitoring", details: "HbA1c (Glycated Hemoglobin), Fasting Blood Sugar" },
      { name: "Thyroid Level Assay", details: "T3 (Total Triiodothyronine), T4 (Total Thyroxine), TSH (Thyroid Stimulating Hormone)" },
      { name: "Renal Panel (KFT)", details: "Creatinine, Urea, Uric Acid, Blood Urea Nitrogen (BUN), BUN/Creatinine Ratio" },
      { name: "Hepatic Panel (LFT)", details: "SGOT, SGPT, Bilirubin (Total, Direct & Indirect), Alkaline Phosphatase, Total Protein, Albumin, Globulin, A/G Ratio" },
      { name: "Vitamins Profile", details: "Vitamin D (25-Hydroxy), Vitamin B12" },
      { name: "Iron Indices", details: "Serum Iron, TIBC, UIBC, Ferritin" },
      { name: "Hematology & Urine", details: "Complete Blood Count (CBC with 24 parameters), Urine Routine & Microscopy Examination (18 parameters)" }
    ]
  },
  {
    id: "active-men-women",
    title: "Complete Care Active Men / Women",
    priceText: "97 PARAMETERS",
    parameters: "97 Parameters",
    sub: "Premium diagnostic tracking for active lifestyles: screens active hormones, bone fitness and joint index.",
    desc: "Engineered for active lifestyles. Screens and monitors active hormones (Testosterone/Estrogens), joint/bone health and co-factors, cardiac fitness indicators, stress markers, and full vital organs.",
    features: [
      "Active Hormones",
      "Bone Health",
      "Energy Index",
      "Liver & Kidneys",
      "Stress Control"
    ],
    link: "https://agilusdiagnostics.com/package/mohali/200032796/complete-care-active-men",
    bgClass: "bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE]",
    textColorClass: "text-[#4C1D95]",
    badgeBg: "bg-[#4C1D95]/10 border-[#4C1D95]/15",
    badgeText: "text-[#4C1D95]",
    icon: Activity,
    testGroups: [
      { name: "Active Hormonal Assessment", details: "Serum Testosterone (for Men) / Estrogens (for Women) - critical for stamina, strength, fitness, and cellular balance" },
      { name: "Bone & Joint health", details: "Vitamin D3 (25-Hydroxy), Bone-specific minerals (Serum Calcium, Serum Phosphorus), Serum Uric Acid" },
      { name: "Cardiac & Lipid Wellness", details: "Total Cholesterol, High Density Lipids (HDL), Low Density Lipids (LDL), Very Low Density Lipids (VLDL), Triglycerides" },
      { name: "Liver Integrity", details: "SGOT (AST), SGPT (ALT), Bilirubin, Alkaline Phosphatase, Total Proteins" },
      { name: "Kidney Performance", details: "Uric Acid, Creatinine, Urea, BUN" },
      { name: "Metabolic Activity (Thyroid)", details: "TSH (Thyroid Stimulating Hormone)" },
      { name: "Blood Sugar", details: "Fasting Blood Glucose" },
      { name: "Hematology / Blood Profile", details: "Complete Blood Count (CBC with 24 parameters), Vitamin B12 and Iron studies" }
    ],
    menSpecial: "Serum Testosterone - Clinically essential screening marker to monitor male cellular fitness, muscle performance, and stress response.",
    womenSpecial: "Estrogen Screen - Highly sensitive reproductive and hormonal pathway indicator for female metabolic wellness."
  },
  {
    id: "vital-75",
    title: "Agilus Complete Care Vital",
    priceText: "75 PARAMETERS",
    parameters: "75 Parameters",
    sub: "Essential diagnostics covering blood glucose, thyroid performance, lipid parameters, and vital organs.",
    desc: "Best for: Essential regular health tracking covering blood sugar, thyroid, liver, and kidney health indices. Inclusions: CBC, Fasting Blood Sugar, LFT, KFT, Lipid Profile, Urine Examination. Same Day Report Available.",
    features: [
      "FBS Checking",
      "LFT Profile",
      "KFT Profile",
      "Lipids Panel",
      "CBC Routine"
    ],
    link: "https://agilusdiagnostics.com/package/mohali/200032795/complete-care-vital",
    bgClass: "bg-gradient-to-br from-[#E6F4EA] via-[#CEEAD6] to-[#A8DAB5]",
    textColorClass: "text-[#137333]",
    badgeBg: "bg-[#137333]/10 border-[#137333]/15",
    badgeText: "text-[#137333]",
    icon: FlaskConical,
    testGroups: [
      { name: "Cardiovascular baseline", details: "Complete Lipid Profile (Total Cholesterol, HDL, LDL, VLDL, Triglycerides)" },
      { name: "Blood Sugar screen", details: "Fasting Blood Sugar" },
      { name: "Hepatic health (LFT)", details: "SGOT, SGPT, Total Bilirubin, Alkaline Phosphatase, Albumin, Globulin" },
      { name: "Renal health (KFT)", details: "Serum Creatinine, Blood Urea, BUN" },
      { name: "Hematology count", details: "Complete Blood Count (CBC with 24 parameters) analyzing hemoglobin, white cells, red cells, and platelets" },
      { name: "Urine Screen", details: "Urine Routine & Microscopic Examination (18 tests) for biological and renal pathway screening" }
    ]
  },
  {
    id: "active-pro",
    title: "Active Pro Care",
    priceText: "100 PARAMETERS",
    parameters: "100 Parameters",
    sub: "Comprehensive health check for active individuals monitoring body systems, bone health, active hormones, and vital organ wellness.",
    desc: "NABL Accredited package engineered for active individuals. Monitors heart health, full liver and kidney functions, metabolic indices, active hormones, bone-mineral status, with dedicated gender markers (PSA/CA-125).",
    features: [
      "Active Hormones",
      "Vitamin D & B12",
      "Sugar & HbA1c",
      "Liver & Kidney",
      "Lipid Panel",
      "PSA / CA-125 Focus",
    ],
    link: "https://agilusdiagnostics.com/care-packages/mohali/packages/active-pro",
    bgClass: "bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC]",
    textColorClass: "text-[#034C7A]",
    badgeBg: "bg-[#034C7A]/10 border-[#034C7A]/15",
    badgeText: "text-[#034C7A]",
    icon: Activity,
    testGroups: [
      { name: "Cardiac Care", details: "Complete Lipid Profile (Cholesterol, HDL, LDL, VLDL, Triglycerides, Cholesterol/HDL ratios)" },
      { name: "Diabetes & Glucose", details: "HbA1c (Three Month Glycated Hemoglobin Average, critical for monitoring long-term glucose trends), Fasting Blood Sugar" },
      { name: "Kidney Function Test (KFT)", details: "Serum Creatinine, Blood Urea, Blood Urea Nitrogen (BUN), Uric Acid, BUN/Creatinine Ratio" },
      { name: "Liver Function Test (LFT)", details: "Serum Bilirubin (Total, Direct & Indirect), SGOT (AST), SGPT (ALT), Alkaline Phosphatase (ALP), Total Protein, Albumin, Globulin, A/G Ratio" },
      { name: "Thyroid Profile (Ultracentral)", details: "Thyroid Stimulating Hormone (TSH), Total Thyroxine (T4), Total Triiodothyronine (T3)" },
      { name: "Vitamins & Bone index", details: "Vitamin D3 (25-Hydroxy), Vitamin B12, Serum Calcium, Serum Phosphorus" },
      { name: "Iron & Blood Indices", details: "Iron Studies Profile (Serum Iron, Total Iron Binding Capacity - TIBC, UIBC, Ferritin), Complete Blood Count (CBC with 24 parameters)" },
      { name: "Urine Analytics", details: "Urine Routine & Microscopy (Urine R/M) covering 18 chemical & microscopic indicators" }
    ],
    menSpecial: "PSA (Prostate-Specific Antigen) - Clinically essential screening marker to monitor prostate health, cell growth, and cancer diagnostics.",
    womenSpecial: "CA 125 (Ovarian Cancer Antigen 125) - Highly sensitive reproductive and ovarian cell monitoring marker for women."
  },
  {
    id: "premium-care",
    title: "Premium Care Packages",
    priceText: "107 PARAMETERS",
    parameters: "107 Parameters",
    sub: "Elite holistic diagnostic screening covering advanced cardiac risk markers, hormonal assessment, fitness tracking, and immunity.",
    desc: "Our gold-standard complete diagnostic package. Features comprehensive organ scans, intensive cardiovascular risk markers (Apolipoproteins), essential vitamins, reproductive/hormonal panels, and targeted clinical tumor screenings.",
    features: [
      "Cardiac Risk Apo",
      "Reproductive Hormones",
      "All Vitamins & Folate",
      "Pancreatic Enzymes",
      "Extended KFT Electrolytes",
      "Extended LFT with GGT"
    ],
    link: "https://agilusdiagnostics.com/care-packages/mohali/packages/premium-care",
    bgClass: "bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE]",
    textColorClass: "text-[#4C1D95]",
    badgeBg: "bg-[#4C1D95]/10 border-[#4C1D95]/15",
    badgeText: "text-[#4C1D95]",
    icon: Star,
    testGroups: [
      { name: "Advanced Cardiac Risk Profile", details: "Apolipoprotein A1 (Apo-A1), Apolipoprotein B (Apo-B), Apo-A1/Apo-B Ratio, hs-CRP (High-Sensitivity C-Reactive Protein), plus complete standard Lipids Panel" },
      { name: "Hormonal & Thryoid Assay", details: "Complete Free & Total Thyroid Panel (FT3, FT4, TSH), Active Hormonal Screening (Serum Testosterone for Men / Estrogens for Women)" },
      { name: "Pancreatic & Spleen Care", details: "Serum Amylase, Serum Lipase, Gamma Glutamyl Transferase (GGT) - sensitive organ integrity filters" },
      { name: "Extended Organ Integrity", details: "Liver Function Test (LFT) with GGT, Kidney Function Test (KFT) with Serum Electrolytes (Sodium, Potassium, Chloride for blood pressure & cellular fluid sync)" },
      { name: "Total Vitamins Profile", details: "Vitamin D3 (25-Hydroxy), Vitamin B12, Serum Folic Acid (Folate)" },
      { name: "Diabetes Advanced", details: "HbA1c (Glycated Hemoglobin), Fasting Blood Glucose, Average Blood Glucose" },
      { name: "Hematology & ESR", details: "Complete Blood Count (CBC with 24 indices) plus ESR (Erythrocyte Sedimentation Rate marker for inflammation)" },
      { name: "Urine Analytics", details: "Urine Routine & Microscopy (Urine R/M) - 18 chemical and sediment parameters" }
    ],
    menSpecial: "PSA (Prostate-Specific Antigen) & Serum Testosterone - Elite hormonal, cellular growth and prostate cancer risk diagnostic tracker for men.",
    womenSpecial: "CA 125 & Reproductive Hormones - Specialized tumor marker screening and reproductive hormone analysis for women."
  },
  {
    id: "vital-core",
    title: "Complete Care Vital Shape Core",
    priceText: "88 PARAMETERS",
    parameters: "88 Parameters",
    sub: "Focused core fitness and metabolic wellness checkup analyzing body indicators, basic organs, and bone minerals.",
    desc: "Excellent value package for routine monitoring. Screens and analyzes basic thyroid performance (TSH), diabetes indicators (HbA1c), complete blood indices, full lipid/cholesterol panel, and diagnostic bone/joint markers.",
    features: [
      "Thyroid TSH Panel",
      "Diabetes HbA1c",
      "Core Liver & Kidney",
      "Bone & Mineral Care",
      "Complete CBC Routine",
    ],
    link: "https://agilusdiagnostics.com/package/mohali/200036176/complete-care-vital-shape-core-",
    bgClass: "bg-gradient-to-br from-[#E6F4EA] via-[#CEEAD6] to-[#A8DAB5]",
    textColorClass: "text-[#137333]",
    badgeBg: "bg-[#137333]/10 border-[#137333]/15",
    badgeText: "text-[#137333]",
    icon: FlaskConical,
    testGroups: [
      { name: "Core Blood Indices", details: "Complete Blood Count (CBC) including Hemoglobin, WBC, Red Blood Cells, Platelets, Hematocrit, and 24 detailed cellular parameters" },
      { name: "Thyroid Screening", details: "Thyroid Stimulating Hormone (TSH) - highly accurate base filter for metabolic activity and wellness" },
      { name: "Diabetes Monitoring", details: "HbA1c (Glycated Hemoglobin Three Month Average), Fasting Blood Glucose" },
      { name: "Lipid Wellness Panel", details: "Total Cholesterol, High Density Lipids (HDL), Low Density Lipids (LDL), Very Low Density Lipids (VLDL), Triglycerides, ratios" },
      { name: "Core Kidney Performance", details: "Serum Creatinine, Blood Urea, Blood Urea Nitrogen (BUN), BUN/Creatinine Ratio" },
      { name: "Core Liver Performance", details: "SGPT (ALT), SGOT (AST), Serum Bilirubin, Alkaline Phosphatase (ALP)" },
      { name: "Bone-Joint Minerals index", details: "Serum Calcium, Serum Phosphorus, Serum Uric Acid" },
      { name: "Urine Analytics", details: "Urine Routine Chemistry, Specific Gravity, and Microscopic Sediment analysis (18 tests)" }
    ]
  },
  {
    id: "diabetes-heart",
    title: "Complete Care Diabetes & Heart Advance",
    priceText: "103 PARAMETERS",
    parameters: "103 Parameters",
    sub: "Advanced targeted diagnostic evaluating cardiovascular health, diabetes indices, and renal-hepatic profiles.",
    desc: "Specially formulated for individuals tracking cardiometabolic health. Evaluates advanced cardiac risks (Apolipoproteins), diabetes controls (HbA1c & Microalbuminuria), myocardial wellness, and comprehensive renal/hepatic integrity.",
    features: [
      "hs-CRP Cardiac Index",
      "Apolipoprotein A1 & B",
      "Microalbuminuria",
      "Myocardial Minerals",
      "Extended KFT & LFT",
    ],
    link: "https://agilusdiagnostics.com/package/mohali/200032803/complete-care-diabetes-and-heart-advance",
    bgClass: "bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]",
    textColorClass: "text-[#9A3412]",
    badgeBg: "bg-[#9A3412]/10 border-[#9A3412]/15",
    badgeText: "text-[#9A3412]",
    icon: HeartPulse,
    testGroups: [
      { name: "Advanced Cardiometabolic Indicators", details: "hs-CRP (Myocardial Inflammation Indicator), Apolipoprotein A1 (Apo-A1), Apolipoprotein B (Apo-B), Apo-A1/Apo-B Ratio, plus complete lipid profile (8 parameters)" },
      { name: "Advanced Diabetes & Renal Check", details: "Fasting Blood Sugar, HbA1c, Average Blood Glucose, Urine Microalbumin (Microalbuminuria), Urine Creatinine, Urine Microalbumin/Creatinine Ratio - vital for tracking early diabetic kidney damage" },
      { name: "Kidney Integrity & Electrolytes", details: "Urea, Creatinine, Uric Acid, Blood Urea Nitrogen, Serum Sodium, Serum Potassium, Serum Chloride" },
      { name: "Complete Liver Integrity", details: "Liver Function Test (LFT) - Serum Bilirubin, SGOT, SGPT, ALP, Total Protein, Albumin, Globulin, A/G Ratio" },
      { name: "Vital Neuro-Vitamins", details: "Vitamin D3 (25-Hydroxy), Vitamin B12 - crucial co-factors for nerve pathways" },
      { name: "Thyroid Performance", details: "Thyroid Profile (TSH, Total T3, Total T4)" },
      { name: "Myocardial Minerals", details: "Serum Magnesium, Serum Calcium, Serum Phosphorus" },
      { name: "Urine Analytics", details: "Urine Routine physical, chemical and microscopic sediment analysis with ratio filters (20 parameters)" }
    ]
  }
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<string>("");
  const [selectedInclusionsPackage, setSelectedInclusionsPackage] = useState<any | null>(null);
  const [inclusionsGender, setInclusionsGender] = useState<"men" | "women">("men");

  const [activePackageIndex, setActivePackageIndex] = useState(0);
  const packageScrollRef = useRef<HTMLDivElement>(null);

  const handlePackageScroll = (direction: "prev" | "next") => {
    if (packageScrollRef.current) {
      const container = packageScrollRef.current;
      const card = container.querySelector("[data-package-card]");
      const cardWidth = card ? card.clientWidth : 300;
      const gap = 20;
      const currentScroll = container.scrollLeft;
      const scrollStep = cardWidth + gap;

      const targetScroll =
        direction === "next"
          ? currentScroll + scrollStep
          : currentScroll - scrollStep;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handlePackageScrollEvent = () => {
    if (packageScrollRef.current) {
      const container = packageScrollRef.current;
      const card = container.querySelector("[data-package-card]");
      const cardWidth = card ? card.clientWidth : 300;
      const gap = 20;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      const clampedIndex = Math.max(0, Math.min(LAB_WELLNESS_PACKAGES.length - 1, index));
      setActivePackageIndex(clampedIndex);
    }
  };

  const handlePackageDotClick = (idx: number) => {
    if (packageScrollRef.current) {
      const container = packageScrollRef.current;
      const card = container.querySelector("[data-package-card]");
      const cardWidth = card ? card.clientWidth : 300;
      const gap = 20;
      container.scrollTo({
        left: idx * (cardWidth + gap),
        behavior: "smooth",
      });
      setActivePackageIndex(idx);
    }
  };

  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    date?: string;
    time?: string;
  }>({});

  const handleDirection = () =>
    window.open("https://maps.app.goo.gl/cjZ9Zjs4n3BWewWQ9", "_blank");
  const handleCall = () => (window.location.href = "tel:+919115459115");
  const handleWhatsApp = () =>
    window.open(
      "https://wa.me/919115459115?text=Hi, I want to book a blood test in Mohali Sector 69.",
      "_blank",
    );
  const handleShare = async () => {
    const shareUrl = "https://maps.app.goo.gl/49GEMYGUA2JW2aGf7";
    const webUrl = "https://www.srllabmohali.in";
    const title = "Agilus Diagnostics Mohali - Sector 69";
    const text =
      "NABL Accredited Lab with Free Home Collection in Mohali. Serving Mohali with clinical precision since 1997.";

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: shareUrl,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Error sharing:", err);
          // Fallback to clipboard if share fails
          try {
            await navigator.clipboard.writeText(
              `${title}\n${text}\n${shareUrl}`,
            );
            alert("Details copied to clipboard!");
          } catch (copyErr) {
            window.open(shareUrl, "_blank");
          }
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${title}\n${text}\n${shareUrl}`);
        alert("Link copied to clipboard!");
      } catch (err) {
        window.open(shareUrl, "_blank");
      }
    }
  };

  const centerPhotos = [
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipPilDAb5f4awWB323dDwPt0C2kUkJQqyE7Zs3AP=s680-w680-h510-rw",
      title: "Diagnostic Lab",
    },
    {
      url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHndBvgZhfzPgmxk75cT17C_j0JmW5K5E2ScPyz7IblrwEZxMAhL1CW5HrUiHexrhu0D1K0D2wJ9HouyYFd3bskL0qMVO-XGI6t0ygTxxoR9sf8L2BXWlnsjh09HMJHAWQjX49znVLOcwoP=s680-w680-h510-rw",
      title: "Testing Facility",
    },
    {
      url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEiB5ryxWLcsUYA35H_Gk00Q5-Cvk1R-FSoQ3GFPdOrS5oRePSFSWNZKPyiAkIc_uAIHnRfOWUVHdia-I7xS-mq0korrLo9Udb4qeJBu4QgRG4hmWp6tsro-hZBWUZyUER-dZ11sbXFNZs=s680-w680-h510-rw",
      title: "Professional Pathology",
    },
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipPilDAb5f4awWB323dDwPt0C2kUkJQqyE7Zs3AP=s680-w680-h510-rw",
      title: "Home Sample Collection",
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Validation (Localized, polite and actionable)
    const errors: typeof formErrors = {};
    if (!formData.name.trim()) {
      errors.name = LOCALIZATION.ERRORS.NAME_REQUIRED;
    } else if (formData.name.trim().length < 3) {
      errors.name = LOCALIZATION.ERRORS.NAME_SHORT;
    }

    if (!formData.phone.trim()) {
      errors.phone = LOCALIZATION.ERRORS.PHONE_REQUIRED;
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      errors.phone = LOCALIZATION.ERRORS.PHONE_INVALID;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = LOCALIZATION.ERRORS.EMAIL_INVALID;
    }

    if (!formData.date) {
      errors.date = LOCALIZATION.ERRORS.DATE_REQUIRED;
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = LOCALIZATION.ERRORS.DATE_PAST;
      }
    }

    if (!formData.time) {
      errors.time = LOCALIZATION.ERRORS.TIME_REQUIRED;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setBookingStatus("submitting");

    // Simulate API call and redirect safely with formatted dynamic content
    setTimeout(() => {
      setBookingStatus("success");

      let messageText = formatTemplate(
        LOCALIZATION.WHATSAPP_BOOKING_TEMPLATE,
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || "N/A",
          date: formData.date,
          time: formData.time,
        },
      );

      if (selectedPackageForBooking) {
        messageText += `\nPackage: ${selectedPackageForBooking}`;
      }

      const whatsappMessage = encodeURIComponent(messageText);
      window.open(
        `https://wa.me/919115459115?text=${whatsappMessage}`,
        "_blank",
      );

      console.log("Appointment Booked:", formData);
    }, 1500);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingStatus("idle");
    setFormData({ name: "", phone: "", email: "", date: "", time: "" });
    setFormErrors({});
    setSelectedPackageForBooking("");
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAF-6kv1elhJvFOYgZom8JrFu329YquzGnhEfignDqUSW4cHyFpePWE_9dl2DMEgwaZIVDv-SuubYh9CgoCpLvD2rtiEbbuCLfd8Q0EWr9xldQsYaqetSEaUs4xt0ZqQUMQ-dK32b5k5KDWD=s680-w680-h510-rw",
      alt: "Front view of Agilus Diagnostics Centre Mohali Sector 69",
      title: "Trusted Diagnostics",
      desc: "Serving Mohali with heartfelt care since 1997. We combine decades of clinical precision with a gentle touch, ensuring your health is in the best hands right here in the heart of Mohali.",
      badge: "Caring since 1997",
      cta1: "Book Home Collection",
      cta2: "View Test Menu",
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGrXfKjr3IKX21mBGYQ4DXO-0-2hcpULoGbsYMUXBIFc4XfgfkeHHMj7_QpUeiG-JDKIEE8Vzqublze0lRH1cxHyVYMFd0elbw6A0z20_T1TStyeRszjdG9hScH4lN6lgIX4BIfIO-WDfI=s680-w680-h510-rw",
      alt: "Automated blood testing analyzers at Agilus Diagnostics Mohali",
      title: "Precision Testing",
      desc: "Our facility is designed with your comfort in mind, equipped with the latest technology for rapid, accurate results, so you can spend less time worrying and more time living.",
      badge: "Accuracy you trust",
      cta1: "Explore Facilities",
      cta2: "Watch Virtual Tour",
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHndBvgZhfzPgmxk75cT17C_j0JmW5K5E2ScPyz7IblrwEZxMAhL1CW5HrUiHexrhu0D1K0D2wJ9HouyYFd3bskL0qMVO-XGI6t0ygTxxoR9sf8L2BXWlnsjh09HMJHAWQjX49znVLOcwoP=s680-w680-h510-rw",
      alt: "Clinical Sample Processing Room at Agilus Mohali - Managed by Top Pathologists.",
      title: "Expert Pathology",
      desc: "Managed by highly qualified pathologists to ensure the highest standards of clinical testing and patient care in Punjab.",
      badge: "Expert Doctors",
      cta1: "Meet the Team",
      cta2: "View Specialities",
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAENCuDxroLg1iJ1RuvIRWSiBSQL7_BsWdfp2t2ejpWVC8Xl3fsxP-7ZJxXEhzJ-tsjHRSBP2rHy-2H0k5PJ_DgGOxEPvcaMALrTHYDhXAqUrgjOAdoT39lMTWIZqxRaYXGH3Gj0vAghEbc=s680-w680-h510-rw",
      alt: "Professional Blood Sample Collection at Home Mohali - Trained Phlebotomists from SRL Diagnostics Lab.",
      title: "Home Collection",
      desc: "Safe, hygienic, and convenient blood sample collection from your doorstep in Mohali & Chandigarh by trained professionals.",
      badge: "Safe & Convenient",
      cta1: "Schedule Visit",
      cta2: "Learn More",
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGq7NJv_QgwRxsGJblold9mllDuLWewb84nSNkSlg5Dd3PyeY_CuNw2pXPL3Odl72KlXxsbD8DqxM0n1Nj1wVsRmzdllEiDB3jH1gLlH525w4_eqCpFSus5uVyiB85yp08lYHTzEr6KVef_=s680-w680-h510-rw",
      alt: "High-end Medical Facility Interior with MNC Standards - Agilus Diagnostics Mohali.",
      title: "Global Standards",
      desc: "Operating strictly under NABL and ISO guidelines to ensure international reliability for life-saving diagnostics.",
      badge: "NABL Accredited",
      cta1: "Verify Quality",
      cta2: "Our Standards",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const searchSuggestions = [
    {
      name: "Full Body Checkup",
      subtext: "Wellness & Prevention",
      tags: ["routine", "health", "package"],
      symptoms: ["Fatigue", "Weakness", "Annual Checkup", "Body Ache"],
      relatedTests: ["CBC", "Lipid Profile", "KFT", "LFT"],
      freeHomeCollection: true,
    },
    {
      name: "Complete Fever Profile",
      subtext: "Fever, Malaria, Dengue, Typhoid",
      tags: ["fever", "chills", "body ache", "headache", "cold"],
      symptoms: ["High Fever", "Chills", "Body Ache", "Headache"],
      relatedTests: ["Platelet Count", "Widal Test", "Malaria Smear"],
      freeHomeCollection: true,
    },
    {
      name: "Diabetes Screening",
      subtext: "Sugar, HbA1c, Glucose Test",
      tags: ["diabetes", "sugar", "thirst", "tiredness", "frequent urination"],
      symptoms: ["Excessive Thirst", "Frequent Urination", "Blurred Vision"],
      relatedTests: ["HbA1c", "Glucose Fasting", "Insulin Fasting"],
      freeHomeCollection: true,
    },
    {
      name: "Thyroid Profile",
      subtext: "T3, T4, TSH",
      tags: ["thyroid", "weight gain", "weight loss", "hormonal", "hair fall"],
      symptoms: ["Weight Changes", "Hair Loss", "Constipation"],
      relatedTests: ["TSH", "Free T3", "Free T4", "Anti-TPO"],
      freeHomeCollection: true,
    },
    {
      name: "Lipid Profile",
      subtext: "Cholesterol & Heart Health",
      tags: ["heart", "cholesterol", "fatty liver", "blood pressure"],
      symptoms: ["Chest Pain", "Shortness of Breath", "Dizziness"],
      relatedTests: ["Total Cholesterol", "HDL", "LDL", "VLDL"],
      freeHomeCollection: true,
    },
    {
      name: "Kidney Function Test (KFT)",
      subtext: "Creatinine, Urea, Uric Acid",
      tags: ["kidney", "back pain", "swelling", "urine problem"],
      symptoms: ["Swelling in Feet", "Back Pain", "Urine Changes"],
      relatedTests: ["Creatinine", "Uric Acid", "BUN", "Urine R/M"],
      freeHomeCollection: true,
    },
    {
      name: "Liver Function Test (LFT)",
      subtext: "Bilirubin, SGOT, SGPT",
      tags: ["liver", "jaundice", "stomach pain", "digestion"],
      symptoms: ["Yellow Eyes", "Loss of Appetite", "Nausea"],
      relatedTests: ["SGOT", "SGPT", "Bilirubin Total", "Alkaline Phosphatase"],
      freeHomeCollection: true,
    },
    {
      name: "Vitamin D & B12 Test",
      subtext: "Bone & Nerve Health",
      tags: ["bone pain", "joint pain", "weakness", "numbness"],
      symptoms: ["Joint Pain", "Numbness", "Muscle Weakness"],
      relatedTests: ["Vitamin D 25-Hydroxy", "Vitamin B12", "Calcium"],
      freeHomeCollection: true,
    },
    {
      name: "CBC Test",
      subtext: "Complete Blood Count",
      tags: ["infection", "anemia", "weakness", "low blood"],
      symptoms: ["Pale Skin", "Infection", "Bruising"],
      relatedTests: [
        "Hemoglobin",
        "WBC Count",
        "Platelet Count",
        "RBC Indices",
      ],
      freeHomeCollection: true,
    },
    {
      name: "Allergy Screening",
      subtext: "Find your triggers",
      tags: ["allergy", "itching", "sneezing", "skin rash"],
      symptoms: ["Sneezing", "Skin Rashes", "Itching Eyes"],
      relatedTests: [
        "Total IgE",
        "Allergy Panel - Veg",
        "Allergy Panel - Non Veg",
      ],
      freeHomeCollection: true,
    },
    {
      name: "Agilus Wellness Packages",
      subtext: "Comprehensive Health Plans",
      tags: ["screening", "health check"],
      symptoms: ["Prevention", "Healthy Lifestyle", "Executive Health"],
      relatedTests: ["Vital Care", "Active Care", "Premium Full Body"],
      freeHomeCollection: true,
    },
    {
      name: "Home Collection Mohali",
      subtext: "Free Sample Pickup",
      tags: ["home service", "sector 69", "chandigarh"],
      symptoms: ["Elderly Care", "Convenience", "Bedridden Patients"],
      relatedTests: ["Doorstep Service", "WhatsApp Reports", "Digital Records"],
      freeHomeCollection: true,
    },
  ];

  const filteredSuggestions = searchSuggestions.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const handleDownloadBrochure = () => {
    const packagesData = [
      {
        title: "Active Pro Care",
        price: "100 PARAMETERS",
        description:
          "Comprehensive health check for active individuals monitoring body systems, bone health, active hormones (PSA/CA-125), and vital organ wellness with free home collection.",
        tests: [
          "Complete Blood Count (CBC) • 24 tests",
          "Cardiac (Lipid Profile: Cholesterol, HDL, LDL, VLDL)",
          "Kidney Function Test (KFT: Creatinine, Urea, Uric Acid)",
          "Liver Function Test (LFT: SGOT, SGPT, Bilirubin, Albumin)",
          "Thyroid Profile (TSH, Total T3, Total T4)",
          "Diabetes Screen (HbA1c, Fasting Blood Sugar)",
          "Vitamins & Bone index (Vitamin D, B12, Calcium, Phosphorus)",
          "Iron Studies Profile (Iron, Ferritin, TIBC, UIBC)",
          "Urine Routine & Microscopy examination • 18 tests",
          "Special Sex-Specific marker: PSA (for Men) / CA-125 (for Women)",
        ],
      },
      {
        title: "Premium Care Packages",
        price: "107 PARAMETERS",
        description:
          "Elite holistic diagnostic screening covering advanced cardiac risk Apolipoproteins, detailed hormones, pancreatic enzymes, full vitamins, and targeted cancer screenings.",
        tests: [
          "Complete Blood Count with ESR (CBC) • 25 tests",
          "Advanced Cardiac Risk (Apolipoprotein A1, Apolipoprotein B, hs-CRP, Lipid Profile)",
          "Hormonal Assay (Thyroid Total & Free Panel, Sex Hormones)",
          "Vitamins Profile (Vitamin D3, Vitamin B12, Folic Acid)",
          "Kidney Studies with Electrolytes (Creatinine, Urea, Sodium, Potassium, Chloride)",
          "Liver Studies with GGT (SGOT, SGPT, Bilirubin, Albumin, Alkaline Phosphatase)",
          "Pancreatic Enzyme Integrity (Amylase, Lipase)",
          "Diabetes advanced tracking (HbA1c, Fasting Glucose, Average Blood Glucose)",
          "Urine Routine & Microscopy • 18 parameters",
          "Elite Sex-Specific marker: PSA & Testosterone (Men) / CA 125 & Thyroid Panel (Women)",
        ],
      },
      {
        title: "Complete Care Vital Shape Core",
        price: "88 PARAMETERS",
        description:
          "Focused core health, fitness and metabolic wellness checkup analyzing thyroid performance (TSH), complete blood counts, essential lipid quotients, kidney-liver baseline, and bone minerals.",
        tests: [
          "Complete Blood Count (CBC) • 24 tests",
          "Thyroid Stimulating Hormone (TSH)",
          "Diabetes Screening (HbA1c & Fasting Glucose)",
          "Lipid Wellness Profile (Cholesterol, HDL, LDL, VLDL, Triglycerides)",
          "Kidney Core (Creatinine, Urea, Blood Urea Nitrogen)",
          "Liver Core (SGPT, SGOT, Bilirubin, Alkaline Phosphatase)",
          "Bone & Joint index (Calcium, Phosphorus, Uric Acid)",
          "Urine Routine clinical profile • 18 tests",
        ],
      },
      {
        title: "Diabetes Heart Care Package",
        price: "103 PARAMETERS",
        description:
          "Advanced targeted diagnostic evaluating cardiovascular risk markers, diabetes indices, myocardial wellness, associated renal studies, and microalbuminuria.",
        tests: [
          "Complete Blood Count (CBC) • 24 tests",
          "Advanced Cardiac Profiling (hs-CRP, Apo-A1, Apo-B, Lipids)",
          "Diabetes Advanced panel (Fasting Sugar, HbA1c, Microalbuminuria, Creatinine Ratio)",
          "Kidney & Electrolytes profile (Sodium, Potassium, Chloride, Creatinine, Urea, BUN)",
          "Liver Enzymes & Proteins profile (LFT with enzymes)",
          "Vitamins & Neuronal support Level (Vitamin D3, Vitamin B12)",
          "Thyroid Screening Profile (T3, T4, TSH)",
          "Myocardial Minerals index (Magnesium, Calcium, Phosphorus)",
          "Urine routine & microalbumin ratio • 20 parameters",
        ],
      },
    ];

    generateHealthPackagesPDF(packagesData);

    // Business Intelligence Tracking
    console.log("[BI TRACKING] Event: BROCHURE_DOWNLOADED", {
      timestamp: new Date().toISOString(),
      location: "Mohali Sector 69",
      packagesCount: packagesData.length,
    });
  };

  useEffect(() => {
    // Lead Conversion Tracking / Business Intelligence Simulation
    const trackEvent = (eventName: string, details?: any) => {
      console.log(`[BI TRACKING] Event: ${eventName}`, details);
    };

    // SEO: Inject Local Business JSON-LD for Search Engines
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "SRL Diagnostics Lab Mohali / Agilus Diagnostics",
      alternateName: "Agilus Diagnostics Mohali Sector 69",
      description:
        "NABL Accredited premium pathology lab in Mohali. 24/7 Home Blood Sample Collection, Wellness Packages, and 3000+ specialized tests.",
      url: window.location.href,
      logo: "https://media.agilus.in/consumer-web/agilusLogo.png",
      image: "https://media.agilus.in/consumer-web/agilusLogo.png",
      telephone: "+919115459115",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Booth No. 12, Gmada Market, near Gurukul World School, Sector 69",
        addressLocality: "Sahibzada Ajit Singh Nagar",
        addressRegion: "Punjab",
        postalCode: "160069",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "30.6891861",
        longitude: "76.7127606",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "250",
      },
      priceRange: "$$",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Track page view
    trackEvent("page_view", { path: window.location.pathname });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const [activeTab, setActiveTab] = useState<
    "overview" | "services" | "reviews" | "about"
  >("overview");
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(
              entry.target.id as "overview" | "services" | "reviews" | "about",
            );
          }
        });
      },
      { threshold: 0.6 },
    );
    ["overview", "services", "reviews", "about"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const allReviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent service. The home collection was very smooth and the reports were delivered on time via email and WhatsApp. Very professional phlebotomist.",
    },
    {
      name: "Pooja Verma",
      rating: 5,
      date: "1 month ago",
      comment:
        "One of the best labs in Mohali. Clean environment and the staff was very helpful. Highly recommended for full body checkups.",
    },
    {
      name: "Amit Gupta",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Very accurate results and fast reporting. I have been visiting this lab for 2 years now, never disappointed.",
    },
    {
      name: "Sneha Kapoor",
      rating: 4,
      date: "1 month ago",
      comment:
        "Professional staff and affordable prices. The home collection service is a life saver for my parents.",
    },
    {
      name: "Vikram Singh",
      rating: 5,
      date: "2 months ago",
      comment:
        "Agilus (SRL) Mohali has state of the art equipment. The lab is very clean and follows all safety protocols.",
    },
    {
      name: "Deepak Malhotra",
      rating: 5,
      date: "5 days ago",
      comment:
        "Prompt response for home collection and very gentle blood extraction. Highly recommended for anyone in Sector 69.",
    },
  ];

  const curatedTestimonials = [
    {
      name: "Rahul Sharma",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=12",
      quote:
        "Smooth and professional. Reports were on my WhatsApp within hours!",
    },
    {
      name: "Deepak Malhotra",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=33",
      quote:
        "The gentlest blood extraction I've ever experienced. Highly meticulous.",
    },
    {
      name: "Pooja Verma",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=44",
      quote:
        "Pristine hygiene standards. Clearly the best diagnostic lab in Mohali Sector 69.",
    },
    {
      name: "Amit Gupta",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=68",
      quote:
        "Reliable and fast. The tech stack they use for reports is very impressive.",
    },
    {
      name: "Sneha Kapoor",
      rating: 4,
      image: "https://i.pravatar.cc/150?img=45",
      quote:
        "Excellent home collection service. Their phlebotomists are very well-trained.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % curatedTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [curatedTestimonials.length]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-google-blue selection:text-white relative">
      {/* Cinematic Spotlight Backdrop - Premium Feel */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-google-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-agilus-green/5 blur-[100px] rounded-full" />
      </div>

      {/* GMB Native Mobile Quick Action Bar (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 z-[80] md:hidden bg-white/90 backdrop-blur-3xl border-t border-google-border/40 px-6 py-4 flex items-center gap-4 safe-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleCall}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <div className="w-10 h-10 rounded-full bg-google-light-grey flex items-center justify-center text-google-blue">
            <Phone className="w-5 h-5 fill-google-blue" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-google-blue">
            Call
          </span>
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <div className="w-10 h-10 rounded-full bg-agilus-green/10 flex items-center justify-center text-agilus-green">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-agilus-green">
            WhatsApp
          </span>
        </button>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex-1 bg-google-blue text-white rounded-2xl py-3 px-6 text-sm font-black shadow-xl shadow-google-blue/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4" />
          Book Now
        </button>
      </div>

      {/* Premium Floating Core Actions (Universal) */}
      <div className="fixed bottom-32 right-6 z-[70] hidden md:flex flex-col gap-5">
        <motion.button
          onClick={handleWhatsApp}
          initial={{ scale: 0, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, x: -8 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#25D366] text-white rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(37,211,102,0.3)] cursor-pointer group relative overflow-hidden active:rotate-3 transition-transform"
          aria-label="WhatsApp Enquire"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Smartphone className="w-8 h-8 relative z-10" />
        </motion.button>

        <motion.button
          onClick={handleCall}
          initial={{ scale: 0, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.1, x: -8 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#202124] text-white rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.3)] cursor-pointer group relative overflow-hidden active:-rotate-3 transition-transform"
          aria-label="Call Now"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Phone className="w-7 h-7 relative z-10" />
        </motion.button>
      </div>

      {/* Modern Cinematic Header (Floating & Polished) */}
      <header className="sticky top-4 z-[60] mx-4 sm:mx-6 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/60 px-4 sm:px-6 py-3 shadow-lg shadow-gray-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-3 flex-1 overflow-hidden">
            <Menu
              aria-label="Menu"
              className="hidden md:block w-8 h-8 text-google-grey cursor-pointer hover:bg-google-light-grey rounded-full p-1.5 flex-shrink-0"
            />
            <RouterLink
              to="/"
              className="flex items-center gap-2 hover:opacity-85 transition-opacity overflow-hidden flex-shrink-0 select-none"
            >
              {/* Official Agilus Logo Image */}
              <img
                src="https://media.agilus.in/consumer-web/agilusLogo.png"
                alt="Agilus Diagnostics"
                className="h-8 md:h-12 w-auto object-contain flex-shrink-0"
              />
            </RouterLink>
          </div>

          <div className="hidden md:flex flex-1 max-w-lg items-center bg-google-light-grey rounded-full px-4 py-2 border border-transparent focus-within:border-google-blue/30 focus-within:bg-white focus-within:shadow-sm transition-all">
            <Search className="w-4 h-4 text-google-grey mr-3" />
            <input
              type="text"
              placeholder="Search Tests or Services..."
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-google-grey"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={handleShare}
              className="hidden md:flex p-2.5 rounded-full hover:bg-google-light-grey text-google-grey transition-colors"
              aria-label="Share this app"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-4 md:px-5 py-2 md:py-2.5 bg-google-blue text-white rounded-full text-[13px] md:text-sm font-bold hover:bg-google-blue/90 shadow-sm whitespace-nowrap"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 px-4 sm:px-6">
          {/* GMB Navigation Tabs (SEO & UX Optimized) */}
          <BottomNav
            setIsBookingOpen={setIsBookingOpen}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <nav
            className="sticky top-[72px] md:top-20 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 overflow-x-auto no-scrollbar lg:col-span-12 w-full transition-all duration-300"
            aria-label="Business sections"
          >
            <div
              className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-2 md:gap-4 py-2 min-w-max px-2 md:px-0"
              role="tablist"
            >
              {[
                { id: "overview", label: "Overview", icon: House },
                { id: "services", label: "Services", icon: FlaskConical },
                { id: "reviews", label: "Reviews", icon: Star },
                { id: "about", label: "About", icon: Info },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`${tab.id}-tab`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    const el = document.getElementById(tab.id);
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`flex items-center gap-1.5 md:gap-2 py-2 md:py-3 px-3 md:px-6 rounded-lg transition-all whitespace-nowrap text-xs sm:text-[13px] md:text-sm font-semibold tracking-tight ${
                    activeTab === tab.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 ${activeTab === tab.id ? "text-blue-600" : "text-gray-500"}`}
                    aria-hidden="true"
                  />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Enhanced Hero Photo Slider Section */}
          <section
            id="overview"
            role="tabpanel"
            aria-labelledby="overview-tab"
            className="lg:col-span-12 scroll-mt-36"
          >
            <div className="relative group w-full h-[250px] sm:h-[400px] md:h-[500px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-google-border">
              <Swiper
                modules={[
                  Autoplay,
                  EffectFade,
                  SwiperNavigation,
                  Pagination,
                  A11y,
                ]}
                effect="fade"
                loop={true}
                navigation={{
                  prevEl: ".hero-swiper-prev",
                  nextEl: ".hero-swiper-next",
                }}
                pagination={{
                  clickable: true,
                  el: ".hero-swiper-pagination",
                  bulletActiveClass: "w-8 bg-google-blue",
                  bulletClass:
                    "w-3 h-3 rounded-full bg-white/60 transition-all duration-300 inline-block mx-1 cursor-pointer border border-white",
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                onSlideChange={(swiper) =>
                  setCurrentImageIndex(swiper.realIndex)
                }
                className="w-full h-full"
              >
                {heroImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="absolute inset-0">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover brightness-[0.70] md:brightness-[0.80]"
                        referrerPolicy="no-referrer"
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 p-6 md:p-12 pointer-events-none z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${currentImageIndex}`}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.15,
                          delayChildren: 0.1,
                        },
                      },
                      hidden: {
                        transition: {
                          staggerChildren: 0.05,
                          staggerDirection: -1,
                        },
                      },
                    }}
                    className="max-w-3xl pointer-events-auto"
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="flex items-center gap-2 mb-4"
                    >
                      <span className="text-xs font-black text-white bg-agilus-green px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg border border-white/20">
                        Best Diagnostic Lab in Mohali
                      </span>
                      <div className="flex items-center bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-black uppercase tracking-widest border border-white/20">
                        <CheckCircle2 className="w-3 h-3 text-agilus-green mr-2" />
                        NABL Accredited
                      </div>
                    </motion.div>
                    <motion.h1
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="text-5xl md:text-7xl font-black text-white mb-4 leading-[0.9] drop-shadow-2xl tracking-tighter"
                    >
                      {heroImages[currentImageIndex].title ===
                      "Trusted Diagnostics" ? (
                        <>
                          Best Diagnostic <br />
                          <span className="text-agilus-green">
                            Lab in Mohali.
                          </span>
                        </>
                      ) : (
                        heroImages[currentImageIndex].title
                      )}
                    </motion.h1>
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="text-white/90 text-lg md:text-2xl mb-10 max-w-2xl font-medium leading-relaxed drop-shadow-xl"
                    >
                      {heroImages[currentImageIndex].desc.includes(
                        "heart of Mohali",
                      )
                        ? "Agilus Diagnostics (Formerly SRL) Sector 69. Superior Clinical Accuracy, 24/7 Free Home Sample Collection, & 3,000+ Specialized Tests."
                        : heroImages[currentImageIndex].desc}
                    </motion.p>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="flex flex-col sm:flex-row flex-wrap gap-4 w-full justify-start"
                    >
                      <button
                        onClick={() => {
                          if (
                            heroImages[currentImageIndex].cta1.includes(
                              "Explore",
                            ) ||
                            heroImages[currentImageIndex].cta1.includes("Test")
                          ) {
                            window.open(
                              "https://agilusdiagnostics.com/care-packages/mohali/",
                              "_blank",
                            );
                          } else {
                            setIsBookingOpen(true);
                          }
                        }}
                        className="bg-google-blue hover:bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all shadow-2xl shadow-blue-900/40 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
                      >
                        <Droplets className="w-6 h-6" aria-hidden="true" />
                        {heroImages[currentImageIndex].cta1}
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            "https://agilusdiagnostics.com/care-packages/mohali/",
                            "_blank",
                          )
                        }
                        className="bg-white hover:bg-google-light-grey text-google-blue px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all active:scale-95 shadow-xl w-full sm:w-auto flex items-center justify-center"
                      >
                        {heroImages[currentImageIndex].cta2}
                      </button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Controls */}
              <button
                className="hero-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Previous slide"
              >
                <ChevronDown className="w-6 h-6 rotate-90" aria-hidden="true" />
              </button>
              <button
                className="hero-swiper-next absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Next slide"
              >
                <ChevronDown
                  className="w-6 h-6 -rotate-90"
                  aria-hidden="true"
                />
              </button>

              <div
                className="hero-swiper-pagination absolute bottom-6 right-6 z-20 flex gap-0"
                aria-label="Carousel pagination"
              />
            </div>
          </section>

          {/* Business Info Column */}
          <div className="lg:col-span-12 max-w-4xl mx-auto w-full flex flex-col space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-google-border rounded-2xl p-6 md:p-8 shadow-sm bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-2">
                    <h2 className="text-4xl font-extrabold tracking-tight text-[#202124] lg:text-5xl">
                      Agilus Diagnostics (Formerly SRL Lab) - Sector 69, Mohali
                    </h2>
                    <div className="flex items-center bg-blue-50 text-google-blue px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-google-blue/20 shadow-sm w-fit">
                      <ShieldCheck className="w-3 h-3 mr-1.5" />
                      Verified by Google
                    </div>
                  </div>
                  <p className="text-google-blue font-bold text-sm mb-3 underline decoration-google-blue/20 underline-offset-4">
                    Formerly SRL Lab • NABL Accredited Center
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-[#e7711b]">
                        4.9
                      </span>
                      <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#e7711b] text-[#e7711b]"
                          />
                        ))}
                        <StarHalf className="w-4 h-4 fill-[#e7711b] text-[#e7711b]" />
                      </div>
                    </div>
                    <span className="text-sm text-google-blue hover:underline cursor-pointer font-medium">
                      (35 Google Reviews)
                    </span>
                    <span className="text-google-border">|</span>
                    <span className="text-sm text-google-grey">
                      Open 24 Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* GMB Premium Dashboard Header */}
              <div className="flex items-center justify-between gap-4 py-8 border-b border-google-border">
                <div className="flex flex-wrap items-center gap-3 lg:gap-6">
                  <button
                    onClick={handleDirection}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-google-blue flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-google-blue/30 transition-all">
                      <Navigation className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-google-blue tracking-widest">
                      Directions
                    </span>
                  </button>
                  <button
                    onClick={handleCall}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-google-border flex items-center justify-center text-google-blue hover:bg-google-blue hover:text-white hover:border-google-blue transition-all group-hover:scale-110">
                      <Phone className="w-6 h-6 group-hover:animate-bounce" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-google-blue tracking-widest">
                      Call
                    </span>
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-[#25D366] flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all group-hover:scale-110">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-[#25D366] tracking-widest">
                      WhatsApp
                    </span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-google-border flex items-center justify-center text-google-grey hover:bg-google-grey hover:text-white transition-all group-hover:scale-110">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-google-grey tracking-widest">
                      Share
                    </span>
                  </button>
                </div>

                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex items-center gap-2 px-4 py-2 bg-agilus-green/10 border border-agilus-green/30 rounded-2xl mb-2">
                    <ShieldCheck className="w-4 h-4 text-agilus-green" />
                    <span className="text-[10px] font-black text-agilus-green uppercase tracking-widest">
                      Online Reports Ready
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-google-blue/10 border border-google-blue/30 rounded-2xl">
                    <ClipboardCheck className="w-4 h-4 text-google-blue" />
                    <span className="text-[10px] font-black text-google-blue uppercase tracking-widest">
                      Free Home Collection
                    </span>
                  </div>
                </div>
              </div>

              {/* GMB Premium Photo Widget */}
              <section id="photos" className="mt-8 mb-8 scroll-mt-24">
                <a
                  href="https://www.google.com/search?q=SRL+Lab+Mohali&stick=H4sIAAAAAAAA_-NgU1I1qDC2NEizNE4zSzY3NUkyN0yyMqgwTDQwMkk0NUtMSUlJM0lNWcTKFxzko-CTmKTgm5-RmJMJAFRg05w6AAAA&hl=en&mat=Cb-ztOnJ85ZlElcBTVDHnvpK7UZHp1TY-0rfrGw6k3-HP2Rlf5zmTam-gUBy-jnNNxTLJqL-CncUqOLzPFIw0Ngm0u7nyaen7gcyIcP1g3Q9yFqdL6qwaARNl8Cpzp6Enk4&authuser=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <div className="grid grid-cols-2 gap-2 h-[250px] sm:h-[350px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl relative group">
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={centerPhotos[0].url}
                        alt="Front view of Agilus Diagnostics Centre Mohali Sector 69"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={centerPhotos[1].url}
                        alt="Automated blood testing analyzers at Agilus Diagnostics Mohali"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={centerPhotos[2].url}
                        alt="Professional patient sample collection assistance at Agilus Mohali"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={centerPhotos[3].url}
                        alt="Modern diagnostic testing room at Agilus Lab Sector 69 Mohali"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-black text-lg backdrop-blur-sm">
                        +38
                      </div>
                    </div>
                  </div>
                </a>
              </section>

              {/* Latest Updates (GMB Posts Style) */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-[#202124] tracking-tighter">
                      Updates from Agilus
                    </h2>
                    <p className="text-google-grey text-sm font-medium mt-1">
                      Direct from our Mohali facility
                    </p>
                  </div>
                  <button className="text-google-blue text-sm font-black hover:bg-google-blue/5 px-6 py-3 rounded-2xl transition-all uppercase tracking-widest">
                    View all
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-google-border/60 rounded-[2rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all group bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-google-blue/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-google-blue/10 flex items-center justify-center shadow-inner">
                        <ShieldCheck className="w-7 h-7 text-google-blue" />
                      </div>
                      <div>
                        <p className="text-lg font-black tracking-tight">
                          NABL Gold Standard Safety
                        </p>
                        <p className="text-[11px] text-google-blue font-black uppercase tracking-widest">
                          3 days ago • Lab Update
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-google-grey/80 mb-6 leading-relaxed font-medium">
                      Our Sector 69 facility is now equipped with the latest
                      Beckman Coulter systems for 99.9% accuracy on ALL
                      profiles.
                    </p>
                    <button className="flex items-center gap-2 text-google-blue text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="border border-google-border/60 rounded-[2rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all group bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-agilus-green/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-agilus-green/10 flex items-center justify-center shadow-inner">
                        <Smartphone className="w-7 h-7 text-agilus-green" />
                      </div>
                      <div>
                        <p className="text-lg font-black tracking-tight">
                          Premium Home Collection
                        </p>
                        <p className="text-[11px] text-agilus-green font-black uppercase tracking-widest">
                          5 days ago • Patient Care
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-google-grey/80 mb-6 leading-relaxed font-medium">
                      Free phlebotomy services within 5km of Sector 69. High
                      precision, zero-discomfort guarantee for all ages.
                    </p>
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="flex items-center gap-2 text-agilus-green text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all"
                    >
                      Book Slot Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>

              <div className="space-y-6 pt-8">
                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-google-light-grey flex items-center justify-center shrink-0 group-hover:bg-google-blue/10 transition-colors">
                    <MapPin className="w-5 h-5 text-google-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-google-grey uppercase tracking-widest text-[10px] mb-1">
                      Clinic Address
                    </p>
                    <p className="text-sm leading-relaxed font-medium">
                      Booth No. 12, Gmada Market, near Gurukul World School,
                      Sector 69, Sahibzada Ajit Singh Nagar, Punjab 160069
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-google-light-grey flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-google-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-google-grey uppercase tracking-widest text-[10px] mb-1">
                      Opening Hours
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-green-700">
                        Open 24 hours
                      </span>
                      <span className="text-xs text-google-grey">
                        • Every day of the week
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-google-light-grey flex items-center justify-center shrink-0 group-hover:bg-google-blue/10 transition-colors">
                    <Phone className="w-5 h-5 text-google-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-google-grey uppercase tracking-widest text-[10px] mb-1">
                      Direct Contact
                    </p>
                    <p className="text-lg text-google-blue font-bold tracking-tight">
                      091154 59115
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-google-blue text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-md transition-shadow">
                <Phone className="w-4 h-4" />
                Call Now
              </button>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 border border-google-border px-6 py-2.5 rounded-full text-sm font-medium hover:bg-google-light-grey transition-colors text-google-blue"
              >
                <MessageSquare className="w-4 h-4" />
                Make Appointment
              </button>
            </div>

            {/* Clinical Trust & Scale Benchmarks (Business Intelligence Visuals) */}
            <section className="py-8 border-y border-google-border mb-8 bg-google-light-grey/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-black text-[#202124] mb-1">
                    3000+
                  </span>
                  <span className="text-[10px] font-bold text-google-grey uppercase tracking-[0.2em]">
                    Clinical Tests
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-black text-google-blue mb-1">
                    24/7
                  </span>
                  <span className="text-[10px] font-bold text-google-grey uppercase tracking-[0.2em]">
                    Sample Support
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-black text-[#202124] mb-1">
                    100%
                  </span>
                  <span className="text-[10px] font-bold text-google-grey uppercase tracking-[0.2em]">
                    NABL Aligned
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-black text-google-blue mb-1">
                    1-Hour
                  </span>
                  <span className="text-[10px] font-bold text-google-grey uppercase tracking-[0.2em]">
                    Home Response
                  </span>
                </div>
              </div>
            </section>

            {/* Hyper-Local SEO Section: Targeting Mohali Sector 69 & Surroundings */}
            <section className="mb-12 bg-google-blue/[0.02] border border-google-blue/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-google-blue/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-google-blue/10 text-google-blue text-[10px] font-black px-3 py-1 rounded border border-google-blue/20 uppercase tracking-widest leading-none">
                      Local Experts
                    </span>
                    <div className="h-px w-8 bg-google-blue/20" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-[#202124] tracking-tighter mb-6 leading-tight">
                    Trusted Pathology Near <br />
                    <span className="text-google-blue">
                      Sohana Gurudwara
                    </span>
                    .
                  </h2>
                  <p className="text-lg text-google-grey mb-8 font-medium leading-relaxed">
                    Strategically located in the heart of Gmada Market, Sector
                    69, Agilus Diagnostics (formerly SRL) is Mohali's premier
                    clinical laboratory. We serve residents across Sector 69,
                    70, 71, Mohali Phase 7, 8, 9, 10, and 11 with rapid,
                    reliable diagnostics.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      "Home Collection in 60 Mins",
                      "NABL Accredited Facility",
                      "Results on WhatsApp/Email",
                      "Qualified Phlebotomists",
                      "Landmark: Sector 69 Market",
                      "Serving All Mohali Sectors",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm font-bold text-[#202124]"
                      >
                        <div className="w-5 h-5 rounded-full bg-agilus-green/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-agilus-green" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="bg-google-blue hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-black transition-all shadow-xl shadow-google-blue/20 flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Plan Your Visit
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-google-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-google-light-grey flex items-center justify-center">
                        <Navigation className="w-6 h-6 text-google-blue" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-google-grey uppercase tracking-widest leading-none mb-1">
                          Clinic Proximity
                        </p>
                        <p className="text-sm font-black">
                          GMADA Market, Sector 69
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-bold p-2 bg-google-light-grey/50 rounded-lg">
                        <span className="text-google-grey">Sector 70</span>
                        <span className="text-google-blue">1.2 KM</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold p-2 bg-google-light-grey/50 rounded-lg">
                        <span className="text-google-grey">Phase 7 Mohali</span>
                        <span className="text-google-blue">2.5 KM</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold p-2 bg-google-light-grey/50 rounded-lg">
                        <span className="text-google-grey">
                          Chandigarh Border
                        </span>
                        <span className="text-google-blue">4.0 KM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Premier Health Packages (Indian Context) */}
            <section className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 px-2 md:px-0 gap-4">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-[#202124] tracking-tight">
                    Fullbody Health Packages
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse" />
                    <p className="text-xs font-bold text-google-blue uppercase tracking-widest">
                      NABL Accredited • Agilus Global Standards
                    </p>
                  </div>
                </div>

                {/* Direct Swiping Controls & Interaction */}
                <div className="flex items-center gap-2 px-1 sm:px-0">
                  <button
                    onClick={() => handlePackageScroll("prev")}
                    disabled={activePackageIndex === 0}
                    className={`p-2.5 rounded-full border border-google-border/70 bg-white shadow-sm flex items-center justify-center transition-all duration-300 ${
                      activePackageIndex === 0
                        ? "text-gray-300 cursor-not-allowed opacity-40 scale-95"
                        : "text-google-blue hover:bg-google-blue/5 hover:border-google-blue/30 hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer"
                    }`}
                    aria-label="Previous Health Package"
                  >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  </button>
                  <button
                    onClick={() => handlePackageScroll("next")}
                    disabled={activePackageIndex === LAB_WELLNESS_PACKAGES.length - 1}
                    className={`p-2.5 rounded-full border border-google-border/70 bg-white shadow-sm flex items-center justify-center transition-all duration-300 ${
                      activePackageIndex === LAB_WELLNESS_PACKAGES.length - 1
                        ? "text-gray-300 cursor-not-allowed opacity-40 scale-95"
                        : "text-google-blue hover:bg-google-blue/5 hover:border-google-blue/30 hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer"
                    }`}
                    aria-label="Next Health Package"
                  >
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

              {/* Slider Container - Snaps perfectly in mobile and desktop */}
              <div
                ref={packageScrollRef}
                onScroll={handlePackageScrollEvent}
                className="flex gap-5 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory scroll-px-4 md:scroll-px-0"
              >
                {LAB_WELLNESS_PACKAGES.map((pkg) => {
                  const IconComponent = pkg.icon;
                  return (
                    <div
                      key={pkg.id}
                      data-package-card
                      className="snap-center w-[265px] sm:w-[295px] md:w-[315px] flex-shrink-0 border border-google-border rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white group cursor-pointer relative flex flex-col justify-between"
                      onClick={() => {
                        setSelectedInclusionsPackage(pkg);
                        setInclusionsGender("men");
                      }}
                    >
                      {/* Top Medical Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md border border-google-border/40 group-hover:bg-google-blue group-hover:text-white transition-all duration-500">
                          <ShieldCheck className="w-4 h-4 text-google-blue group-hover:text-white" />
                        </div>
                      </div>

                      {/* Top Visual Panel */}
                      <div className="h-44 overflow-hidden relative rounded-t-[2.15rem]">
                        <div className={`w-full h-full p-5 flex flex-col justify-between relative overflow-hidden ${pkg.bgClass} select-none`}>
                          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/20 blur-md pointer-events-none" />
                          <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-sm pointer-events-none" />
                          
                          <div className="flex items-center justify-between z-10 w-full animate-fade-in">
                            <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md border ${pkg.badgeBg} ${pkg.badgeText} shadow-sm`}>
                              {pkg.priceText}
                            </span>
                            <div className="p-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm border border-white/30">
                              <IconComponent className={`w-4 h-4 ${pkg.textColorClass}`} />
                            </div>
                          </div>

                          <div className="z-10 mt-2">
                            <h4 className={`text-base font-extrabold tracking-tight leading-tight ${pkg.textColorClass} mb-1`}>
                              {pkg.title}
                            </h4>
                            <p className={`text-[10px] leading-snug font-semibold opacity-90 ${pkg.textColorClass} line-clamp-2`}>
                              {pkg.sub}
                            </p>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                          <span className="bg-google-blue text-white text-[9px] font-black px-3 py-1.5 rounded-lg shadow-xl tracking-[0.2em] uppercase border border-white/20 select-none">
                            NABL QUALITY APPROVED
                          </span>
                        </div>
                      </div>

                      {/* Content Panel */}
                      <div className="p-6 flex-grow flex flex-col justify-between bg-white">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-[10px] uppercase font-black text-google-blue tracking-[0.15rem] bg-google-blue/5 px-2.5 py-1 rounded-md border border-google-blue/10">
                              {pkg.parameters}
                            </p>
                            <div className="w-2 h-2 rounded-full bg-google-blue animate-pulse shadow-[0_0_12px_rgba(66,133,244,0.8)]" />
                          </div>
                          <h3 className="font-extrabold text-[#202124] text-lg group-hover:text-google-blue transition-colors mb-2.5 leading-[1.2]">
                            {pkg.title}
                          </h3>
                          <p className="text-xs text-google-grey leading-relaxed font-semibold line-clamp-3 mb-4">
                            {pkg.desc}
                          </p>

                          {/* Attribute Indicators */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {pkg.features.slice(0, 4).map((feature, i) => (
                              <span key={i} className="text-[9px] font-black text-google-grey/95 bg-google-border/40 px-2 py-1 rounded-md">
                                {feature}
                              </span>
                            ))}
                            {pkg.features.length > 4 && (
                              <span className="text-[9px] font-black text-google-blue bg-google-blue/5 border border-google-blue/10 px-2 py-1 rounded-md">
                                +{pkg.features.length - 4} More
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Interactive Footer buttons */}
                        <div className="flex gap-2 pt-4 border-t border-google-border/40">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInclusionsPackage(pkg);
                              setInclusionsGender("men");
                            }}
                            className="flex-1 py-2 text-[10px] font-black border border-google-border text-google-blue bg-white rounded-full hover:border-google-blue hover:bg-google-blue/5 transition-all uppercase tracking-wider text-center"
                          >
                            View Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPackageForBooking(pkg.title);
                              setIsBookingOpen(true);
                            }}
                            className="flex-1 py-2 text-[10px] font-black bg-google-blue text-white rounded-full hover:bg-blue-700 hover:shadow-md transition-all active:scale-95 uppercase tracking-wider text-center"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress dots at bottom */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {LAB_WELLNESS_PACKAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePackageDotClick(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activePackageIndex === idx
                        ? "w-6 bg-google-blue"
                        : "w-1.5 bg-gray-200 hover:bg-gray-300"
                    }`}
                    aria-label={`Show package ${idx + 1}`}
                  />
                ))}
              </div>
            </section>

            {/* Video Section (Senior Feel) */}
            <a
              href="https://youtu.be/lyGfyFxq3Cw?si=iBH_GREPqhHWj0qI"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-google-border rounded-xl md:rounded-2xl overflow-hidden shadow-sm aspect-video md:aspect-[21/9] lg:aspect-[3/1] relative group cursor-pointer mb-12"
            >
              <img
                src="https://img.youtube.com/vi/lyGfyFxq3Cw/maxresdefault.jpg"
                className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-700"
                alt="Agilus Diagnostics SRL Lab Mohali Virtual Tour - Inside the Clinical Facility"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-lg border border-white/20">
                  <Play className="w-6 h-6 md:w-8 md:h-8 fill-white translate-x-0.5" />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 tracking-tight text-white drop-shadow-md">
                  Take a Virtual Tour
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-100 max-w-sm md:max-w-md drop-shadow-sm font-medium">
                  Experience the precision and hygiene standards of Agilus
                  Diagnostics state-of-the-art facilities.
                </p>
              </div>
            </a>

            {/* Detailed Specialized Services Page Section */}
            <section
              id="services"
              role="tabpanel"
              aria-labelledby="services-tab"
              className="border border-google-border rounded-xl p-6 shadow-sm scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#202124]">
                    Specialized Test Menu
                  </h2>
                  <p className="text-sm text-google-grey mt-1">
                    Directory of Services (DoS) effective from August 2025
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    Book Online
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-google-border">
                      <th className="py-4 px-2 text-xs font-bold text-google-grey uppercase tracking-wider">
                        Test Name
                      </th>
                      <th className="py-4 px-2 text-xs font-bold text-google-grey uppercase tracking-wider">
                        Delivery Speed
                      </th>
                      <th className="py-4 px-2 text-xs font-bold text-google-grey uppercase tracking-wider text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testMenu.map((test, idx) => (
                      <ExpandableTestRow
                        key={idx}
                        test={test}
                        onBook={() => setIsBookingOpen(true)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-google-light-grey/30 rounded-2xl border border-google-border/40">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-google-border/50">
                    <FlaskConical className="w-5 h-5 text-google-blue" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Automated Precision</h5>
                    <p className="text-[11px] text-google-grey leading-relaxed mt-1">
                      International standards using advanced robotic lab
                      systems.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-google-border/50">
                    <Activity className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Super Specialized</h5>
                    <p className="text-[11px] text-google-grey leading-relaxed mt-1">
                      High-end genomics, molecular & histopathology expertise.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-google-border/50">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Rapid TAT</h5>
                    <p className="text-[11px] text-google-grey leading-relaxed mt-1">
                      Fast turnaround times with real-time report delivery.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section
              id="services"
              className="border border-google-border rounded-xl p-6 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-normal flex items-center gap-2">
                  Services Provided
                  <span className="text-xs bg-google-blue/10 text-google-blue px-2 py-0.5 rounded-full font-medium">
                    10+
                  </span>
                </h2>
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-google-grey tracking-widest">
                  Verified <CheckCircle2 className="w-3 h-3 text-green-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    name: "Blood Test Home Collection",
                    icon: Droplets,
                    color: "text-red-600",
                    bg: "bg-red-50",
                  },
                  {
                    name: "COVID-19 RT-PCR Test",
                    icon: MicroscopeIcon,
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    name: "Pathology Lab Services",
                    icon: FlaskConical,
                    color: "text-purple-600",
                    bg: "bg-purple-50",
                  },
                  {
                    name: "Full Body Checkup",
                    icon: HeartPulse,
                    color: "text-rose-600",
                    bg: "bg-rose-50",
                  },
                  {
                    name: "Vitamin D & B12 Screening",
                    icon: Syringe,
                    color: "text-emerald-600",
                    bg: "bg-emerald-50",
                  },
                  {
                    name: "Thyroid Function Tests",
                    icon: Activity,
                    color: "text-orange-600",
                    bg: "bg-orange-50",
                  },
                  {
                    name: "Diabetes Management",
                    icon: Gauge,
                    color: "text-amber-600",
                    bg: "bg-amber-50",
                  },
                  {
                    name: "Kidney Function Tests",
                    icon: Stethoscope,
                    color: "text-cyan-600",
                    bg: "bg-cyan-50",
                  },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl border border-google-border/50 hover:border-google-blue/30 hover:shadow-sm transition-all group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${service.bg} flex items-center justify-center ${service.color} transition-transform group-hover:scale-110`}
                    >
                      <service.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-google-grey group-hover:text-[#202124] block">
                        {service.name}
                      </span>
                      <span className="text-[10px] text-google-grey/60 uppercase tracking-tight">
                        Available Today
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-google-border group-hover:text-google-blue transition-colors" />
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full border border-google-border py-2.5 rounded-lg text-sm font-medium hover:bg-google-light-grey transition-colors text-google-blue">
                Explore All Diagnostic Tests
              </button>
            </section>

            {/* Awards & Excellence Benchmarks */}
            <section
              id="about"
              role="tabpanel"
              aria-labelledby="about-tab"
              className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-24"
            >
              <div className="border border-google-border rounded-2xl p-8 shadow-sm flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#FFF9F0] to-white relative overflow-hidden group hover:shadow-xl hover:border-google-blue/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-colors"></div>
                <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#202124] mb-6">
                  {" "}
                  Our Journey Since 1997{" "}
                </h3>
                <div className="w-full aspect-[4/3] border border-white shadow-2xl bg-white rounded-xl p-2 overflow-hidden transform group-hover:scale-[1.03] transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800&fm=webp"
                    alt="Clinical Excellence - State of the art Lab Equipment at SRL Mohali Center"
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg"></div>
                </div>
                <p className="mt-8 text-sm text-google-grey max-w-sm leading-relaxed">
                  Since 1997, our commitment as SRL, now Agilus Diagnostics, has
                  been deeply rooted in Mohali. We take immense pride in our
                  long legacy of providing top-tier clinical accuracy and
                  reliable diagnostics, caring for generations of families with
                  the same passion and precision.
                </p>
              </div>

              <div className="border border-google-border rounded-2xl shadow-sm overflow-hidden group flex flex-col hover:shadow-xl hover:border-google-blue/20 transition-all duration-500">
                <div className="h-72 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800&fm=webp"
                    alt="Premium Healthcare Interior & Professional Standards at Agilus diagnostics Mohali Sector 69."
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 z-10 transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="bg-google-blue/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block shadow-lg border border-white/20 mb-3">
                      Visit Our Center
                    </span>
                    <h3 className="text-white text-2xl font-bold leading-tight">
                      MNC Styled Clinical Infrastructure
                    </h3>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-between flex-1 bg-white">
                  <p className="text-sm text-google-grey mb-6 leading-relaxed">
                    Our Sector 69 facility is designed to provide a{" "}
                    <strong>World-Class Diagnostic Experience</strong> with
                    minimal wait times, fully automated robotics, and a sterile
                    patients-first environment.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/tPN5MedC4LLAbe4P8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full py-4 px-6 bg-[#f8f9fa] hover:bg-google-blue hover:text-white rounded-xl text-sm font-bold transition-all border border-google-border"
                  >
                    Experience Our Quality <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* Patient Safety & Clinical Standards Section */}
            <section className="mb-12 border border-google-border rounded-2xl p-8 shadow-sm bg-white overflow-hidden relative hover:border-google-blue/30 transition-all duration-500">
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-google-blue/5 rounded-full blur-3xl" />
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-google-blue/10 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6 text-google-blue" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#202124] mb-6 tracking-tight">
                    Committed to Patient Safety & Medical Ethics
                  </h2>
                  <p className="text-base text-google-grey mb-8 leading-relaxed max-w-lg">
                    At SRL Lab Mohali (Agilus Diagnostics), we prioritize{" "}
                    <strong>Clinical Governance</strong>. Our team undergoes
                    rigorous training on international safety standards, hygiene
                    protocols, and <strong>PoSH</strong> (Prevention of Sexual
                    Harassment) to ensure a safe, dignified, and world-class
                    care experience for every patient.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                      <CheckCircle2 className="w-6 h-6 text-google-blue shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-[#202124]">
                          NABL Verified
                        </p>
                        <p className="text-[11px] text-google-grey mt-0.5">
                          ISO 15189 Quality
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-google-light-grey/30 p-4 rounded-xl border border-google-border/40">
                      <Clock className="w-6 h-6 text-google-grey shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-[#202124]">
                          24/7 Support
                        </p>
                        <p className="text-[11px] text-google-grey mt-0.5">
                          Round-the-clock tests
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[40%] aspect-[4/3] relative rounded-2xl border border-google-border overflow-hidden bg-white shadow-2xl p-3 group">
                  <img
                    src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800&fm=webp"
                    alt="Agilus Diagnostics commitment to medical standards and professional phlebotomy training"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section
              id="reviews"
              role="tabpanel"
              aria-labelledby="reviews-tab"
              className="border border-google-border rounded-2xl p-6 md:p-8 shadow-sm bg-white scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#202124] flex items-center gap-3">
                    Patient Reviews
                    <div className="flex items-center bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                      <span className="text-[10px] font-bold text-green-700 uppercase">
                        4.9 / 5.0
                      </span>
                    </div>
                  </h2>
                  <p className="text-sm text-google-grey mt-1">
                    Based on 250+ verified patient experiences
                  </p>
                </div>
                <button
                  onClick={() =>
                    window.open(
                      "https://g.page/r/Ce303a1WSgIaEBM/review",
                      "_blank",
                    )
                  }
                  className="bg-google-blue/10 text-google-blue text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-google-blue/20 transition-all flex items-center gap-2"
                >
                  <Star className="w-4 h-4 fill-google-blue" />
                  Write a Review
                </button>
              </div>

              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {allReviews.slice(0, visibleReviews).map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        delay: (index % visibleReviews) * 0.1,
                      }}
                    >
                      <ReviewItem
                        name={review.name}
                        rating={review.rating}
                        date={review.date}
                        comment={review.comment}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {visibleReviews < allReviews.length && (
                <button
                  onClick={() =>
                    window.open(
                      "https://g.page/r/Ce303a1WSgIaEBM/review",
                      "_blank",
                    )
                  }
                  className="mt-10 w-full flex items-center justify-center gap-2 border border-blue-100 bg-blue-50 py-4 rounded-2xl text-sm font-black text-blue-700 hover:bg-blue-100 transition-all group"
                >
                  See All Experiences on Google
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </section>

            {/* FAQ Section */}
            <section className="border border-google-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-normal mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                <FaqItem
                  question="Do you offer home collection in Mohali?"
                  answer="Yes, we offer 24/7 home collection services across Mohali, Chandigarh, and Kharar. Our certified phlebotomists ensure a painless and hygienic experience."
                />
                <FaqItem
                  question="How can I book an appointment?"
                  answer="Booking is simple. You can call us directly at 091154 59115, use the 'Make Appointment' form on this website, or visit our Sector 69 center."
                />
                <FaqItem
                  question="When will I get my blood test reports?"
                  answer="Most reports are processed within 6 to 12 hours. You'll receive them instantly on WhatsApp and your registered email address."
                />
                <FaqItem
                  question="Are you open on Sundays and Holidays?"
                  answer="Yes, SRL Lab Mohali is open 24 hours, 7 days a week, including all Sundays and public holidays for your convenience."
                />
              </div>
            </section>

            {/* Verified Directory Listings (Citations) */}
            <section className="border border-google-border rounded-xl p-6 shadow-sm bg-google-light-grey/30">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-google-blue" />
                <h2 className="text-lg font-medium">
                  Verified Digital Presence
                </h2>
              </div>
              <p className="text-sm text-google-grey mb-6 leading-relaxed">
                SRL Lab Mohali is a verified healthcare provider across leading
                digital platforms. Access our live profiles for real-time
                customer feedback and ratings.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <DirectoryLink
                  name="Justdial"
                  icon="JD"
                  url="https://www.justdial.com/Mohali/Srl-Lab-Mohali-Post-Office-Ptl-Chowk/0172PX172-X172-241016220516-Q1B9_BZDET"
                />
                <DirectoryLink
                  name="Sulekha"
                  icon="S"
                  url="https://www.sulekha.com/srl-lab-mohali"
                />
                <DirectoryLink
                  name="IndiaMart"
                  icon="IM"
                  url="https://www.indiamart.com/srl-diagnostics-mohali"
                />
                <DirectoryLink
                  name="Mediyaar"
                  icon="M"
                  url="https://mediyaar.com/lab/srl-lab-mohali"
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-google-blue p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-medium">Book Appointment</h3>
                <p className="text-white/80 text-sm">
                  SRL Lab Mohali • Formerly SRL
                </p>
              </div>
              <button
                onClick={closeBooking}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              {bookingStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-medium mb-2">
                    Booking Confirmed!
                  </h4>
                  <p className="text-google-grey mb-8">
                    Our team will call you shortly to confirm the preferred time
                    slot.
                  </p>
                  <button
                    onClick={closeBooking}
                    className="w-full bg-google-blue text-white py-3 rounded-xl font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleBookingSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {selectedPackageForBooking && (
                    <div className="p-4 bg-google-blue/5 border border-google-blue/15 rounded-xl flex items-start gap-3 animate-fade-in">
                      <div className="p-2 bg-google-blue/10 rounded-lg text-google-blue mt-0.5">
                        <ClipboardCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-google-blue tracking-wider">PRE-SELECTED WELLNESS PACKAGE</p>
                        <h4 className="font-extrabold text-[#202124] text-sm">{selectedPackageForBooking}</h4>
                        <p className="text-[11px] text-google-grey mt-0.5 font-medium">This package has been pre-locked. Same-day clinical processing is standard.</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      aria-label="Full Name"
                      aria-required="true"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={
                        formErrors.name ? "name-error" : undefined
                      }
                      type="text"
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${formErrors.name ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name)
                          setFormErrors({ ...formErrors, name: undefined });
                      }}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="text-xs text-red-500 mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        aria-label="Phone Number"
                        aria-required="true"
                        aria-invalid={!!formErrors.phone}
                        aria-describedby={
                          formErrors.phone ? "phone-error" : undefined
                        }
                        type="tel"
                        placeholder="+91 0000000000"
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${formErrors.phone ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (formErrors.phone)
                            setFormErrors({ ...formErrors, phone: undefined });
                        }}
                      />
                      {formErrors.phone && (
                        <p
                          id="phone-error"
                          className="text-xs text-red-500 mt-1"
                        >
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                        Email (Optional)
                      </label>
                      <input
                        id="email"
                        aria-label="Email Address"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={
                          formErrors.email ? "email-error" : undefined
                        }
                        type="email"
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${formErrors.email ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email)
                            setFormErrors({ ...formErrors, email: undefined });
                        }}
                      />
                      {formErrors.email && (
                        <p
                          id="email-error"
                          className="text-xs text-red-500 mt-1"
                        >
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                        Preferred Date *
                      </label>
                      <input
                        id="booking-date"
                        aria-label="Preferred Appointment Date"
                        aria-required="true"
                        aria-invalid={!!formErrors.date}
                        aria-describedby={
                          formErrors.date ? "date-error" : undefined
                        }
                        type="date"
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${formErrors.date ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                        value={formData.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (formErrors.date)
                            setFormErrors({ ...formErrors, date: undefined });
                        }}
                      />
                      {formErrors.date && (
                        <p
                          id="date-error"
                          className="text-xs text-red-500 mt-1"
                        >
                          {formErrors.date}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                        Preferred Time *
                      </label>
                      <select
                        id="booking-time"
                        aria-label="Preferred Appointment Time Slot"
                        aria-required="true"
                        aria-invalid={!!formErrors.time}
                        aria-describedby={
                          formErrors.time ? "time-error" : undefined
                        }
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-white ${formErrors.time ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                        value={formData.time}
                        onChange={(e) => {
                          setFormData({ ...formData, time: e.target.value });
                          if (formErrors.time)
                            setFormErrors({ ...formErrors, time: undefined });
                        }}
                      >
                        <option value="">Select Slot</option>
                        {Array.from({ length: 28 }).map((_, i) => {
                          const totalMinutes = 6 * 60 + 30 + i * 30;
                          const hour = Math.floor(totalMinutes / 60);
                          const minute = totalMinutes % 60;

                          const formattedHour = hour > 12 ? hour - 12 : hour;
                          const ampm = hour >= 12 ? "PM" : "AM";
                          const formattedMinute = minute === 0 ? "00" : "30";
                          const time = `${formattedHour}:${formattedMinute} ${ampm}`;
                          return (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          );
                        })}
                      </select>
                      {formErrors.time && (
                        <p
                          id="time-error"
                          className="text-xs text-red-500 mt-1"
                        >
                          {formErrors.time}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    id="submit-booking"
                    aria-label="Confirm Appointment Booking"
                    disabled={bookingStatus === "submitting"}
                    type="submit"
                    className="w-full bg-google-blue text-white py-4 rounded-xl font-medium text-lg mt-4 shadow-lg shadow-google-blue/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {bookingStatus === "submitting" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Appointment
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-google-grey mt-4">
                    By confirming, you agree to our privacy policy. Data is
                    encrypted and stored securely.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Inclusions / Clinical Details Modal */}
      {selectedInclusionsPackage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedInclusionsPackage(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
          >
            {/* Header section with theme background */}
            <div className="p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.95) 0%, rgba(26, 115, 232, 0.95) 100%)' }}>
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10 blur-md pointer-events-none" />
              <div className="flex justify-between items-start gap-4 z-10 relative">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] bg-white/25 text-white font-black px-2.5 py-1 rounded-md tracking-wider uppercase border border-white/20">
                      {selectedInclusionsPackage.priceText}
                    </span>
                    <span className="text-[10px] bg-white text-google-blue font-black px-2.5 py-1 rounded-md tracking-wider uppercase">
                      NABL Verified
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">{selectedInclusionsPackage.title}</h3>
                  <p className="text-white/80 text-xs font-semibold mt-1">Detailed Diagnostic Clinical Parameters</p>
                </div>
                <button
                  onClick={() => setSelectedInclusionsPackage(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow no-scrollbar">
              {/* Core Description block */}
              <div>
                <h4 className="text-xs font-black text-google-grey uppercase tracking-wider mb-2">Package Clinical Scope</h4>
                <p className="text-sm text-google-grey leading-relaxed font-semibold">
                  {selectedInclusionsPackage.desc}
                </p>
              </div>

              {/* Special Gender-Specific parameters (PSA vs CA-125) */}
              {(selectedInclusionsPackage.menSpecial || selectedInclusionsPackage.womenSpecial) && (
                <div className="p-5 border border-google-blue/15 bg-google-blue/5 rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h4 className="text-xs font-black text-google-blue uppercase tracking-widest">Gender-Specific Clinical Screening</h4>
                      <p className="text-[10px] text-google-grey mt-0.5 font-semibold">Pre-configured diagnostic parameters</p>
                    </div>
                    {/* Gender switcher knobs */}
                    <div className="flex gap-1 bg-google-border/40 p-1 rounded-xl self-start sm:self-auto relative select-none">
                      <button
                        onClick={() => setInclusionsGender("men")}
                        className={`relative z-10 px-4 py-1.5 text-[10px] font-black rounded-lg transition-colors duration-350 uppercase tracking-wider ${inclusionsGender === "men" ? "text-white" : "text-google-grey hover:text-[#202124]"}`}
                      >
                        {inclusionsGender === "men" && (
                          <motion.div
                            layoutId="gender-active-pill"
                            className="absolute inset-0 bg-google-blue rounded-lg -z-10 shadow-sm"
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          />
                        )}
                        Male (PSA)
                      </button>
                      <button
                        onClick={() => setInclusionsGender("women")}
                        className={`relative z-10 px-4 py-1.5 text-[10px] font-black rounded-lg transition-colors duration-350 uppercase tracking-wider ${inclusionsGender === "women" ? "text-white" : "text-google-grey hover:text-[#202124]"}`}
                      >
                        {inclusionsGender === "women" && (
                          <motion.div
                            layoutId="gender-active-pill"
                            className="absolute inset-0 bg-google-blue rounded-lg -z-10 shadow-sm"
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          />
                        )}
                        Female (CA-125)
                      </button>
                    </div>
                  </div>

                  {/* Gender Specific Display Info */}
                  <AnimatePresence mode="wait">
                    {inclusionsGender === "men" ? (
                      <motion.div
                        key="men"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-start gap-4"
                      >
                        <div className="p-2.5 bg-blue-100 rounded-xl text-google-blue shrink-0">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-google-blue uppercase tracking-wider">Male Diagnostic Inclusion</span>
                          </div>
                          <p className="text-xs text-[#202124] font-semibold mt-1 leading-relaxed">
                            {selectedInclusionsPackage.menSpecial || "PSA Test Panel - Included and monitored for prostate cellular growth factors and urinary integrity health checks."}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="women"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-start gap-4"
                      >
                        <div className="p-2.5 bg-purple-100 text-[#4C1D95] rounded-xl shrink-0">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-[#4C1D95] uppercase tracking-wider">Female Diagnostic Inclusion</span>
                          </div>
                          <p className="text-xs text-[#202124] font-semibold mt-1 leading-relaxed">
                            {selectedInclusionsPackage.womenSpecial || "CA-125 Ovarian Screen - Included to run diagnostics on ovarian, cellular, and holistic reproductive system health."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Accordion Categorized Clinical details */}
              <div>
                <h4 className="text-xs font-black text-google-grey uppercase tracking-wider mb-3">Comprehensive Test Categories ({selectedInclusionsPackage.testGroups?.length || 0})</h4>
                <div className="space-y-3">
                  {selectedInclusionsPackage.testGroups?.map((group: any, i: number) => (
                    <div key={i} className="p-4 border border-google-border/70 rounded-xl hover:border-google-blue/30 hover:bg-slate-50/50 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse" />
                        <h5 className="font-extrabold text-sm text-[#202124]">{group.name}</h5>
                      </div>
                      <p className="text-xs text-google-grey leading-relaxed font-semibold pl-3.5">
                        {group.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note on home collection */}
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/50 flex gap-3 text-amber-800">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wide text-amber-700">Patient Preparation Guideline</p>
                  <p className="text-[11px] leading-relaxed font-semibold mt-0.5 text-amber-900/90">
                    A standard 10-12 hours overnight fasting is clinically required for blood sampling in these packages. Free home sample collection in Mohali is standard. Call <a href="tel:+919115459115" className="underline font-bold">+91 91154 59115</a> for setup.
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-google-border">
              <button
                onClick={() => {
                  setSelectedPackageForBooking(selectedInclusionsPackage.title);
                  setSelectedInclusionsPackage(null);
                  setIsBookingOpen(true);
                }}
                className="w-full py-3.5 text-xs font-black bg-google-blue text-white rounded-xl hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all text-center uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Book {selectedInclusionsPackage.priceText}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Floating Actions */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-google-border z-50">
        <a
          href="tel:09115459115"
          className="flex items-center gap-2 text-sm font-medium text-google-blue px-3 py-1.5 border-r border-google-border pr-4"
        >
          <Phone className="w-4 h-4 fill-google-blue" />
          Call
        </a>
        <button className="flex items-center gap-2 text-sm font-medium text-google-blue px-3 py-1.5">
          <Navigation className="w-4 h-4" />
          Directions
        </button>
      </div>

      <footer className="bg-[#1a1a1b] text-white pt-16 pb-24 md:pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex flex-col space-y-1">
                <div className="flex items-baseline">
                  <img
                    src="https://media.agilus.in/consumer-web/agilusLogo.png"
                    alt="Agilus Diagnostics"
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                </div>
                <p className="text-[9px] text-[#E85D23] font-bold tracking-[0.05em] uppercase pt-2">
                  Authorised Home Visit Partner in Mohali
                </p>
              </div>
              <p className="text-sm text-google-grey mb-8 leading-relaxed mt-6">
                Agilus Diagnostics Mohali Formerly SRL Lab Mohali is a leading
                pathology center in Sector 69. We are NABL accredited and
                specialize in clinical blood tests, home collection, and
                MNC-standard diagnostic precision for patients in Mohali and
                Chandigarh.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  title="Instagram"
                  href="https://www.instagram.com/srl_lab_mohali_home_collection/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E1306C] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  title="Facebook"
                  href="https://www.facebook.com/SRLLabMohali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  title="JustDial"
                  href="https://www.justdial.com/Mohali/Srl-Lab-Mohali-Post-Office-Ptl-Chowk/0172PX172-X172-241016220516-Q1B9_BZDET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF8A00] hover:-translate-y-1 transition-all cursor-pointer font-black text-sm text-white"
                >
                  JD
                </a>
                <a
                  title="Apple Maps"
                  href="https://maps.apple.com/?address=Booth%20No%2012%0ASector%2069,%20Sahibzada%20Ajit%20Singh%20Nagar%0AMohali%0APunjab%20160069%0AIndia&auid=17299077469199884354&ll=30.689314,76.715340&lsp=9902&q=SRL%20Lab%20Mohali%20-%20Home%20Collection&_ext=CjMKBQgEEIwBCgQIBRADCgUIBhDXAwoECAoQAAoECFIQAwoECFUQEQoECFkQBAoFCMEBEAESJinROHk2UK8+QDEfAv10ci1TQDnlmgKZnbE+QEEmoZnMHS5TQFAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5E5E5E] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <Map className="w-5 h-5 text-white" />
                </a>
                <a
                  title="Google Maps"
                  href="https://maps.app.goo.gl/tPN5MedC4LLAbe4P8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#4285F4] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <MapPin className="w-5 h-5 text-white" />
                </a>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-google-grey mb-4">
                  Verified Citations (Google Aligned)
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    title="JustDial"
                    href="https://www.justdial.com/Mohali/Srl-Lab-Mohali-Post-Office-Ptl-Chowk/0172PX172-X172-241016220516-Q1B9_BZDET"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF8A00] transition-colors font-black text-[10px] text-white tooltip-trigger"
                    aria-label="JustDial"
                  >
                    JD
                  </a>
                  <a
                    title="Sulekha"
                    href="https://www.sulekha.com/srl-lab-mohali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFB900] transition-colors font-black text-[10px] text-white"
                    aria-label="Sulekha"
                  >
                    S
                  </a>
                  <a
                    title="IndiaMart"
                    href="https://www.indiamart.com/srl-diagnostics-mohali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#002f6c] transition-colors font-black text-[10px] text-white"
                    aria-label="IndiaMart"
                  >
                    IM
                  </a>
                  <a
                    title="Mediyaar"
                    href="https://mediyaar.com/lab/srl-lab-mohali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00c853] transition-colors font-black text-[10px] text-white"
                    aria-label="Mediyaar"
                  >
                    M
                  </a>
                  <div className="h-4 w-px bg-white/20 mx-1"></div>
                  <a
                    title="Verified on Google Business"
                    href="https://maps.app.goo.gl/tPN5MedC4LLAbe4P8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-bold text-google-grey hover:text-white transition-colors"
                    aria-label="Google Business"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4285F4]" /> GMB
                    Profile
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-google-grey">
                Our Services
              </h4>
              <ul className="space-y-4 text-sm text-google-grey">
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" />
                    <span>Pathology Lab</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" />
                    <span>Home Collection</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" />
                    <span>Wellness Packages</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" />
                    <span>Specialized Tests</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-google-grey">
                Quick Links
              </h4>
              <ul className="space-y-4 text-sm text-google-grey">
                <li>
                  <a
                    href="https://srllimited.com/patient-report"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" />
                    <span>Download Reports</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-google-grey">
                Support
              </h4>
              <ul className="space-y-4 text-sm text-google-grey">
                <li
                  onClick={handleCall}
                  className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-google-blue group-hover:scale-110 transition-transform" />
                  <span>091154 59115</span>
                </li>
                <li
                  onClick={handleWhatsApp}
                  className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer group"
                >
                  <Smartphone className="w-4 h-4 mt-0.5 text-agilus-green group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Chat</span>
                </li>
                <li
                  onClick={handleDirection}
                  className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 text-red-500 group-hover:scale-110 transition-transform" />
                  <span>Sector 69 Market, Mohali</span>
                </li>
                <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer">
                  <MessageSquare className="w-4 h-4 mt-0.5 text-google-blue" />
                  <span className="break-all">help@srllabmohali.in</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-google-grey">
                Certifications
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center border border-white/10 hover:border-google-blue/30 transition-colors">
                  <span className="text-lg font-bold text-white">NABL</span>
                  <span className="text-[10px] text-google-grey uppercase font-bold tracking-widest">
                    Accredited Lab
                  </span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center border border-white/10 hover:border-google-blue/30 transition-colors">
                  <span className="text-lg font-bold text-white">ISO</span>
                  <span className="text-[10px] text-google-grey uppercase font-bold tracking-widest">
                    9001 Certified
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-google-grey">
              © 2026 SRL Lab Mohali (Agilus Diagnostics). Premium Diagnostic
              Partner.
            </p>
            <div className="flex gap-8 text-[10px] font-bold text-google-grey uppercase tracking-widest">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-google-blue/10 rounded-full border border-google-blue/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-google-blue font-bold">
                LIVE STATUS: OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Premium High-Conversion Sidebar (Mobile) */}
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        className="fixed bottom-6 left-4 right-4 z-50 lg:hidden"
      >
        <div className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2.5rem] p-2 flex items-center gap-2 overflow-hidden border border-white/50 premium-shadow">
          <button
            onClick={handleCall}
            className="flex-1 bg-[#202124] text-white py-4 px-6 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" />
            <span className="font-extrabold text-[10px] uppercase tracking-widest">
              Call Now
            </span>
          </button>
          <button
            onClick={handleDirection}
            className="flex-1 bg-google-light-grey text-google-grey py-4 px-6 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Navigation className="w-4 h-4" />
            <span className="font-extrabold text-[10px] uppercase tracking-widest">
              Map
            </span>
          </button>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="flex-[2] bg-google-blue text-white py-4 px-6 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl shadow-google-blue/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <ClipboardCheck className="w-4 h-4" />
            <span className="font-black text-[11px] uppercase tracking-widest text-glow">
              Book Now
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const FaqItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const idSlug = useMemo(
    () =>
      question
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .slice(0, 30),
    [question],
  );

  return (
    <div className="border-b border-google-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${idSlug}`}
        id={`faq-btn-${idSlug}`}
        className="w-full py-4 flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue focus-visible:ring-offset-2 transition-all rounded-lg px-2 -mx-2"
      >
        <span className="text-sm font-medium text-[#202124] group-hover:text-google-blue transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-google-grey transition-transform duration-300 ${isOpen ? "rotate-180 text-google-blue" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${idSlug}`}
            role="region"
            aria-labelledby={`faq-btn-${idSlug}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 pt-1 text-sm text-google-grey leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function TestimonialHighlight({
  name,
  rating,
  quote,
  image,
}: {
  name: string;
  rating: number;
  quote: string;
  image: string;
}) {
  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] h-full flex flex-col items-center text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-google-blue/10 shadow-2xl relative z-10 mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-agilus-green/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-google-blue/20 rounded-full blur-xl animate-pulse delay-700" />
      </div>

      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? "fill-[#FBBC04] text-[#FBBC04]" : "text-gray-200"}`}
          />
        ))}
      </div>

      <p className="text-xl md:text-2xl font-medium text-[#202124] italic mb-8 max-w-3xl leading-relaxed">
        "{quote}"
      </p>

      <div className="mt-auto">
        <p className="text-lg font-black text-[#202124]">{name}</p>
        <p className="text-[11px] text-google-grey font-bold uppercase tracking-widest mt-1 italic">
          Verified Wellness Patient
        </p>
      </div>
    </div>
  );
}

function ReviewItem({
  name,
  rating,
  date,
  comment,
}: {
  name: string;
  rating: number;
  date: string;
  comment: string;
}) {
  return (
    <div className="bg-[#f8f9fa] p-5 rounded-2xl border border-google-border/50 hover:border-google-blue/30 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-google-blue/10 flex items-center justify-center text-google-blue font-bold text-lg shadow-sm">
            {name[0]}
          </div>
          <div>
            <p className="font-bold text-[#202124]">{name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rating
                        ? "fill-[#e7711b] text-[#e7711b]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-google-grey font-bold uppercase tracking-wider">
                {date}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white p-1.5 rounded-lg shadow-sm border border-google-border/30">
          <Quote className="w-4 h-4 text-google-blue/40" />
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[#444] mb-4">"{comment}"</p>
      <div className="flex items-center gap-4 pt-3 border-t border-google-border/30">
        <button className="text-[11px] font-bold text-google-blue uppercase tracking-tight flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          <ThumbsUp className="w-3 h-3" />
          Helpful?
        </button>
        <div className="w-1 h-1 rounded-full bg-google-border" />
        <button className="text-[11px] font-bold text-google-grey uppercase tracking-tight hover:text-[#202124] transition-colors">
          Report
        </button>
      </div>
    </div>
  );
}

function ExpandableTestRow({
  test,
  onBook,
}: {
  key?: React.Key | number | string;
  test: any;
  onBook: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = React.useRef<HTMLTableRowElement>(null);

  const toggleDetails = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      // Small delay to allow DOM to render the expanded section before scrolling
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  return (
    <>
      <tr
        onClick={toggleDetails}
        className={`border-b border-google-border/50 hover:bg-google-light-grey/30 transition-colors group cursor-pointer ${isOpen ? "bg-google-blue/[0.02]" : ""}`}
      >
        <td className="py-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-google-light-grey flex items-center justify-center shrink-0 group-hover:bg-google-blue/10 transition-colors">
              <ChevronDown
                className={`w-3 h-3 text-google-grey transition-transform duration-300 ${isOpen ? "rotate-180 text-google-blue" : "-rotate-90"}`}
              />
            </div>
            <div className="flex flex-col relative group/tooltip max-w-full">
              <RouterLink
                to={`/tests/${encodeURIComponent(test.name)}`}
                className="text-sm sm:text-base font-bold text-[#202124] group-hover:text-google-blue transition-colors cursor-pointer border-b border-dashed border-google-grey/40 pb-0.5 break-words line-clamp-2"
                title={`Sample Required: ${test.sample}\nPatient Prep: ${test.preparation}`}
                aria-label={`Test: ${test.name}. Sample required: ${test.sample}. Preparation: ${test.preparation}`}
              >
                {test.name}
              </RouterLink>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-[10px] bg-google-light-grey text-google-grey px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  {test.code}
                </span>
                <span className="text-[10px] text-google-grey/70 font-medium">
                  {test.sample} Required
                </span>
              </div>
              <div className="absolute top-full left-0 mt-2 min-w-[280px] bg-[#202124] text-white text-xs rounded-xl p-4 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none z-50 shadow-2xl transition-all translate-y-1 group-hover/tooltip:translate-y-0 duration-200">
                <div className="flex items-center gap-2 mb-1">
                  <FlaskConical className="w-3.5 h-3.5 text-google-blue" />
                  <p className="font-bold text-google-blue uppercase tracking-widest text-[9px]">
                    Sample Requirements
                  </p>
                </div>
                <p className="mb-3 text-white/90 font-medium leading-relaxed">
                  {test.sample}
                </p>

                <div className="flex items-center gap-2 mb-1">
                  <ClipboardCheck className="w-3.5 h-3.5 text-agilus-green" />
                  <p className="font-bold text-agilus-green uppercase tracking-widest text-[9px]">
                    Patient Preparation
                  </p>
                </div>
                <p className="text-white/90 font-medium leading-relaxed">
                  {test.preparation}
                </p>
              </div>
            </div>
          </div>
        </td>
        <td className="py-4 px-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-google-grey/90">
            <Clock className="w-3.5 h-3.5 text-google-blue shrink-0" />
            <span className="text-google-blue bg-google-blue/10 px-2.5 py-1 rounded-full font-black tracking-tight whitespace-nowrap">
              {test.tat}
            </span>
          </div>
        </td>
        <td className="py-4 text-right pr-2">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDetails();
              }}
              className="text-[10px] font-black text-google-grey hover:text-google-blue px-3 py-1.5 rounded-full border border-google-border hover:border-google-blue transition-all"
            >
              {isOpen ? "HIDE INFO" : "VIEW DETAILS"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBook();
              }}
              className="text-[10px] font-black bg-google-blue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              BOOK NOW
            </button>
          </div>
        </td>
      </tr>
      <AnimatePresence>
        {isOpen && (
          <motion.tr
            ref={detailsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-b border-google-border/50"
          >
            <td
              colSpan={3}
              className="py-6 px-12 text-xs text-google-grey bg-google-blue/[0.01]"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-google-blue mb-1">
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span className="font-black uppercase tracking-widest text-[10px]">
                      Testing Method
                    </span>
                  </div>
                  <p className="text-sm text-[#202124] font-medium leading-relaxed bg-white p-3 rounded-xl border border-google-border/40 shadow-sm">
                    {test.method}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-google-blue mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-black uppercase tracking-widest text-[10px]">
                      Turnaround Time
                    </span>
                  </div>
                  <p className="text-sm text-[#202124] font-medium leading-relaxed bg-white p-3 rounded-xl border border-google-border/40 shadow-sm">
                    {test.tat}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-google-blue mb-1">
                    <MicroscopeIcon className="w-3.5 h-3.5" />
                    <span className="font-black uppercase tracking-widest text-[10px]">
                      Sample Requirements
                    </span>
                  </div>
                  <p className="text-sm text-[#202124] font-medium leading-relaxed bg-white p-3 rounded-xl border border-google-border/40 shadow-sm">
                    {test.sample}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-google-blue mb-1">
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span className="font-black uppercase tracking-widest text-[10px]">
                      Patient Preparation
                    </span>
                  </div>
                  <p className="text-sm text-[#202124] font-medium leading-relaxed bg-white p-3 rounded-xl border border-google-border/40 shadow-sm">
                    {test.preparation}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 w-fit">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-[11px] text-orange-800 font-medium">
                  Note: Home collection is available for this test. Home
                  response time is typically within 60 minutes in Mohali Sector
                  69 area.
                </p>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

function DirectoryLink({
  name,
  icon,
  url,
}: {
  name: string;
  icon: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-google-border hover:border-google-blue hover:shadow-md transition-all group"
    >
      <div className="w-8 h-8 rounded-lg bg-google-light-grey flex items-center justify-center text-xs font-black text-google-grey group-hover:bg-google-blue/10 group-hover:text-google-blue">
        {icon}
      </div>
      <span className="text-[11px] font-bold text-google-grey group-hover:text-[#202124]">
        {name}
      </span>
    </a>
  );
}

function WellnessPackageVisual({
  title,
  sub,
  parameters,
  features,
  bgClass,
  textColorClass,
  badgeBg,
  badgeText,
  icon: IconComponent,
}: {
  title: string;
  sub: string;
  parameters: string;
  features: string[];
  bgClass: string;
  textColorClass: string;
  badgeBg: string;
  badgeText: string;
  icon: any;
}) {
  return (
    <div
      className={`w-full h-full p-5 flex flex-col justify-between relative overflow-hidden ${bgClass} select-none`}
    >
      {/* Dynamic medical background vectors */}
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/25 blur-md pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-white/15 blur-lg pointer-events-none" />

      {/* Top Banner Row */}
      <div className="flex items-center justify-between z-10">
        <span
          className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md border ${badgeBg} ${badgeText} shadow-sm`}
        >
          {parameters}
        </span>
        <div className="p-2 rounded-xl bg-white/65 backdrop-blur-md shadow-sm border border-white/40">
          <IconComponent className={`w-4 h-4 ${textColorClass}`} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="z-10 mt-1">
        <h4
          className={`text-base font-extrabold tracking-tight leading-tight ${textColorClass} mb-1`}
        >
          {title}
        </h4>
        <p
          className={`text-[10px] leading-snug font-semibold opacity-90 ${textColorClass} line-clamp-2 mb-2`}
        >
          {sub}
        </p>

        {/* Bullet Inclusions Pills */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {features.slice(0, 4).map((feature, i) => (
            <span
              key={i}
              className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${badgeBg} ${badgeText}`}
            >
              {feature}
            </span>
          ))}
          {features.length > 4 && (
            <span
              className={`text-[8px] font-black px-1.5 py-0.5 rounded-md border ${badgeBg} ${badgeText}`}
            >
              +{features.length - 4} More
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function UpdateCard({
  img,
  title,
  date,
  desc,
  alt = "SRL Lab Mohali Diagnostic Update",
  link = "",
  imgPosition = "object-center",
  className = "min-w-[280px] md:min-w-[320px]",
}: {
  img: string | React.ReactNode;
  title: string;
  date: string;
  desc: string;
  alt?: string;
  link?: string;
  imgPosition?: string;
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      aria-expanded={isExpanded}
      className={`${className} flex-shrink-0 border border-google-border rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white group cursor-pointer relative ${isExpanded ? "ring-2 ring-google-blue/40 border-google-blue/40" : ""}`}
      onClick={() => {
        if (link) {
          window.open(link, "_blank");
        } else {
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div className="absolute top-4 right-4 z-20">
        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-google-border/50 group-hover:bg-google-blue group-hover:text-white transition-all duration-500">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>

      <div className="h-48 overflow-hidden relative rounded-t-[1.95rem]">
        {typeof img === "string" ? (
          <img
            src={img}
            alt={alt}
            className={`w-full h-full object-cover ${imgPosition} group-hover:scale-105 transition-transform duration-700 rounded-t-[1.95rem]`}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full group-hover:scale-102 transition-transform duration-700 rounded-t-[1.95rem] overflow-hidden">
            {img}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
          <span className="bg-google-blue text-white text-[9px] font-black px-3 py-1.5 rounded-lg shadow-xl tracking-[0.2em] uppercase border border-white/20 select-none">
            NABL Quality
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] uppercase font-black text-google-blue tracking-[0.25rem] bg-google-blue/5 px-2.5 py-1 rounded-md border border-google-blue/10">
            {date}
          </p>
          <div className="w-2 h-2 rounded-full bg-google-blue animate-pulse shadow-[0_0_12px_rgba(66,133,244,0.8)]" />
        </div>
        <h3
          className={`font-black text-xl text-[#202124] group-hover:text-google-blue transition-colors mb-3 leading-[1.2] ${isExpanded ? "" : "line-clamp-2"}`}
        >
          {title}
        </h3>
        <p
          className={`text-sm text-google-grey leading-relaxed font-medium ${isExpanded ? "" : "line-clamp-3"}`}
        >
          {desc}
        </p>
        <button
          aria-label={
            isExpanded ? "Show less about " + title : "Read more about " + title
          }
          className="text-google-blue text-[11px] font-black uppercase tracking-[0.2em] mt-6 flex items-center gap-2 group/btn border-t border-google-border/40 pt-4 w-full"
        >
          {isExpanded ? "Hide Details" : "Clinical Details"}
          <ArrowRight
            className={`w-4 h-4 transition-transform ${isExpanded ? "-rotate-90" : "group-hover/btn:translate-x-1"}`}
          />
        </button>
      </div>
    </div>
  );
}
