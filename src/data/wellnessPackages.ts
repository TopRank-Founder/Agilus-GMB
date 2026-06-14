import { HeartPulse, Activity, FlaskConical, Star } from "lucide-react";

export interface TestGroup {
  name: string;
  details: string;
}

export interface WellnessPackage {
  id: string;
  title: string;
  priceText: string;
  parameters: string;
  sub: string;
  desc: string;
  features: string[];
  link: string;
  bgClass: string;
  textColorClass: string;
  badgeBg: string;
  badgeText: string;
  icon: typeof HeartPulse;
  testGroups: TestGroup[];
  menSpecial?: string;
  womenSpecial?: string;
}

export const LAB_WELLNESS_PACKAGES: WellnessPackage[] = [
  {
    id: "vital-pro",
    title: "Complete Care Vital Pro",
    priceText: "2599",
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
    priceText: "3099",
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
    priceText: "2099",
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
    title: "Complete Care Active Pro",
    priceText: "4199",
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
    title: "Complete Care Premium Packages",
    priceText: "6699",
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
    priceText: "5999",
    parameters: "83 Parameters",
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
    priceText: "3499",
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
