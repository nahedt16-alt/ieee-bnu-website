/* ==========================================================================
   TECHNICAL TEAM DATA  (drives the interactive flowchart)
   Edit names, roles and descriptions here — no other file needs to change.

   `icon` options: "cpu" | "code" | "circuit"
   `image`: optional photo path, e.g. "/assets/images/team/khattab.jpg"
            (leave "" to show a placeholder avatar)
   ========================================================================== */

export const technicalTeam = {
  // The main (top) node. Clicking it reveals the Technical Lead + both branches.
  root: {
    id: "technical",
    label: "TECHNICAL",
    icon: "cpu",
    description: "Where software and hardware come together.",
    lead: {
      role: "Technical Lead",
      name: "Khattab Walid",
      image: "/assets/images/team/khattab.jpg",
    },
  },

  // The branches under the root. Add another object here to add another branch.
  branches: [
    {
      id: "software",
      label: "SOFTWARE",
      icon: "code",
      description: "Everything that runs on code.",
      head: {
        role: "Software Head",
        name: "Moataz Fawzy",
        image: "/assets/images/team/moataz.jpg",
      },
    },
    {
      id: "hardware",
      label: "HARDWARE",
      icon: "circuit",
      description: "Electronics and embedded systems.",
      head: {
        role: "Hardware Head",
        name: "Abdelrahman Nayef",
        image: "/assets/images/team/nayef.jpg",
      },
    },
  ],
};
