// Single source of truth for the site URL and public contact details.

// Vercel serves the www host (the bare domain and the old *.vercel.app
// address redirect to it), so canonical URLs must use it too.
export const SITE_URL = "https://www.rajdeepkotoky.com";

// Links must use the international number (91…): wa.me and tel: links
// without the country code resolve to a different country.
const PHONE = "8638752315";
const EMAIL = "kotoky10@gmail.com";

export const CONTACT = {
  email: EMAIL,
  phone: PHONE,
  phoneE164: `+91${PHONE}`,
  phoneDisplay: `+91 ${PHONE}`,
  mailtoHref: `mailto:${EMAIL}`,
  telHref: `tel:+91${PHONE}`,
  whatsappHref: `https://wa.me/91${PHONE}`,
  github: "https://github.com/Rajdeep1234yyuhh",
  githubUser: "Rajdeep1234yyuhh",
  linkedin: "https://www.linkedin.com/in/rajdeep-kotoky-2273561a0/",
  linkedinUser: "rajdeep-kotoky-2273561a0",
} as const;
