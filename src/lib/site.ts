export const SITE_URL = "https://aakash074.netlify.app";

export const LINKS = {
  email: "aakashkumaar074@gmail.com",
  mailto: "mailto:aakashkumaar074@gmail.com",
  resume: "/resume.pdf",
  calendly: "https://calendly.com/aakash074/30min",
  linkedin: "https://www.linkedin.com/in/aakash074/",
  github: "https://github.com/aakash074",
  telegram: "https://t.me/aakash074",
  x: "https://x.com/Kumaaraakash074",
} as const;

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "clients", label: "Clients" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Result line for the Photon Legal eval story (hero proof row and case study).
 * Kept as one constant so a version with numbers can be swapped in later,
 * once public use of the eval figures is approved.
 */
export const PHOTON_EVAL_LINE =
  "The eval said a 1M-family subset beat the full corpus. That looked wrong, so I checked the metric. Examiners often cite a sibling publication, so only about 38% of cited documents matched by exact number. Recall was understated 2.4 to 3x. Scoring by patent family fixed it and reversed the planned switch to the smaller subset.";
