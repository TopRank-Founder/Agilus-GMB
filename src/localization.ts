/**
 * Unified Localization and Content Configuration File
 * Extracted and centralizing all user-facing text, labels, messages, and templates
 * to support a clear, humanized, professional, and standardized tone.
 */

export const formatTemplate = (
  template: string,
  variables: Record<string, string | number>,
): string => {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return String(variables[key] !== undefined ? variables[key] : `{${key}}`);
  });
};

export const LOCALIZATION = {
  // App Branding & Meta
  BRAND: {
    NAME: "Agilus Diagnostics",
    SUBBRAND: "Formerly SRL Diagnostics",
    LOCATION: "Sector 69, Mohali",
    FULL_TITLE:
      "Agilus Diagnostics (Formerly SRL Diagnostics) - Sector 69, Mohali",
    NABL_BADGE: "NABL Accredited Lab",
    HOURS_SUMMARY: "Open 24 Hours • 7 Days a Week",
    YEARS_OF_TRUST: "Serving Mohali with heartfelt care since 1997",
    ACCURACY_GUARANTEE:
      "Superior clinical quality backed by NABL certification.",
    METRICS_RATING: "4.9 / 5.0 Rating based on verified Google Maps reviews",
  },

  // Contact & Location Details
  CONTACT: {
    PHONE_NUMBER: "+919115459115",
    EMAIL: "info@srllabmohali.in",
    ADDRESS:
      "Booth No. 12, GMADA Market, Near Gurukul World School, Sector 69, Mohali, Punjab 160069",
    DIRECTIONS_URL: "https://maps.app.goo.gl/cjZ9Zjs4n3BWewWQ9",
    SHARE_URL: "https://maps.app.goo.gl/49GEMYGUA2JW2aGf7",
    REVIEW_URL: "https://g.page/r/Ce303a1WSgIaEBM/review",
    WEBSITE_URL: "https://www.srllabmohali.in",
  },

  // Navigation Items
  NAV: {
    OVERVIEW: "Overview",
    SERVICES: "Services",
    REVIEWS: "Reviews",
    ABOUT: "About",
  },

  // Templates & Actions
  ACTIONS: {
    BOOK_NOW: "Book Now",
    CALL_NOW: "Call Now",
    WHATSAPP: "WhatsApp",
    MAP: "Map",
    VIRTUAL_TOUR: "Watch Virtual Tour",
    EXPLORE_MENU: "View Test Menu",
    WRITE_REVIEW: "Write a Review",
    DOWNLOAD_BROCHURE: "Download Health Packages Brochure",
    SEE_MORE_REVIEWS: "See All Experiences on Google",
    BACK_HOME: "Back to Home",
    BACK: "Back",
    SUBMITPING_BOOKING: "Submitting...",
    CONFIRM_BOOKING: "Confirm Booking",
    VIEW_DETAILS: "View Details",
    HIDE_DETAILS: "Hide Info",
    CLINICAL_DETAILS: "Clinical Details",
  },

  // Form Field Placeholders
  FORM_PLACEHOLDERS: {
    NAME: "Your Full Name (e.g. John Doe)",
    PHONE: "10-Digit Mobile Number",
    EMAIL: "Email Address (Optional)",
    DATE: "Preferred Date",
    TIME_SLOT: "Preferred Time Slot",
  },

  // Form Validation & Actionable Error Messages (Free of technical jargon, positive framing)
  ERRORS: {
    NAME_REQUIRED:
      "Please tell us your name so we can personalize your experience.",
    NAME_SHORT: "Please enter a name with at least 3 characters.",
    PHONE_REQUIRED:
      "Please share your mobile number so our team can contact you to confirm.",
    PHONE_INVALID: "Please enter a valid, 10-digit mobile number.",
    EMAIL_INVALID: "Please double-check and enter a valid email address.",
    DATE_REQUIRED:
      "Please choose a preferred date for your test or collection.",
    DATE_PAST:
      "To schedule an appointment, please choose today's date or any day in the future.",
    TIME_REQUIRED: "Please select a convenient time slot for your appointment.",
    GENERIC_RETRY:
      "Something went wrong. Please check your internet connection or call our support line directly.",
  },

  // Form Submission Success
  SUCCESS: {
    BOOKING_TITLE: "Appointment Initiated Successfully!",
    BOOKING_DESC:
      "We have opened WhatsApp to confirm your selection directly with our local Mohali team. We are looking forward to serving you!",
  },

  // FAQ Page / Section
  FAQ: {
    TITLE: "Frequently Asked Questions",
    SUBTITLE:
      "Get quick answers about our testing protocol, NABL certification, and home collection guidelines.",
  },

  // Message template for WhatsApp booking
  WHATSAPP_BOOKING_TEMPLATE:
    "Hi, I would like to book a blood test appointment.\n\nName: {name}\nPhone: {phone}\nEmail: {email}\nDate: {date}\nTime: {time}",
  WHATSAPP_GENERAL_TEMPLATE:
    "Hi, I am in Mohali and want to book a diagnostic test or health checkup.",
};
