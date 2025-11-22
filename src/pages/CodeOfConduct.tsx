import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { ExternalLinkIcon } from "lucide-react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import {
  code_of_conduct as codeOfConduct,
  security_policy as securityPolicy,
} from "@/assets/global-urls.json";

import SimpleLangSwitch from "@/components/ui/SimpleLangSwitch";
import { parseQueryLang } from "@/lib/utils";

const SUPPORTED_LANG = ["en", "id"] as const;
type Lang = (typeof SUPPORTED_LANG)[number];

function Bold({ children }: { children: React.ReactNode }) {
  return <span className="font-bold dark:text-white">{children}</span>;
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-gray-300 dark:bg-white/10 rounded px-1.5">{children}</code>;
}

const CODE_OF_CONDUCT: Record<Lang, { title: string; sections: Array<{ h: React.ReactNode; p: React.ReactNode | React.ReactNode[] }> }> = {
  en: {
    title: "Code of Conduct",
    sections: [
      {
        h: "Purpose",
        p: <>
          This website represents the school community. To keep it safe, respectful, and aligned with the school's values,
          all visitors and contributors are expected to follow this <Bold>Code of Conduct</Bold>.
          These rules apply to all interactions involving the site, including submitted reports, feedback, or feature requests.
        </>,
      },
      {
        h: "Expected Behavior",
        p: [
          "Treat all individuals with respect and professionalism.",
          "Use the website responsibly and avoid actions that disrupt its operation.",
          "Respect privacy and avoid sharing information about students or staff without explicit permission.",
          <>
            Report security issues responsibly following the{" "}
            <a href={securityPolicy.internal} className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5">
              Security Policy
            </a>.
          </>,
          "Understand that this website exists for educational purposes and school information — not for data harvesting or content redistribution.",
        ],
      },
      {
        h: "Prohibited Behavior",
        p: [
          "Harassment, threats, discrimination, or personal attacks.",
          "Sharing private or personally-identifiable information from the site without authorization.",
          "Attempting to access restricted resources, scraping data, or automating access outside normal browsing.",
          "Introducing malicious content or exploiting vulnerabilities instead of reporting them.",
        ],
      },
      {
        h: "Reporting Behavior Issues",
        p: <>
          <p>If you notice behavior violating this <Bold>Code of Conduct</Bold>:</p>

          <ul className="list-disc pl-8 mt-2 text-gray-700 dark:text-[#d1d5dc]">
            <li>For sensitive or private matters, use the confidential contact information in <Code>/.well-known/security.txt</Code>.</li>
            <li>For general website misuse or content concerns, open a public GitHub issue with appropriate context (no personal data).</li>
          </ul>

          <p className="mt-2">
            For more information, please refer to the <a href={securityPolicy.internal} className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5">
              Security page
            </a>.
          </p>
        </>
      },
      {
        h: "Enforcement",
        p: [
          "Reports may be handled confidentially; maintainers may remove content, or restrict access where appropriate.",
          "Maintainers will act at their discretion, guided by safety and legal obligations.",
          <>
            Maintainers may take further action and report to the authorities with the
            approval of the school if anyone violates this <Bold>Code of Conduct</Bold>.
          </>,
        ],
      },
      {
        h: "Scope",
        p: "Applies to the website, repository interactions (issues, PRs), and related community channels.",
      },
    ],
  },

  id: {
    title: "Kode Etik",
    sections: [
      {
        h: "Tujuan",
        p: <>
          Situs web ini merepresentasikan komunitas sekolah. Untuk menjaga agar situs ini tetap aman, terhormat,
          dan sejalan dengan nilai-nilai sekolah, semua pengunjung dan kontributor diharapkan mematuhi <Bold>Kode Etik</Bold> ini.
          Aturan ini berlaku untuk semua interaksi yang melibatkan situs ini, termasuk laporan yang diajukan, umpan balik,
          atau permintaan fitur.
        </>,
      },
      {
        h: "Perilaku yang Diharapkan",
        p: [
          "Perlakukan semua individu dengan hormat dan profesionalisme.",
          "Gunakan situs web ini dengan bijak dan hindari tindakan yang konstruktif.",
          "Hormati privasi dan hindari membagikan informasi tentang siswa atau staf tanpa izin yang jelas.",
          <>
            Laporkan masalah keamanan secara bertanggung jawab sesuai dengan{" "}
            <a href={securityPolicy.internal} className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5">
              Kebijakan Keamanan
            </a>.
          </>,
          "Pahami bahwa situs web ini dibuat untuk tujuan pendidikan dan informasi sekolah — bukan untuk pengumpulan data atau redistribusi konten."
        ],
      },
      {
        h: "Perilaku yang Dilarang",
        p: [
          "Pelecehan, ancaman, diskriminasi, atau serangan pribadi.",
          "Membagikan informasi pribadi dari situs tanpa otorisasi.",
          "Mencoba mengakses sumber terbatas, scraping data, atau mengotomasi akses di luar penggunaan normal.",
          "Memperkenalkan konten berbahaya atau mengeksploitasi celah tanpa melaporkannya.",
        ],
      },
      {
        h: "Pelaporan Masalah Perilaku",
        p: <>
          <p>Jika Anda menemukan perilaku yang melanggar <Bold>Kode Etik</Bold> ini:</p>

          <ul className="list-disc pl-8 mt-2 text-gray-700 dark:text-[#d1d5dc]">
            <li>Untuk hal-hal yang bersifat sensitif atau pribadi, gunakan informasi kontak rahasia yang terdapat dalam <Code>/.well-known/security.txt</Code>.</li>
            <li>Untuk masalah penggunaan situs web yang tidak semestinya atau kekhawatiran terkait konten, buka masalah GitHub publik dengan konteks yang sesuai (tanpa data pribadi).</li>
          </ul>

          <p className="mt-2">
            Untuk informasi lebih lanjut, silakan merujuk ke halaman <a href={securityPolicy.internal} className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-5">
              Keamanan
            </a>.
          </p>
        </>
      },
      {
        h: "Penegakan",
        p: [
          "Laporan dapat ditangani secara rahasia; maintainer dapat menghapus konten, atau membatasi akses bila perlu.",
          "Keputusan diambil oleh maintainer dengan mempertimbangkan keselamatan dan kewajiban hukum.",
          <>
            Maintainer dapat mengambil tindakan lebih lanjut dan melapor kepada pihak berwenang dengan persetujuan sekolah
            jika ada yang melanggar aturan <Bold>Kode Etik</Bold> ini.
          </>,
        ],
      },
      {
        h: "Ruang Lingkup",
        p: "Berlaku pada situs web, interaksi repositori (issues, PR), dan kanal komunitas terkait.",
      },
    ],
  },
};

export function CodeOfConductPage() {
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
    document.title = `${CODE_OF_CONDUCT[lang].title} · NeoSKI`;
  }, [lang]);

  const content = CODE_OF_CONDUCT[lang];

  return (
    <>
      <Header sticky scrollThreshold={0} className="bg-none bg-transparent" />
      <main id="code-of-conduct" className="min-h-screen bg-gray-50 dark:bg-background text-gray-800 dark:text-gray-100 pt-10">
        <div className="max-w-4xl mx-auto px-8 md:px-6 lg:px-4 py-12 leading-[1.75]">
          {langParam
            ? <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{content.title}</h1>
            : (
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold mb-1">{content.title}</h1>
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">{lang === "id" ? "Kode Etik Proyek" : "Project Code of Conduct"}</p>
                </div>
                <SimpleLangSwitch lang={lang} setLang={(l) => setLang(l)} />
              </div>
            )
          }

          {content.sections.map((s, i) => (
            <section key={i} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{s.h}</h2>
              {Array.isArray(s.p) ? (
                <ul className="list-disc pl-8 mt-2 text-gray-700 dark:text-[#d1d5dc]">
                  {s.p.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              ) : (
                <div className="text-gray-700 dark:text-[#d1d5dc]">{s.p}</div>
              )}
            </section>
          ))}

          <section className="mb-6 text-gray-700 dark:text-[#d1d5dc]">
            <div className="mt-6 px-2 flex justify-center">
              <a
                href={codeOfConduct.external.en}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
              >
                <i className="bx bx-book-open text-2xl mr-2" />
                <span className="inline-block text-sm text-center whitespace-normal break-words">
                  {lang === "id"
                    ? <strong>Lihat Kode Etik lengkap</strong>
                    : <strong>View the full Code of Conduct</strong>}
                  <ExternalLinkIcon className="inline w-3 h-3 ml-1" />
                </span>
              </a>
            </div>
          </section>

          <hr className="border-t-3 border-gray-200 dark:border-gray-800 mb-6" />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CodeOfConductPageLoader() {
  // get the URL segment
  const { lang: langParam } = useParams();

  if (langParam && !SUPPORTED_LANG.includes(langParam as Lang)) {
    console.warn(`Language "${langParam}" is not supported.`);
    console.log(`Redirecting to "${codeOfConduct.internal}"...`);
    // Redirect to page that supports switching language
    return <Navigate to={codeOfConduct.internal} />;
  }

  return <CodeOfConductPage />;
}
