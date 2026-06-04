import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { testMenu } from "./src/constants";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Serve simple API healthcheck first
  app.get("/api/health", (req, res) => {
    res.json({ status: "alive" });
  });

  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    // Integrate Vite in development mode
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Custom router to handle server-side injections before browser serving
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Serve static assets from build output folder, disabling default index.html serving to route internally
    app.use(express.static(distPath, { index: false }));
  }

  // Intercept all requests for proper dynamic index.html injections
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;
      if (process.env.NODE_ENV !== "production") {
        // Read index.html from workspace root and transform using Vite developer tools
        template = await fs.readFile(path.resolve("./index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
      } else {
        // Read index.html from compiled production assets
        template = await fs.readFile(
          path.resolve("./dist/index.html"),
          "utf-8"
        );
      }

      // Initialize default SEO values
      let title = "SRL Diagnostics Mohali (Agilus) - Diagnostic Lab Sector 69 | Home Collection";
      let metaDesc =
        "Agilus Diagnostics (Formerly SRL Lab) Mohali Sector 69. NABL Accredited pathology laboratory providing free home sample collection, wellness health packages, and accurate clinical tests in Mohali, Panchkula and Chandigarh.";
      let canonical = `https://www.srllabmohali.in${req.path}`;
      let rootHtml = "";
      let customJsonLd = "";

      // Route-specific dynamic SEO parameters & semantic HTML injection
      if (req.path === "/" || req.path === "") {
        // Homepage
        title = "SRL Diagnostics Mohali (Agilus) - Diagnostic Lab Sector 69 | Home Collection";
        metaDesc =
          "Agilus Diagnostics (Formerly SRL Lab) Mohali Sector 69. NABL Accredited pathology laboratory providing free home sample collection, health packages, and accurate clinical tests in Mohali.";
        rootHtml = `
<div class="seo-ssr-container font-sans text-slate-800 p-8 max-w-4xl mx-auto" style="font-family: system-ui, -apple-system, sans-serif; max-width: 56rem; margin: 0 auto; padding: 2rem; color: #1e293b;">
  <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: #1e3a8a; margin: 0; line-height: 1.25;">Agilus Diagnostics Mohali Sector 69</h1>
    <p style="font-size: 1.125rem; color: #475569; font-weight: 600; margin-top: 0.5rem; margin-bottom: 0;">Formerly SRL Diagnostics - NABL Accredited Premium Pathology Laboratory</p>
    <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.875rem; color: #64748b; font-weight: 600;">
      <span>📍 Booth 12, GMADA Market, near Gurukul World School, Sector 69, Mohali</span>
      <span>📞 +91 91154 59115</span>
    </div>
  </header>
  
  <section style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e3a8a; margin-top: 0; margin-bottom: 1rem;">Why Choose Agilus Diagnostics (SRL) in Mohali?</h2>
    <p style="font-size: 1rem; line-height: 1.625; color: #334155;">
      Serving Mohali, Panchkula, and Chandigarh with clinical precision since 1997. We are a premier diagnostics and pathology testing center equipped with automated biochemistry, immunoassay, and hematology analyzers. We adhere to the highest international quality checklists.
    </p>
    <ul style="padding-left: 1.25rem; margin-top: 1rem; margin-bottom: 1rem;">
      <li style="margin-bottom: 0.5rem;"><strong>NABL Accredited Facility:</strong> National standard precision and reliable sample validation.</li>
      <li style="margin-bottom: 0.5rem;"><strong>Complimentary 24/7 Home Visit:</strong> Professional, hygienic blood collection at your doorstep.</li>
      <li style="margin-bottom: 0.5rem;"><strong>Fast Turnaround Time:</strong> Secure digital pathology reports delivered inside 6 to 12 hours.</li>
      <li style="margin-bottom: 0.5rem;"><strong>Comprehensive Test Menu:</strong> Over 3,000 diagnostic profiles catering to all clinical specialties.</li>
    </ul>
  </section>

  <section style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e3a8a; margin-top: 0; margin-bottom: 1rem;">Featured Doctor-Approved Health Packages & Panels</h2>
    <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
      <div style="border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.25rem; background-color: #f8fafc;">
        <h3 style="font-size: 1.125rem; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 0.5rem;">Agilus Best Full Body Checkup</h3>
        <p style="font-size: 0.875rem; color: #475569; margin: 0;">92 Core Clinical Parameters covering Kidney, Liver, Blood, Vitamin Levels and Cardiac risks.</p>
        <span style="display: inline-block; margin-top: 0.75rem; font-weight: 700; color: #2563eb;">Price: ₹3099</span>
      </div>
      <div style="border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.25rem; background-color: #f8fafc;">
        <h3 style="font-size: 1.125rem; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 0.5rem;">Thyroid Profile (T3, T4, TSH)</h3>
        <p style="font-size: 0.875rem; color: #475569; margin: 0;">Hormonal screen to evaluate hyperthyroidism and hypothyroidism indices.</p>
        <span style="display: inline-block; margin-top: 0.75rem; font-weight: 700; color: #2563eb;">Price: ₹450</span>
      </div>
      <div style="border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.25rem; background-color: #f8fafc;">
        <h3 style="font-size: 1.125rem; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 0.5rem;">Diabetes Panel & HbA1c</h3>
        <p style="font-size: 0.875rem; color: #475569; margin: 0;">Ideal for daily blood glucose and long term 3-month average sugar monitoring.</p>
        <span style="display: inline-block; margin-top: 0.75rem; font-weight: 700; color: #2563eb;">Price: ₹599</span>
      </div>
    </div>
  </section>

  <section style="margin-bottom: 2rem; border-top: 1px solid #e2e8f0; padding-top: 1.5rem;">
    <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e3a8a; margin-top: 0; margin-bottom: 1rem;">Contact & Appointment Booking</h2>
    <p style="font-size: 1rem; line-height: 1.625; color: #334155; margin: 0;">
      Our laboratory is open 24 hours a day, 7 days a week. For bookings, questions, or to schedule a free home visit in Mohali, call us at <a style="color: #2563eb; text-decoration: underline;" href="tel:+919115459115">+91 91154 59115</a> or visit us at GMADA Market Sector 69 near Gurukul World School.
    </p>
  </section>
</div>
        `;
      } else if (req.path === "/about") {
        // About Page
        title = "About Us - SRL Agilus Diagnostics Mohali Sector 69 | Clinical Legacy";
        metaDesc =
          "Learn about Agilus Diagnostics (formerly SRL Diagnostics) Mohali's legacy of clinical accuracy, NABL accreditation, expert staff, and advanced testing diagnostics since 1997.";
        rootHtml = `
<div class="seo-ssr-container font-sans text-slate-800 p-8 max-w-4xl mx-auto" style="font-family: system-ui, -apple-system, sans-serif; max-width: 56rem; margin: 0 auto; padding: 2rem; color: #1e293b;">
  <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: #1e3a8a; margin: 0; line-height: 1.25;">About Us - Agilus Diagnostics Mohali</h1>
    <p style="font-size: 1.125rem; color: #475569; font-weight: 600; margin-top: 0.5rem; margin-bottom: 0;">Clinical Trust & Lab Excellence Since 1997</p>
  </header>
  
  <p style="font-size: 1.125rem; line-height: 1.75; color: #334155; font-weight: 500; margin-bottom: 1.5rem;">
    Agilus Diagnostics (formerly SRL Diagnostics) Sector 69, Mohali is proud to be part of India’s premier laboratory and diagnostics network. We bring high-end international diagnostic procedures to the Mohali community, emphasizing perfect reporting precision.
  </p>

  <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e3a8a; margin-top: 2rem; margin-bottom: 1rem;">NABL Accredited Lab Facility</h2>
  <p style="font-size: 1rem; line-height: 1.625; color: #334155; margin-bottom: 1.5rem;">
    Our Mohali diagnostic center complies fully with National Accreditation Board for Testing and Calibration Laboratories standards. Leading pathologist supervision, advanced automation, continuous calibration, and rigid internal control standards ensure complete validity.
  </p>

  <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e3a8a; margin-top: 2rem; margin-bottom: 1rem;">Advanced Automated Clinical Infrastructure</h2>
  <p style="font-size: 1rem; line-height: 1.625; color: #334155; margin-bottom: 0.5rem;">
    Our testing infrastructure features fully integrated diagnostic technology, including:
  </p>
  <ul style="padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 1.5rem;">
    <li style="margin-bottom: 0.5rem;">Chemiluminescence Immunoassay (CLIA) systems for hormonal screening.</li>
    <li style="margin-bottom: 0.5rem;">Automated biochemistry analyzers for accurate lipid, live, and renal tests.</li>
    <li style="margin-bottom: 0.5rem;">High-tech computerized hematology panels.</li>
  </ul>
</div>
        `;
      } else if (req.path === "/services") {
        // Services Page
        title = "Pathology Tests & Diagnostic Services in Mohali - SRL Agilus Lab";
        metaDesc =
          "Explore our comprehensive pathology services, molecular testing, biochemistry panels, health checkup packages, and free home blood sample collection in Mohali and Tricity.";
        rootHtml = `
<div class="seo-ssr-container font-sans text-slate-800 p-8 max-w-4xl mx-auto" style="font-family: system-ui, -apple-system, sans-serif; max-width: 56rem; margin: 0 auto; padding: 2rem; color: #1e293b;">
  <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: #1e3a8a; margin: 0; line-height: 1.25;">Our Diagnostic Pathology Services</h1>
    <p style="font-size: 1.125rem; color: #475569; font-weight: 600; margin-top: 0.5rem; margin-bottom: 0;">Accredited Laboratory Testing and Complimentary Home Visits</p>
  </header>

  <p style="font-size: 1rem; line-height: 1.625; color: #334155; margin-bottom: 2rem;">
    Agilus Diagnostics Mohali offers over 3,000 standard and specialized clinical tests including biochemistry, hematology, molecular assays, and microbiology. All handled by accredited professionals.
  </p>

  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 1.5rem;">
      <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e3a8a; margin: 0 0 0.5rem 0;">1. Free Blood Test Home Sample Collection</h2>
      <p style="font-size: 0.95rem; line-height: 1.5; color: #475569; margin: 0;">Completely free, hygienic blood collection at your home or office in Mohali by certified phlebotomists following strict sterile rules.</p>
    </div>

    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 1.5rem;">
      <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e3a8a; margin: 0 0 0.5rem 0;">2. COVID-19 RT-PCR Molecular Testing</h2>
      <p style="font-size: 0.95rem; line-height: 1.5; color: #475569; margin: 0;">Accredited laboratory diagnostic molecular processing with digital reporting inside 12 hours for traveler or clinical purposes.</p>
    </div>

    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 1.5rem;">
      <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e3a8a; margin: 0 0 0.5rem 0;">3. Preventive Full Body Wellness Packages</h2>
      <p style="font-size: 0.95rem; line-height: 1.5; color: #475569; margin: 0;">Multi-parameter diagnostics panels capturing Kidney, Liver, Thyroid, Heart, Blood Sugar, and crucial Vitamin standards.</p>
    </div>

    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 1.5rem;">
      <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e3a8a; margin: 0 0 0.5rem 0;">4. Specialized Immunology & Biochemistry</h2>
      <p style="font-size: 0.95rem; line-height: 1.5; color: #475569; margin: 0;">Chemiluminescence testing for hormonal assessment, tumor markers, cardiac biomarkers, and mineral indices.</p>
    </div>
  </div>
</div>
        `;
      } else if (req.path === "/faq") {
        // FAQ Page
        title = "Pathology Lab FAQs & Help - Agilus Diagnostics Mohali";
        metaDesc =
          "Find answers to frequently asked questions about blood test preps, fasting, digital reports delivery via WhatsApp, NABL certifications, and free home collections around Mohali.";
        rootHtml = `
<div class="seo-ssr-container font-sans text-slate-800 p-8 max-w-4xl mx-auto" style="font-family: system-ui, -apple-system, sans-serif; max-width: 56rem; margin: 0 auto; padding: 2rem; color: #1e293b;">
  <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: #1e3a8a; margin: 0; line-height: 1.25;">Frequently Asked Questions (FAQ)</h1>
    <p style="font-size: 1.125rem; color: #475569; font-weight: 600; margin-top: 0.5rem; margin-bottom: 0;">Standard patient guidelines, fasting, and test booking assistance</p>
  </header>

  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <h2 style="font-size: 1.125rem; font-weight: 800; color: #1e3a8a; margin-top: 0; margin-bottom: 0.5rem;">Is home sample collection free in Mohali?</h2>
      <p style="font-size: 1rem; line-height: 1.5; color: #334155; margin: 0;">Yes, Agilus Diagnostics offers complimentary home sample collection for residents in Sector 69, 70, 71, and all major phases of Mohali. Our trained phlebotomists follow strict hygiene protocols, and your samples are processed in our NABL-accredited facility to ensure accurate results.</p>
    </div>

    <div>
      <h2 style="font-size: 1.125rem; font-weight: 800; color: #1e3a8a; margin-top: 0; margin-bottom: 0.5rem;">How soon can I get my lab reports?</h2>
      <p style="font-size: 1rem; line-height: 1.5; color: #334155; margin: 0;">For routine tests like CBC, Lipid Profile, or Diabetes Screening, reports are typically delivered within 6-12 hours. Advanced molecular tests may take 24-48 hours. We deliver reports via WhatsApp, Email, and our secure online portal.</p>
    </div>

    <div>
      <h2 style="font-size: 1.125rem; font-weight: 800; color: #1e3a8a; margin-top: 0; margin-bottom: 0.5rem;">Are you an NABL accredited lab?</h2>
      <p style="font-size: 1rem; line-height: 1.5; color: #334155; margin: 0;">Yes, our Mohali facility is NABL accredited. This means our laboratory meets high national and international standards for competence, impartiality, and consistent operation in clinical testing.</p>
    </div>

    <div>
      <h2 style="font-size: 1.125rem; font-weight: 800; color: #1e3a8a; margin-top: 0; margin-bottom: 0.5rem;">Where is the lab located in Mohali?</h2>
      <p style="font-size: 1rem; line-height: 1.5; color: #334155; margin: 0;">We are located at Booth No. 12, GMADA Market, Near Gurukul World School, Sector 69, Mohali, Punjab 160069.</p>
    </div>
  </div>
</div>
        `;
      } else if (req.path.startsWith("/tests/")) {
        // Dynamic Test Page SEO Rendering!!
        const testParam = req.path.split("/tests/")[1];
        const testNameDecoded = decodeURIComponent(testParam || "");

        // Find the matching test in the main menu
        const test = testMenu.find(
          (t) =>
            t.code === testParam ||
            t.name.toLowerCase() === testNameDecoded.toLowerCase() ||
            t.name.toLowerCase().includes(testNameDecoded.toLowerCase())
        );

        if (test) {
          title = `${test.name} - Price, Preparation & Reports in Mohali`;
          metaDesc = `Book ${test.name} test at Agilus Diagnostics Mohali Sector 69. Cost: ₹${test.mrp}, Sample: ${test.sample}, Preparation: ${test.preparation}. Accurate NABL certified home collection.`;

          // Generate schema.org Structured Data
          const schemaData = {
            "@context": "https://schema.org",
            "@type": "MedicalTest",
            name: test.name,
            description: `Diagnostic test ${test.name} at Agilus Diagnostics (formerly SRL Lab) Mohali Sector 69. Cost: ₹${test.mrp}, Sample: ${test.sample}, Preparation: ${test.preparation}.`,
            provider: {
              "@type": "MedicalClinic",
              name: "Agilus Diagnostics Mohali",
              url: "https://reports.agilus.in/secure/login.aspx",
              telephone: "+919115459115",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Booth No. 12, Gmada Market, near Gurukul World School, Sector 69",
                addressLocality: "Sahibzada Ajit Singh Nagar",
                addressRegion: "Punjab",
                postalCode: "160069",
                addressCountry: "IN",
              },
            },
          };

          customJsonLd = `\n<script type="application/ld+json" id="dynamic-medical-test-schema">${JSON.stringify(
            schemaData
          )}</script>`;

          rootHtml = `
<div class="seo-ssr-container font-sans text-slate-800 p-8 max-w-4xl mx-auto border rounded-3xl" style="font-family: system-ui, -apple-system, sans-serif; max-width: 56rem; margin: 2rem auto; padding: 2.5rem; border: 1px solid #e2e8f0; border-radius: 1.5rem; color: #1e293b;">
  <span style="background-color: #dbeafe; color: #1e40af; font-size: 0.75rem; font-weight: 800; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; margin-bottom: 1rem;">NABL Accredited Diagnostics Scope</span>
  <h1 style="font-size: 2.25rem; font-weight: 800; color: #1e3a8a; margin-top: 0; margin-bottom: 0.5rem; line-height: 1.2;">${test.name}</h1>
  <p style="font-size: 1rem; color: #475569; font-weight: 600; margin-top: 0; margin-bottom: 2rem;">Diagnostic Test Details, Prices, and Appointment Booking in Sector 69, Mohali.</p>
  
  <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e3a8a; margin-top: 0; margin-bottom: 1rem; border-bottom: 2px solid #3b82f6; padding-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Clinical Test Parameters & Logistics</h2>
  <table style="width: 100%; text-align: left; border-collapse: collapse; margin-bottom: 2rem;">
    <tbody>
      <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
        <th style="padding: 0.75rem; color: #475569; font-weight: 700; width: 40%;">Standard Price (MRP)</th>
        <td style="padding: 0.75rem; color: #0f172a; font-weight: 800; font-size: 1.125rem;">₹${test.mrp}</td>
      </tr>
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <th style="padding: 0.75rem; color: #475569; font-weight: 700;">Analyzed Clinical Method</th>
        <td style="padding: 0.75rem; color: #334155;">${test.method}</td>
      </tr>
      <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
        <th style="padding: 0.75rem; color: #475569; font-weight: 700;">Report Turnaround Time</th>
        <td style="padding: 0.75rem; color: #334155; font-weight: 600;">${test.tat}</td>
      </tr>
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <th style="padding: 0.75rem; color: #475569; font-weight: 700;">Sample Material Type</th>
        <td style="padding: 0.75rem; color: #334155;">${test.sample}</td>
      </tr>
      <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
        <th style="padding: 0.75rem; color: #475569; font-weight: 700;">Patient Preparation Guidelines</th>
        <td style="padding: 0.75rem; color: #334155; font-weight: 600;">${test.preparation}</td>
      </tr>
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <th style="padding: 0.75rem; color: #475569; font-weight: 700;">Sample Collection Address</th>
        <td style="padding: 0.75rem; color: #334155;">Booth No. 12, Gmada Market, near Gurukul World School, Sector 69, Mohali, Punjab 160069</td>
      </tr>
    </tbody>
  </table>

  <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e3a8a; margin-top: 2rem; margin-bottom: 1rem;">Why book ${test.name} with Agilus (formerly SRL) Mohali?</h2>
  <ul style="padding-left: 1.25rem; font-size: 1rem; color: #334155; line-height: 1.6; margin-bottom: 2rem;">
    <li style="margin-bottom: 0.5rem;">Strict quality standards guaranteeing perfect clinical report accuracy.</li>
    <li style="margin-bottom: 0.5rem;">Complimentary and professional home collection visit by certified phlebotomists.</li>
    <li style="margin-bottom: 0.5rem;">Secure reports delivery directly over WhatsApp and Email inside 12-24 hours.</li>
  </ul>

  <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e3a8a; margin-top: 2rem; margin-bottom: 1rem;">Process for Home Blood Sample Booking</h2>
  <p style="font-size: 1rem; line-height: 1.625; color: #334155; margin: 0 0 1.5rem 0;">
    You can easily schedule a home visit by calling us at <a style="color: #2563eb; font-weight:700; text-decoration:underline;" href="tel:+919115459115">+91 91154 59115</a> or sending a booking request over WhatsApp. Our team will coordinate the preferred date and time slot instantly.
  </p>
</div>
          `;
        }
      }

      // Perform header string replacements
      // 1. Title replacement
      template = template.replace(/<title>[^]*<\/title>/, `<title>${title}</title>`);

      // 2. Meta description replacement
      template = template.replace(
        /<meta name="description" content="[^"]*"[^/]*\/>/,
        `<meta name="description" content="${metaDesc}" />`
      );

      // 3. OpenGraph tags replacement
      template = template.replace(
        /<meta property="og:title" content="[^"]*"[^/]*\/>/,
        `<meta property="og:title" content="${title}" />`
      );
      template = template.replace(
        /<meta property="og:description" content="[^"]*"[^/]*\/>/,
        `<meta property="og:description" content="${metaDesc}" />`
      );
      template = template.replace(
        /<meta property="og:url" content="[^"]*"[^/]*\/>/,
        `<meta property="og:url" content="${canonical}" />`
      );

      // 4. Canonical replacement
      template = template.replace(
        /<link rel="canonical" href="[^"]*"[^/]*\/>/,
        `<link rel="canonical" href="${canonical}" />`
      );

      // 5. Inject client schema.org json-ld tags inside the head element
      if (customJsonLd) {
        template = template.replace("</head>", `${customJsonLd}\n</head>`);
      }

      // 6. Inject XHTML pre-rendered semantic content into root element
      template = template.replace(
        /<div id="root">\s*[^]*?\s*<\/div>/,
        `<div id="root">${rootHtml}</div>`
      );

      // Return the completed XHTML shell
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e: any) {
      if (process.env.NODE_ENV !== "production" && vite) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Agilus server] Listening on HTTP://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server bootstrap error:", err);
});
