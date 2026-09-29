/**
 * Global Configuration for INDUS Industrial Robotics
 * Centralizes company metadata, contact information, and WhatsApp messaging.
 */

export const companyConfig = {
  brandName: "INDUS",
  fullName: "INDUS Industrial Robotics",
  tagline: "Precision · Motion · Control · Reliability · Automation · Intelligence",

  // WhatsApp Configuration (Section 28)
  // Set to official WhatsApp business number when available.
  whatsAppNumber: "+1234567890", // [Add WhatsApp number]
  displayWhatsApp: "+1 (234) 567-890", // [Add WhatsApp number]

  // Contact Channels
  email: "engineering@indus-robotics.com", // [Add email address]
  salesEmail: "rfq@indus-robotics.com",
  phone: "+1 (800) 555-0199", // [Add phone number]
  headquarters: "Industrial Automation Park, Tech Corridor", // [Add physical address]
  supportHours: "Mon – Fri: 08:00 – 18:00 (EST)",

  // Helper to generate contextual WhatsApp URL with pre-filled enquiry message
  getWhatsAppUrl: (context?: {
    type?: "general" | "product" | "application" | "solution" | "custom";
    name?: string;
  }) => {
    let message =
      "Hello INDUS team, I would like to know more about your industrial robotics solutions.";

    if (context?.type === "product" && context.name) {
      message = `Hello INDUS team, I am interested in ${context.name}. I would like more technical information.`;
    } else if (context?.type === "application" && context.name) {
      message = `Hello INDUS team, I am exploring robotics solutions for ${context.name}. I would like to discuss my requirement.`;
    } else if (context?.type === "solution" && context.name) {
      message = `Hello INDUS team, I would like to discuss implementing ${context.name} for our facility.`;
    } else if (context?.type === "custom" && context.name) {
      message = context.name;
    }

    // Clean phone number for WhatsApp link
    const cleanNumber = companyConfig.whatsAppNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  },
};
