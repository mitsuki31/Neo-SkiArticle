import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import {
  security_policy as securityPolicy,
  reports,
} from "@/assets/global-urls.json";

import SimpleLangSwitch from "@/components/ui/SimpleLangSwitch";
import { parseQueryLang } from "@/lib/utils";

const { security: securityReports } = reports;

const SUPPORTED_LANG = ["en", "id"] as const;
type Lang = (typeof SUPPORTED_LANG)[number];

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-gray-300 dark:bg-white/10 rounded px-1.5">{children}</code>;
}

const SECURITY_POLICY: Record<
  Lang,
  {
    title: React.ReactNode;
    intro: React.ReactNode;
    scopeTitle: React.ReactNode;
    scope: React.ReactNode;
    whatToReportTitle: React.ReactNode;
    whatToReport: React.ReactNode[];
    whatToReportFooter: React.ReactNode;
    howToReportTitle: React.ReactNode
    publicReportTitle: React.ReactNode;
    publicReportBtn: React.ReactNode;
    publicReportDesc: React.ReactNode;
    privateReportTitle: React.ReactNode;
    privateReportBtn: React.ReactNode;
    privateReportDesc: React.ReactNode;
    includeListTitle: React.ReactNode;
    includeList: React.ReactNode[];
    responseExpectationTitle: React.ReactNode;
    responseExpectation: React.ReactNode;
    responseExpectationFooter: React.ReactNode;
    additionalResourcesTitle: React.ReactNode;
    additionalResources: React.ReactNode[];
    footerNotes: React.ReactNode[];
  }
> = {
  en: {
    title: "Security",
    intro: <>
      <span className="font-bold dark:text-gray-100">NeoSKI</span> (<code>Neo-SkiArticle</code>) takes security seriously.
      This page explains how to report potential issues and what to expect.
    </>,
    scopeTitle: "Scope",
    scope: <>
      This site is a static, client-rendered website deployed from the latest verified build.
      The public site does not store persistent user data. This page covers the public website only
      and not the behaviour of third-party embeds or external services.
    </>,
    whatToReportTitle: "What to Report",
    whatToReport: [
      "Cross-site scripting (XSS) or content injection affecting the site.",
      "Broken or missing security headers that materially affect safety.",
      "Supply-chain concerns in build assets or dependencies.",
      "Exposed tokens, secrets, or build/deploy pipeline compromise.",
    ],
    whatToReportFooter: <>
      Please avoid posting secrets, passwords, or full exploit code in a public report.
      If sensitive proof-of-concept is required, use the private contact channel (see below).
    </>,
    howToReportTitle: "How to Report",
    publicReportTitle: "Public report (GitHub issue)",
    publicReportBtn: "Open public security issue",
    publicReportDesc: <>
      Use the repository issue template for security reports. Public reports are appropriate
      for non-sensitive issues and help with triage and collaboration.
    </>,
    privateReportTitle: "Private report",
    privateReportBtn: <>View <code>security.txt</code></>,
    privateReportDesc: <>
      For critical or sensitive issues (exploits, leaked secrets, build compromise),
      please use the private contact specified in <Code>security.txt</Code>.
      This prevents public disclosure of sensitive details before remediation.
    </>,
    includeListTitle: "What to Include",
    includeList: [
      "Concise summary of the issue",
      "Steps to reproduce (minimal and safe)",
      "Environment details (browser, OS, versions)",
      "Impact assessment (what an attacker can do)",
      <><span className="italic">(Optional)</span> Suggested mitigation or fix</>
    ],
    responseExpectationTitle: "Response Expectations",
    responseExpectation: <>
      We aim to acknowledge reports within <span className="font-bold dark:text-gray-100">72 hours</span> and
      provide a substantive update within <span className="font-bold dark:text-gray-100">7 calendar days</span>,
      unless the report is critical. For critical issues, follow the
      private contact path in <Code>security.txt</Code>.
    </>,
    responseExpectationFooter: <>
      After validation we will deploy a fix and, where appropriate,
      follow up with a disclosure describing impact and remediation.
    </>,
    additionalResourcesTitle: "Additional Resources",
    additionalResources: [
      <a
        href={securityPolicy.external.en}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5 external-link"
      >
        Full repository Security Policy (<Code>SECURITY.md</Code>)
      </a>,
      <a href={securityReports.private} className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5">
        Private security contact (<Code>security.txt</Code>)
      </a>,
      <a href={securityReports.public} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5 external-link">
        Open a public security issue
      </a>
    ],
    footerNotes: [
      "No bounty program is currently offered.",
      <>
        For maintainers, please keep this page in sync with <a href={securityPolicy.external.en} target="_blank" className="text-blue-600 dark:text-blue-400"><Code>SECURITY.md</Code></a>.
        Do not publish internal runbooks or secrets here.
      </>,
    ],
  },

  id: {
    title: "Keamanan",
    intro: <>
      <span className="font-bold dark:text-gray-100">NeoSKI</span> (<code>Neo-SkiArticle</code>) memandang serius aspek keamanan.
      Halaman ini menjelaskan bagaimana melaporkan masalah dan apa yang diharapkan setelah laporan dikirim.
    </>,
    scopeTitle: "Ruang Lingkup",
    scope: <>
      Situs ini adalah situs statis yang dirender di sisi klien dan dideploy dari build terbaru yang terverifikasi.
      Situs publik tidak menyimpan data pengguna yang persisten. Halaman ini hanya mencakup situs web publik dan
      tidak mencakup perilaku embed pihak ketiga atau layanan eksternal.
    </>,
    whatToReportTitle: "Apa yang Harus Dilaporkan",
    whatToReport: [
      "Cross-site scripting (XSS) atau injeksi konten yang memengaruhi situs.",
      "Header keamanan yang rusak atau hilang yang memengaruhi keamanan secara signifikan.",
      "Kekhawatiran supply-chain pada aset build atau dependensi.",
      "Token atau rahasia internal yang terekspos, atau kompromi pipeline build/deploy.",
    ],
    whatToReportFooter: <>
      Harap hindari memposting informasi rahasia, kata sandi, atau kode eksploit lengkap dalam laporan publik.
      Jika diperlukan bukti konsep yang sensitif, gunakan saluran kontak privat (lihat di bawah).
    </>,
    howToReportTitle: "Cara Melaporkan",
    publicReportTitle: "Laporan publik (GitHub issue)",
    publicReportBtn: "Buka issue keamanan publik",
    publicReportDesc: <>
      Gunakan templat masalah repositori untuk laporan keamanan. Laporan publik sesuai
      untuk masalah yang tidak sensitif dan membantu dalam penyaringan dan kolaborasi.
    </>,
    privateReportTitle: "Laporan privat",
    privateReportBtn: <>Lihat <code>security.txt</code></>,
    privateReportDesc: <>
      Untuk masalah kritis atau sensitif (celah keamanan, kebocoran rahasia, kompromi sistem),
      silakan gunakan kontak pribadi yang tercantum dalam <Code>security.txt</Code>.
      Hal ini mencegah pengungkapan publik detail sensitif sebelum tindakan perbaikan dilakukan.
    </>,
    includeListTitle: "Yang Perlu Disertakan",
    includeList: [
      "Ringkasan singkat masalah",
      "Langkah-langkah untuk mereproduksi (minimal dan aman)",
      "Rincian lingkungan (browser, sistem operasi, versi)",
      "Penilaian dampak (apa yang dapat dilakukan penyerang)",
      <><span className="italic">(Opsional)</span> Saran mitigasi atau perbaikan</>
    ],
    responseExpectationTitle: "Respon yang Diharapkan",
    responseExpectation: <>
      Kami berupaya menanggapi laporan dalam waktu <span className="font-bold dark:text-gray-100">72 jam</span> dan
      memberikan pembaruan substansial dalam waktu <span className="font-bold dark:text-gray-100">7 hari kalender</span>,
      kecuali jika laporan tersebut bersifat kritis. Untuk masalah kritis, ikuti
      jalur kontak pribadi yang tercantum dalam <Code>security.txt</Code>.
    </>,
    responseExpectationFooter: <>
      Setelah validasi, kami akan menerapkan perbaikan dan, jika diperlukan,
      melanjutkan dengan pengungkapan yang menjelaskan dampak dan tindakan perbaikan.
    </>,
    additionalResourcesTitle: "Sumber Referensi Tambahan",
    additionalResources: [
      <a
        href={securityPolicy.external.en}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5 external-link"
      >
        Kebijakan Keamanan repositori lengkap (<Code>SECURITY.md</Code>)
      </a>,
      <a href={securityReports.private} className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5">
        Kontak keamanan privat (<Code>security.txt</Code>)
      </a>,
      <a href={securityReports.public} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5 external-link">
        Buka issue keamanan publik
      </a>
    ],
    footerNotes: [
      "Saat ini tidak ada program bounty.",
      <>
        Untuk maintainer, silahkan tetapkan halaman ini sesuai dengan <a href={securityPolicy.external.en} target="_blank" className="text-blue-600 dark:text-blue-400"><Code>SECURITY.md</Code></a>.
        Jangan publikasikan runbook internal atau rahasia internal di sini.
      </>,
    ],
  },
};

export function SecurityPage() {
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
    document.title = `${SECURITY_POLICY[lang].title} · NeoSKI`;
  }, [lang]);

  const t = SECURITY_POLICY[lang];

  return (
    <>
      <Header sticky scrollThreshold={0} className="bg-none bg-transparent" />
      <main id="security" className="min-h-screen bg-gray-50 dark:bg-background text-gray-800 dark:text-gray-100 pt-10">
        <div className="max-w-4xl mx-auto px-8 md:px-6 lg:px-4 py-12 leading-[1.75]">
          {langParam
            ? <h1 className="text-2xl sm:text-3xl font-semibold mb-4">{t.title}</h1>
            : (
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl sm:text-3xl font-semibold">{t.title}</h1>
                <div className="ml-4">
                  <SimpleLangSwitch lang={lang} setLang={(l) => setLang(l)} />
                </div>
              </div>
            )
          }

          <p className="dark:text-[#d1d5dc] mb-6">{t.intro}</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{t.scopeTitle}</h2>
            <p className="dark:text-[#d1d5dc] mb-2">{t.scope}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{t.whatToReportTitle}</h2>
            <ul className="list-disc dark:text-[#d1d5dc] pl-8 space-y-1">
              {t.whatToReport.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{t.whatToReportFooter}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{t.howToReportTitle}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800">
                <h3 className="inline-flex gap-2 justify-center items-center font-semibold mb-2">
                  <i className="bx bxl-github text-2xl" />
                  <span>{t.publicReportTitle}</span>
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{t.privateReportDesc}</p>
                <a
                  href={securityReports.public}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex gap-2 justify-center items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm"
                >
                  <i className="bx bx-bug text-2xl" />
                  <span className="inline-block text-center whitespace-normal break-words external-link">
                    {t.publicReportBtn}
                  </span>
                </a>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800">
                <h3 className="inline-flex gap-2 justify-center items-center font-semibold mb-2">
                  <i className="bx bx-lock-alt text-2xl" />
                  <span>{t.privateReportTitle}</span>
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{t.privateReportDesc}</p>
                <a
                  href={securityReports.public}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex gap-2 justify-center items-center px-4 py-2 bg-transparent dark:bg-inherit border border-gray-500 dark:not-hover:border-gray-300 hover:border-orange-400 hover:text-orange-400 focus:border-2 focus:border-orange-400 focus:text-orange-400 rounded-md text-sm"
                >
                  <i className="bx bx-shield text-2xl" />
                  <span className="inline-block text-center whitespace-normal break-words">
                    {t.privateReportBtn}
                  </span>
                </a>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{t.includeListTitle}</h2>
            <ol className="list-decimal dark:text-[#d1d5dc] pl-8 space-y-1">
              {t.includeList.map((item, i) => <li key={i}>{item}</li>)}
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{t.responseExpectationTitle}</h2>
            <p className="dark:text-[#d1d5dc] mb-2">{t.responseExpectation}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t.responseExpectationFooter}</p>
          </section>

          <section className="mb-6 text-gray-700 dark:text-[#d1d5dc]">
            <div className="mt-6 px-2 flex justify-center">
              <a
                href={securityPolicy.external.en}
                target="_blank"
                rel="noreferrer"
                className="inline-flex gap-2 items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
              >
                <i className="bx bx-book-open text-2xl" />
                <span className="inline-block text-sm text-center whitespace-normal break-words external-link">
                  {lang === "id"
                    ? <strong>Lihat Kebijakan Keamanan lengkap</strong>
                    : <strong>View the full Security Policy</strong>}
                </span>
              </a>
            </div>

            {/* <div className="mt-5 md:mt-3 px-2 flex justify-center">
              <div className="grid gap-4 grid-cols-2 justify-center max-w-full">
                <div className="inline-flex justify-center items-center px-4 py-2 bg-gray-100 dark:bg-inherit border border-gray-300 hover:border-orange-400 rounded-md">
                  <a
                    href={reports.private}
                    className="inline-block text-sm text-center whitespace-normal break-words"
                  >
                    {lang === "id" ? "Lihat" : "View"} <code>security.txt</code>
                  </a>
                </div>

                <div className="inline-flex justify-center items-center px-4 py-2 bg-gray-100 dark:bg-inherit border border-gray-300 hover:border-orange-400 rounded-md">
                  <a
                    href={reports.public}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-sm text-center whitespace-normal break-words external-link"
                  >
                    {lang === "id" ? "Buka issue keamanan publik" : "Open a public security issue"}
                  </a>
                </div>
              </div>
            </div> */}
          </section>

          <hr className="border-t-3 border-gray-200 dark:border-gray-800 mb-6" />

          <footer className="text-sm text-gray-500 dark:text-gray-400">
            {t.footerNotes.map((item, i) => <p className={i === 0 ? 'mb-3 font-bold' : ''} key={i}>{item}</p>)}
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function SecurityPageLoader() {
  // get the URL segment
  const { lang: langParam } = useParams();

  if (langParam && !SUPPORTED_LANG.includes(langParam as Lang)) {
    console.warn(`Language "${langParam}" is not supported.`);
    console.log(`Redirecting to "${securityPolicy.internal}"...`);
    // Redirect to page that supports switching language
    return <Navigate to={securityPolicy.internal} />;
  }

  return <SecurityPage />;
}
