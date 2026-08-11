import "./globals.css";
import { CONFIG } from "@/lib/config";
import { getSiteUrl } from "@/lib/site";

const FULL_NAME = "Flavio Santiago Siqueira";
const SITE_URL = getSiteUrl();

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${FULL_NAME} — Full Stack Developer`,
    template: `%s | ${FULL_NAME}`,
  },

  description: CONFIG.resumo,

  keywords: [
    "Flavio Santiago Siqueira",
    "Full Stack Developer",
    "Desenvolvedor Full Stack",
    "PHP Developer",
    "Laravel Developer",
    "WordPress Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "JavaScript",
    "Vue.js",
    "Python",
    "REST API",
    "MySQL",
    "QA Web",
    "Technical SEO",
    "Curitiba",
    "Remote Developer",
  ],

  authors: [
    {
      name: FULL_NAME,
      url: SITE_URL,
    },
  ],

  creator: FULL_NAME,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: SITE_URL,
    title: `${FULL_NAME} — Full Stack Developer`,
    description: CONFIG.resumo,
    siteName: `${FULL_NAME} — Portfólio`,
  },

  twitter: {
    card: "summary",
    title: `${FULL_NAME} — Full Stack Developer`,
    description: CONFIG.resumo,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,680&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
