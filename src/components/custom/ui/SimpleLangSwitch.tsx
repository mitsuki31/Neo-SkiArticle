type SimpleLangSwitchProps = {
  lang: "en" | "id";
  setLang: (l: "en" | "id") => void;
}

/**
 * A simple language switch component.
 * Supports English and Indonesian languages only.
 *
 * @param props - React component props
 * @param props.lang - The current language
 * @param props.setLang - A function to set the language
 *
 * @returns A JSX element representing the language switch component
 *
 * @example
 * ```ts
 * const [lang, setLang] = useState("en");
 * return <SimpleLangSwitch lang="en" setLang={(l) => setLang(l)} />
 * ```
 */
export default function SimpleLangSwitch({ lang, setLang }: SimpleLangSwitchProps) {
  const setAndPersist = (l: "en" | "id") => {
    try {
      localStorage.setItem("preferred-lang", l);
    } catch { /* ignore storage errors */ }
    setLang(l);
    document.documentElement.lang = l === "id" ? "id" : "en";
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="sr-only">Language selector</span>
      <button
        aria-pressed={lang === "en"}
        onClick={() => setAndPersist("en")}
        className={`px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
          lang === "en"
            ? "bg-orange-600 text-white font-semibold"
            : "bg-transparent text-gray-700 dark:text-gray-300 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        title="English"
      >
        EN
      </button>
      <button
        aria-pressed={lang === "id"}
        onClick={() => setAndPersist("id")}
        className={`px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
          lang === "id"
            ? "bg-orange-600 text-white font-semibold"
            : "bg-transparent text-gray-700 dark:text-gray-300 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        title="Bahasa Indonesia"
      >
        ID
      </button>
    </div>
  );
}
