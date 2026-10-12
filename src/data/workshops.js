/* ==========================================================================
   WORKSHOPS DATA
   To add a workshop, copy one object below, paste it after the last one
   (don't forget the comma), and change the values. That's it — the card
   and its "Learn More" window are generated automatically.

   Fields
   ------
   id           unique short id, no spaces         (required)
   title        workshop name                       (required)
   category     e.g. "Hardware", "Software"         (required)
   description  one or two sentences                (required)
   visual       built-in illustration: "arduino"    (optional — otherwise a
                generic illustration is used)
   image        optional image path, e.g.
                "/assets/images/workshops/arduino.jpg". If set, it replaces
                the illustration.
   details      optional list of paragraphs shown in the "Learn More" window.
                Leave [] to show "Workshop details coming soon."
   link         optional registration / info URL. If set, a button appears in
                the "Learn More" window.
   ========================================================================== */

export const workshops = [
  {
    id: "arduino",
    title: "Arduino Workshop",
    category: "Hardware",
    description:
      "Explore the world of embedded systems, electronics, and hands-on prototyping through Arduino.",
    visual: "arduino",
    image: "",
    details: [],
    link: "",
  },
  {
    id: "electronics",
    title: "Electronics Workshop",
    category: "Hardware",
    description:
      "Master circuit analysis, fundamental analog & digital electronics, PCB design, and component-level troubleshooting.",
    visual: "electronics",
    image: "",
    details: [
      "Dive into analog & digital circuit fundamentals: explore transistors, operational amplifiers, passive filters, and 555 timing circuits.",
      "Get hands-on laboratory experience with dual-channel oscilloscopes, signal generators, multimeter diagnostics, and breadboard prototyping.",
      "Learn schematic capture, component selection, and practical circuit troubleshooting to bring hardware inventions to life.",
    ],
    link: "",
  },

  /* ---- Copy the block below to add your next workshop ----
  {
    id: "web-dev",
    title: "Web Development Workshop",
    category: "Software",
    description: "Write a short description here.",
    visual: "",
    image: "",
    details: ["Optional paragraph 1", "Optional paragraph 2"],
    link: "",
  },
  ------------------------------------------------------- */
];

// Shows a dashed "More workshops coming soon" card at the end of the grid.
// Set to false to hide it.
export const showComingSoonCard = true;
