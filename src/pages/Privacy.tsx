import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { ExternalLinkIcon } from "lucide-react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import {
  privacy_policy as privacyPolicy,
  security_policy as securityPolicy,
  reports,
} from "@/assets/global-urls.json";

import SimpleLangSwitch from "@/components/custom/ui/SimpleLangSwitch";
import { parseQueryLang } from "@/lib/utils";

const { security: securityReports } = reports;

// ! ONLY CHANGE THIS IF THE PRIVACY POLICY CONTENT CHANGED
const LAST_UPDATED = "2025-11-15";
function getLastUpdated(lang: Lang) {
  const date = new Date(LAST_UPDATED);

  switch (lang) {
    case "en":
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case "id":
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    default:
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  }
}

const SUPPORTED_LANG = ["en", "id"] as const;
type Lang = (typeof SUPPORTED_LANG)[number];

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-gray-300 dark:bg-white/10 rounded px-1.5">{children}</code>;
}

const PRIVACY_POLICY: Record<
  Lang,
  {
    title: React.ReactNode;
    intro: React.ReactNode;
    bullets: React.ReactNode[];
    contactNote: React.ReactNode;
    footer: React.ReactNode;
  }
> = {
  en: {
    title: "Privacy Policy",
    intro: <>
      <span className="font-semibold dark:text-gray-100">Neo-SkiArticle</span> is a public, static site for the <span className="font-semibold dark:text-gray-100">Sukamandi Vocational High School's</span> school community.
      We do not collect or store personal data from visitors on this site.
      We use limited third-party analytics for monitoring site health.
    </>,
    bullets: [
      <>
        Analytics: <span className="font-semibold dark:text-gray-100">Vercel Analytics</span> (aggregated pageviews, performance and referrer data).
      </>,
      "No user accounts or stored form submissions on this public site.",
      "No third-party advertising or cross-site trackers are used.",
      "If private/personal information appears on the site, contact the team for removal.",
    ],
    contactNote: <>
      For private reports or removal requests see <Code>security.txt</Code>.
      For non-sensitive enquiries open a public issue (see below).
    </>,
    footer: <>
      For full operational details see <a href={securityPolicy.external.en} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400"><Code>SECURITY.md</Code></a> in the repository.
    </>,
  },
  id: {
    title: "Kebijakan Privasi",
    intro: <>
      <span className="font-semibold dark:text-gray-100">Neo-SkiArticle</span> adalah situs publik statis untuk komunitas <span className="font-semibold dark:text-gray-100">Sekolah Menengah Kejuruan Sukamandi</span>.
      Kami tidak mengumpulkan atau menyimpan data pribadi pengunjung di situs ini.
      Kami menggunakan analitik pihak ketiga terbatas untuk memantau kesehatan situs.
    </>,
    bullets: [
      <>
        Analitik: <span className="font-semibold dark:text-gray-100">Vercel Analytics</span> (data teragregasi seperti tampilan halaman, performa, dan perujuk).
      </>,
      "Tidak ada akun pengguna atau penyimpanan hasil formulir pada situs publik ini.",
      "Tidak menggunakan iklan pihak ketiga atau pelacak lintas-situs.",
      "Jika ada informasi pribadi pada situs yang perlu dihapus, hubungi tim untuk penghapusan.",
    ],
    contactNote: <>
      Untuk laporan privat atau permintaan penghapusan, lihat <Code>security.txt</Code>.
      Untuk pertanyaan non-sensitif buka issue publik (lihat di bawah).
    </>,
    footer: <>
      Untuk detail operasional lihat <a href={securityPolicy.external.en} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400"><Code>SECURITY.md</Code></a> di repositori.
    </>,
  },
};

export function PrivacyPage() {
  const location = useLocation();
  const [lang, setLang] = useState<Lang>("en");
  const { lang: langParam } = useParams();

  // read forced lang via ?lang= (useful for testing / user choice)
  const forcedLang = useMemo(() => parseQueryLang<Lang>(location.search, SUPPORTED_LANG), [location.search]);

  useEffect(() => {
    // forced lang from search params must take precedence
    if (forcedLang && !langParam) return void setLang(forcedLang);

    // forced lang from URL segment
    if (langParam && SUPPORTED_LANG.includes(langParam as Lang)) return void setLang(langParam as Lang);

    // preferred-lang from local storage
    if (typeof localStorage !== 'undefined') {
      const storedLang = localStorage.getItem('preferred-lang');
      if (storedLang) return void setLang(storedLang as Lang);
    }

    // Fallback: preferred-languages from the browser
    const navLangs = typeof navigator !== "undefined" && (navigator.languages || [navigator.language || "en"]);
    if (Array.isArray(navLangs)) {
      // normalize and check presence of 'id' or 'en'
      const langs = navLangs.map((l) => l.toLowerCase());
      if (langs.some((l) => l.startsWith("id"))) {
        setLang("id");
      } else {
        setLang("en"); // default fallback
      }
    } else {
      setLang("en");
    }
  }, [forcedLang, langParam]);

  useEffect(() => {
    // update document lang attribute for accessibility/SEO
    document.documentElement.lang = lang === "id" ? "id" : "en";

    // Set the document title
    document.title = `${PRIVACY_POLICY[lang].title} · NeoSKI`;
  }, [lang]);

  const t = PRIVACY_POLICY[lang];

  return (
    <>
      <Header sticky scrollThreshold={0} className="bg-none bg-transparent" />
      <main className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-100 pt-10">
        <div className="max-w-4xl mx-auto px-8 md:px-6 lg:px-4 py-12 leading-[1.75]">
          {langParam
            ? <h1 className="text-2xl sm:text-3xl font-semibold mb-4">{t.title}</h1>
            : (
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold mb-1">{t.title}</h1>
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">
                    {lang === "id" ? "Terakhir diperbarui:" : "Last updated:"}
                    {" "}
                    {getLastUpdated(lang)}
                  </p>
                </div>
                <SimpleLangSwitch lang={lang} setLang={(l) => setLang(l)} />
              </div>
            )
          }

          <p className="text-gray-600 dark:text-[#d1d5dc]">{t.intro}</p>

          <section className="mt-6 mb-6">
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-[#d1d5dc]">
              {t.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </section>

          <section className="mb-6 text-gray-700 dark:text-[#d1d5dc]">
            <p>{t.contactNote}</p>

            <div className="mt-6 px-2 flex justify-center">
              <a
                href={privacyPolicy.external[lang] || privacyPolicy.external.en}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
              >
                <i className="bx bx-book-open text-2xl mr-2" />
                <span className="inline-block text-sm text-center whitespace-normal break-words">
                  {lang === "id"
                    ? <strong>Lihat Kebijakan Privasi lengkap</strong>
                    : <strong>View the full Privacy Policy</strong>}
                  <ExternalLinkIcon className="inline w-3 h-3 ml-1" />
                </span>
              </a>
            </div>

            <div className="mt-5 md:mt-3 px-2 flex justify-center">
              <div className="grid gap-2 sm:gap-2 sm:grid-cols-2 justify-center max-w-full">
                <a
                  href={securityReports.private}
                  className="inline-flex gap-2 justify-center items-center px-4 py-2 bg-transparent dark:bg-inherit border border-gray-500 dark:not-hover:border-gray-300 hover:border-orange-400 hover:text-orange-400 focus:border-2 focus:border-orange-400 focus:text-orange-400 rounded-md text-sm"
                >
                  <i className="bx bx-shield text-2xl" />
                  <span className="text-center whitespace-normal break-words">
                    {lang === "id" ? "Lihat" : "View"} <code>security.txt</code>
                  </span>
                </a>

                <a
                  href={reports.general}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex gap-2 justify-center items-center px-4 py-2 bg-transparent dark:bg-inherit border border-gray-500 dark:not-hover:border-gray-300 hover:border-orange-400 hover:text-orange-400 focus:border-2 focus:border-orange-400 focus:text-orange-400 rounded-md text-sm"
                >
                  <i className="bx bx-bug text-2xl" />
                  <span className="text-center whitespace-normal break-words">
                    {lang === "id" ? "Buka issue publik" : "Open a public issue"}
                    <ExternalLinkIcon className="inline w-3 h-3 ml-1" />
                  </span>
                </a>
              </div>
            </div>
          </section>

          <hr className="border-t-3 border-gray-200 dark:border-gray-800 mb-6" />

          <footer className="text-sm text-gray-500 dark:text-gray-400">
            <p>{t.footer}</p>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function PrivacyPageLoader() {
  // get the URL segment
  const { lang: langParam } = useParams();

  if (langParam && !SUPPORTED_LANG.includes(langParam as Lang)) {
    console.warn(`Language "${langParam}" is not supported.`);
    console.log(`Redirecting to "${privacyPolicy.internal}"...`);
    // Redirect to page that supports switching language
    return <Navigate to={privacyPolicy.internal} />;
  }

  return <PrivacyPage />;
}
