/**
 * Global Configuration for Indus Robotics
 * Centralizes company metadata, contact information, and WhatsApp messaging.
 */

export const companyConfig = {
  brandName: "Indus Robotics",
  fullName: "Indus Robotics",
  tagline: "Precision · Motion · Control · Reliability · Automation · Intelligence",

  // WhatsApp Configuration
  whatsAppNumber: "+919361249474",
  displayWhatsApp: "+91 93612 49474",

  // Contact Channels
  email: "engineering@indus-robotics.com",
  salesEmail: "rfq@indus-robotics.com",
  phone: "+91 93612 49474",
  headquarters: "Industrial Automation Park, Tech Corridor",
  supportHours: "Mon – Fri: 09:00 – 18:00 (IST)",

  // Helper to generate contextual WhatsApp URL with pre-filled enquiry message
  getWhatsAppUrl: (context?: {
    type?: "general" | "product" | "application" | "solution" | "custom";
    name?: string;
  }) => {
    let message =
      "Hello Indus Robotics team, I would like to know more about your industrial robotics solutions.";

    if (context?.type === "product" && context.name) {
      message = `Hello Indus Robotics team, I am interested in ${context.name}. I would like more technical information.`;
    } else if (context?.type === "application" && context.name) {
      message = `Hello Indus Robotics team, I am exploring robotics solutions for ${context.name}. I would like to discuss my requirement.`;
    } else if (context?.type === "solution" && context.name) {
      message = `Hello Indus Robotics team, I would like to discuss implementing ${context.name} for our facility.`;
    } else if (context?.type === "custom" && context.name) {
      message = context.name;
    }

    // Clean phone number for WhatsApp link
    const cleanNumber = companyConfig.whatsAppNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  },
};
