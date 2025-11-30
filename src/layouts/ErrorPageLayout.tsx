import { useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, CopyCheck, CopyXIcon, Home, SearchX } from "lucide-react";
import RootLayout from "@/components/layout/Root";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

interface ErrorPageProps {
  errno?: number;
  message?: string;
  description?: string;
}

function ErrorBody({ errno, message, description }: Required<ErrorPageProps>) {
  const copyDetailsRef = useRef<HTMLButtonElement>(null);

  const copyDetails = async function () {
    let hasError = false;
    try {
      const url = new URL(location.pathname, location.origin).toString();
      await navigator.clipboard.writeText(
        `Error ${errno}: ${message}\n\nURL: ${url}\n${description}`
      );
    } catch {
      hasError = true;
      // no throw
    }

    if (!copyDetailsRef.current) return;

    const copyIcon = ReactDOMServer.renderToStaticMarkup(
      <Copy className="w-4 h-4" />
    );
    const copyCheckIcon = ReactDOMServer.renderToStaticMarkup(
      <CopyCheck className="w-4 h-4 text-green-600" />
    );
    const copyXIcon = ReactDOMServer.renderToStaticMarkup(
      <CopyXIcon className="w-4 h-4 text-red-600" />
    );

    while (copyDetailsRef.current.hasChildNodes()) {
      copyDetailsRef.current.removeChild(copyDetailsRef.current.firstChild!);
    }
    copyDetailsRef.current.innerHTML = `${hasError ? copyXIcon : copyCheckIcon} Salin`;

    // Sleep for 3 seconds
    setTimeout(() => {
      if (!copyDetailsRef.current) return;

      while (copyDetailsRef.current.hasChildNodes()) {
        copyDetailsRef.current.removeChild(copyDetailsRef.current.firstChild!);
      }
      copyDetailsRef.current.innerHTML = `${copyIcon} Salin`;
    }, 3000);
  };

  return (
    <main
      role="alert"
      aria-live="assertive"
      className={cn(
        "min-h-screen h-svh flex items-center justify-center p-6",
        "bg-gradient-to-b from-white/60 to-white/30 dark:from-[#071026] dark:to-[#020214]"
      )}
    >
      <section className="relative w-full max-w-4xl">
        {/* Card */}
        <div className={cn(
          "mx-auto rounded-2xl bg-white/60 dark:bg-[#071026]/80 backdrop-blur-md",
          "border border-white/10 dark:border-white/6",
          "shadow-2xl py-12 px-6 md:px-12 text-center"
        )}>
          {/* Icon */}
          <div className={cn(
            "mx-auto mb-6 w-[110px] h-[110px] rounded-full flex items-center justify-center",
            "bg-gradient-to-tr from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-[#1b1550]",
            "ring-1 ring-white/20"
          )}>
            <SearchX className="w-12 h-12 text-indigo-600 dark:text-indigo-300 animate-pulse" />
          </div>

          {/* Error code */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 select-none">
            <span className="inline-block align-middle text-transparent bg-clip-text bg-red-500 animate-blink">
              {errno}
            </span>
          </h1>

          {/* Headline */}
          <h2 className="text-xl md:text-2xl font-medium mb-3 text-gray-900 dark:text-white">
            {message}
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            <em className="opacity-90">{description}</em>
          </p>

          {/* Action buttons */}
          <div className="flex flex-row items-center justify-center gap-3 mt-4">
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={-1 as any}  // We can go back using this trick, but TS won't let it; so be careful
              replace
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer",
                "border border-transparent bg-white/70 hover:bg-white dark:bg-white/4 dark:hover:bg-white/6",
                "text-sm font-medium shadow-sm",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              )}
              aria-label="Kembali"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>

            <Link
              to="/"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer",
                "bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium shadow-sm",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              )}
              aria-label="Kembali ke Beranda"
            >
              <Home className="w-4 h-4" />
              Beranda
            </Link>

            <button
              ref={copyDetailsRef}
              onClick={copyDetails}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer",
                "border border-gray-200 dark:border-white/6 bg-white/50 dark:bg-transparent",
                "text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/4",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
              )}
              aria-label="Salin detail error"
              title="Salin detail error ke papan klip"
            >
              <Copy className="w-4 h-4" />
              Salin
            </button>
          </div>

          {/* Optional small hint/footer */}
          <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            Jika ini terus menerus terjadi, silakan laporkan dengan langkah untuk memperbaiki.
            <span className="block mt-1"><code className="px-2 py-0.5 rounded bg-white/60 dark:bg-white/5 text-xs">Kode error: {errno}</code></span>
          </div>
        </div>

        {/* Decorative faint background text to the left/right for personality */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="hidden md:block text-[120px] font-extrabold text-black/3 dark:text-white/3 select-none transform translate-y-24">
            ERROR
          </span>
        </div>
      </section>
    </main>
  );
}

export default function CreateErrorPage({
  errno = 404,
  message = 'Halaman tidak ditemukan',
  description = 'Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.'
}: ErrorPageProps) {
  return (
    <RootLayout removeDefaultClass className="dark:bg-background dark:text-white bg-white-700 text-black">
      <Header className="bg-none bg-transparent" sticky scrollThreshold={0} />
      <ErrorBody errno={errno} message={message} description={description} />
      <Footer />
    </RootLayout>
  );
}
