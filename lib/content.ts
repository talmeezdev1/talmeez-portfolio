/**
 * All site copy lives here so you can edit text without touching components.
 *
 * Rules for this file:
 * - Only real facts. Anything unknown is a clearly marked placeholder in [BRACKETS].
 * - Search for "[ADD" and "YOUR " to find every placeholder that still needs real content.
 */

export const site = {
  name: "Talmeez Ur Rehman",
  shortName: "TALMEEZ",
  role: "Digital Growth & Creative Specialist",
  location: "Dubai, UAE",
  statement: "I don't just create things. I build digital experiences that help businesses grow.",
  // Replace these placeholders with your real details. Leave href as "" until you have one.
  contact: {
    email: { label: "talmeez@luckybiz.ae", href: "mailto:talmeez@luckybiz.ae" },
    linkedin: { label: "linkedin.com/in/talmeez-ur-rehman", href: "https://www.linkedin.com/in/talmeez-ur-rehman" },
    github: { label: "github.com/talmeezdev1", href: "https://github.com/talmeezdev1" },
  },
  portrait: "/images/talmeez.jpg", // your photo lives at public/images/talmeez.jpg
  hasPortrait: true,
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Ads", href: "#ads" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const heroTags = ["Digital Growth", "Creative Strategy", "Web", "Content", "Performance"];

export const skills = [
  { name: "Digital Marketing", text: "Connecting content, campaigns and customer journeys into one system." },
  { name: "Paid Ads", text: "Building campaigns designed around attention, intent and measurable growth." },
  { name: "SEO", text: "Creating search experiences that help businesses become discoverable." },
  { name: "Lead Generation", text: "Designing campaigns and journeys that turn attention into enquiries." },
  { name: "Content", text: "Turning ideas into visuals, videos and stories people actually notice." },
  { name: "Web Development", text: "Building modern digital experiences that are fast, responsive and conversion-focused." },
  { name: "Video", text: "Short-form visual storytelling built for attention." },
  { name: "Creative Strategy", text: "Turning business objectives into clear creative direction." },
];

export type Project = {
  id: string;
  number: string;
  name: string;
  kicker: string[];
  summary: string;
  workedOn: string[];
  /** Real results only. `value` is the big number, `label` explains it. Use [] to hide the Results column. */
  results: { value: string; label: string }[];
  /** Put screenshots in public/images/projects/ and reference them here. Empty = styled placeholder. */
  image?: string;
  video?: string;
  poster?: string;
  href?: string;
  /** "contain" for vertical images/videos so nothing gets cropped. */
  fit?: "cover" | "contain";
  tone: "violet" | "blue" | "cyan" | "mixed";
};

export const projects: Project[] = [
  {
    id: "luckybiz",
    number: "01",
    name: "LuckyBiz",
    kicker: ["Business Setup", "Digital Growth", "Web Experience"],
    summary:
      "A UAE business setup brand. I work across the website, search, Meta Ads, content and lead generation, all pointed at one outcome: more people starting a company through LuckyBiz.",
    workedOn: ["Website", "Digital Strategy", "SEO", "Paid Advertising", "Creative", "Lead Generation"],
    results: [
      { value: "< AED 9", label: "Cost per lead" },
      { value: "1,000+", label: "Leads in one month" },
    ],
    image: "/images/projects/luckybiz.jpg",
    fit: "contain",
    tone: "violet",
  },
  {
    id: "lynks",
    number: "02",
    name: "Lynks",
    kicker: ["Business Solutions", "Creative Growth"],
    summary:
      "Business solutions brand selling UAE company formation to founders abroad. I run its international lead campaigns, with a separate ad set and budget for each country, plus the creative and social content that feeds them.",
    workedOn: ["Creative Campaigns", "Social Media", "Advertising", "Website & Digital"],
    results: [
      { value: "< AED 15", label: "Cost per lead" },
      { value: "800+", label: "Leads in one month" },
    ],
    image: "/images/projects/lynks.jpg",
    fit: "contain",
    tone: "blue",
  },
  {
    id: "heatherfield",
    number: "03",
    name: "Heatherfield",
    kicker: ["Real Estate", "Property Video", "Social Media"],
    summary: "Property video content for a Dubai real estate brand, shot and edited for listings and social feeds.",
    workedOn: ["Property Video", "Editing", "Social Content"],
    results: [],
    video: "/images/projects/heatherfield.mp4",
    poster: "/images/projects/heatherfield.jpg",
    fit: "contain",
    tone: "cyan",
  },
];

export const journey = [
  {
    stage: "BPO / Sales",
    dates: "Feb 2019 — Aug 2019",
    place: "Blue Cross BPO · Islamabad",
    role: "Outbound Sales Representative",
    text: "Top seller on a US Medicare campaign. Learned what makes a stranger say yes on a phone call.",
  },
  {
    stage: "Customer Experience",
    dates: "Oct 2019 — Sep 2022",
    place: "Rapid Squad BPO · Mars BPO · Islamabad",
    role: "Verifier, then Team Lead",
    text: "Checked every sale before it counted, then led a team on a US auto insurance campaign. Quality over volume.",
  },
  {
    stage: "Real Estate Content",
    dates: "2024 — Jan 2025",
    place: "Heatherfield Real Estate · Dubai",
    role: "Content Creator",
    text: "Property videos for listings and social media. First time making content for a brand full time.",
  },
  {
    stage: "Digital Marketing",
    dates: "2025 — Now",
    place: "LuckyBiz · Lynks · Dubai",
    role: "Digital Marketing",
    text: "Social content and organic growth for two business setup brands.",
  },
  {
    stage: "Websites",
    dates: "2025 — Now",
    place: "LuckyBiz · Lynks",
    role: "Web Development",
    text: "Designing and building the sites campaigns send people to, in Next.js and WordPress.",
  },
  {
    stage: "Paid Ads",
    dates: "2025 — Now",
    place: "LuckyBiz · Lynks",
    role: "Meta Ads",
    text: "Lead generation campaigns across the UAE and international markets, reviewed daily.",
  },
  {
    stage: "Digital Growth",
    dates: "Now",
    place: "Dubai, UAE",
    role: "Digital Growth & Creative Specialist",
    text: "Strategy, creative, web and ads working as one system.",
  },
];

/**
 * Creative Lab items. Images go in public/images/lab/, videos in public/videos/.
 * - Image: set `src`.
 * - Video ad: set `video` (MP4) and `poster` (a JPG still from the video). Use ratio "9/16" for Reels/Stories, "4/5" for feed, "1/1" square.
 * Empty src and video shows a styled placeholder.
 */
export type LabItem = {
  id: string;
  type: string;
  title: string;
  src?: string;
  video?: string;
  poster?: string;
  ratio: string;
  /** Optional one-line context, e.g. "Meta Ads · UK market". Shown on hover and in the full-screen view. */
  meta?: string;
};

export const labItems: LabItem[] = [
  { id: "v1", type: "Video Ad", title: "LuckyBiz — AED 8,999 license + visa", video: "/videos/luckybiz-ad-1-web.mp4", poster: "/videos/luckybiz-ad-1.jpg", ratio: "9/16", meta: "Meta Ads · UAE" },
  { id: "s1", type: "Static Ad", title: "Trade License + Visa — AED 7,999", src: "/images/lab/choose-wisely.jpg", ratio: "4/5", meta: "LuckyBiz × Lynks" },
  { id: "v2", type: "Video Ad", title: "Dubai visa for life — explainer", video: "/videos/zerlish-web.mp4", poster: "/videos/zerlish.jpg", ratio: "9/16", meta: "Informational video · Meta Ads" },
  { id: "s2", type: "Social Creative", title: "Monday motivation post", src: "/images/lab/lynks-monday.jpg", ratio: "1400/1218", meta: "Lynks · Instagram" },
  { id: "s3", type: "Story Ad", title: "Complete Dubai business setup", video: "/images/lab/luckybiz-story.mp4", poster: "/images/lab/luckybiz-story.jpg", ratio: "9/16", meta: "LuckyBiz · Animated story" },
  { id: "v3", type: "Video Ad", title: "LuckyBiz — 17,990 campaign", video: "/videos/ad-17990-web.mp4", poster: "/videos/ad-17990.jpg", ratio: "9/16", meta: "Meta Ads · UAE" },
  { id: "s4", type: "Static Ad", title: "Business license — AED 8,999", src: "/images/lab/lynks-aed-8999.jpg", ratio: "1/1", meta: "Lynks · Limited-time offer" },
  { id: "s5", type: "Campaign Concept", title: "\"The duo\" — iPhone vs trade license", src: "/images/lab/iphone-duo.jpg", ratio: "4/5", meta: "LuckyBiz × Lynks" },
];

export const process = [
  { n: "01", title: "Think", text: "Understand the business, audience and objective." },
  { n: "02", title: "Build", text: "Turn the strategy into creative, content and digital experiences." },
  { n: "03", title: "Launch", text: "Put the work into the real world." },
  { n: "04", title: "Optimize", text: "Learn from performance and improve continuously." },
];

export const philosophy = [
  "Good design gets attention.",
  "Good strategy gives it direction.",
  "Good execution makes it matter.",
];

export const currentlyBuilding = ["Digital Experiences", "Campaigns", "Websites", "Brands", "Growth Systems"];

/** The scrolling strip under the hero. Only real numbers in `highlight`. */
export const ticker: { text: string; highlight?: string }[] = [
  { highlight: "< AED 9", text: "cost per lead · LuckyBiz" },
  { text: "Meta Ads" },
  { highlight: "1,000+", text: "leads in a month · LuckyBiz" },
  { text: "Landing pages" },
  { highlight: "800+", text: "leads in a month · Lynks" },
  { text: "Video ads" },
  { highlight: "< AED 15", text: "cost per lead · Lynks" },
  { text: "SEO" },
  { text: "Next.js" },
  { text: "Content & creative" },
];

/** Headline numbers on the hero dashboard. Real campaign results only. */
export const kpis = [
  { value: "< AED 9", label: "Cost per lead", brand: "LuckyBiz" },
  { value: "1,000+", label: "Leads in one month", brand: "LuckyBiz" },
  { value: "800+", label: "Leads in one month", brand: "Lynks" },
  { value: "< AED 15", label: "Cost per lead", brand: "Lynks" },
];

export const toolkit = ["Meta Ads Manager", "Next.js", "WordPress", "PHP", "HTML / CSS / JS", "CapCut", "Canva"];

export const languages = ["English", "Urdu", "Hindi"];
