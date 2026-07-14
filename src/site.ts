export const siteConfig = {
  name: "Jose Brusa",
  title: "Jose Brusa - Full Stack Developer",
  description:
    "Portfolio de Jose Brusa, desarrollador full stack especializado en React, Next.js, Node.js y TypeScript.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jb-frontend-developer.vercel.app").replace(/\/$/, ""),
  locale: "es_ES",
  links: {
    github: "https://github.com/josebrusa",
    linkedin: "https://www.linkedin.com/in/josebrusa/",
    whatsapp: "https://api.whatsapp.com/send/?phone=34670969147",
  },
};
