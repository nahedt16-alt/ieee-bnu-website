/* ==========================================================================
   SITE CONFIG — the one file for global settings.
   Edit the values below. Everything else on the site reads from here.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) JOIN FORM LINK  (Google Form / any registration link)
   Replace the text between the quotes with your real link, e.g.
   "https://forms.gle/xxxxxxxx". Every "Join" button on the site uses this.
   -------------------------------------------------------------------------- */
export const JOIN_FORM_URL = "https://forms.gle/mSkPCJNxR6QVSmJx7";

/** True once you have replaced the placeholder above with a real http(s) link. */
export const isJoinFormConfigured = /^https?:\/\//i.test(JOIN_FORM_URL);

/* --------------------------------------------------------------------------
   2) BRANDING
   -------------------------------------------------------------------------- */
export const siteConfig = {
  name: "IEEE BNU Student Branch",
  shortName: "IEEE BNU",
  tagline: "Connecting Minds. Creating the Future.",

  // Path to your logo, e.g. "/assets/images/logo/ieee-bnu-logo.png"
  // (put the file in public/assets/images/logo/). Leave "" to show the placeholder.
  logo: "/assets/images/logo/log.jpeg",

  // Contact email, e.g. "ieee.bnu@example.com". Leave "" to show a placeholder.
  contactEmail: "www.ieeebnu.com",

  // University info shown in the footer. Replace the [PLACEHOLDERS].
  university: {
    name: "Benha National University",
    faculty: "Engineering",
    location: "Obour, Egypt",
  },

  /* ------------------------------------------------------------------------
     3) SOCIAL MEDIA LINKS (footer)
     Paste the full URL for each one. Leave "" to keep it as a dimmed
     placeholder. You can delete or add items. Supported icon ids:
     "facebook", "instagram", "linkedin", "github", "website".
     ------------------------------------------------------------------------ */
  socialLinks: [
    { id: "facebook", label: "Facebook", url: "https://www.facebook.com/people/IEEE-BNU-Student-Branch/61590744703356/" },
    { id: "instagram", label: "Instagram", url: "" },
    { id: "linkedin", label: "LinkedIn", url: "" },
    { id: "github", label: "GitHub", url: "" },
  ],
};

/* --------------------------------------------------------------------------
   4) NAVIGATION
   `id` must match the id of a section on the page.
   -------------------------------------------------------------------------- */
export const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Technical Team", id: "technical" },
  { label: "Workshops", id: "workshops" },
  { label: "High Board", id: "board" },
  { label: "Join Us", id: "join", highlight: true },
];
