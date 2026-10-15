/* ==========================================================================
   HIGH BOARD DATA
   Replace the [PLACEHOLDER] names with the real names when you have them.

   Fields
   ------
   tier      controls the layout position. Keep as is:
             "chairman" | "vice" | "core" | "faculty"
   position  the title shown on the card
   name      the person's name
   image     optional photo path, e.g. "/assets/images/board/chairman.jpg"
             (leave "" to show a placeholder avatar)
   links     optional social links — leave "" to hide an icon. Supported:
             linkedin, facebook, instagram, github, website, email
             (email can be just "name@example.com")
   ========================================================================== */

const noLinks = {
  linkedin: "",
  facebook: "",
  instagram: "",
  github: "",
  website: "",
  email: "",
};

export const highBoard = [
  {
    id: "chairman",
    tier: "chairman",
    position: "Chairman",
    name: "Mahmoud Mohamed",
    image: "/assets/images/board/mohamed.jpeg",
    links: { ...noLinks, linkedin: "https://www.linkedin.com/in/mahmoudabdeltwab?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  },
  {
    id: "vice-chairman",
    tier: "vice",
    position: "Vice Chairman",
    name: "Mahmoud Ahmed",
    image: "/assets/images/board/mahmoud.jpeg",
    links: { ...noLinks, linkedin: "https://www.linkedin.com/in/mahmoud-emara-258818410?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  },
  {
    id: "secretary",
    tier: "core",
    position: "Secretary",
    name: "Omar Farouk",
    image: "/assets/images/board/omar.jpeg",
    links: { ...noLinks },
  },
  {
    id: "webmaster",
    tier: "core",
    position: "Webmaster",
    name: "Nahed Tamer",
    image: "/assets/images/board/nahed.jpeg",
    links: { ...noLinks, linkedin: "https://www.linkedin.com/in/nahed-tamer-57549a179?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
  },
  {
    id: "treasurer",
    tier: "core",
    position: "Treasurer",
    name: "Amr Wasseim",
    image: "/assets/images/board/amr.jpeg",
    links: { ...noLinks, linkedin: "https://www.linkedin.com/in/amrwasim-helal-20441b368" },
  },
  {
    id: "supervisor",
    tier: "faculty",
    position: "Supervisor",
    name: "Dr. Mohamed Saeed",
    image: "/assets/images/board/dr_mohamed_said.jpeg",
    links: { ...noLinks },
  },
  {
    id: "mentor",
    tier: "faculty",
    position: "Supervisor",
    name: "Dr. Dina El-Naggar",
    image: "/assets/images/board/dr_dina_hosny_el_nagar.jpeg",
    links: { ...noLinks },
  },
];
