import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMetaUpdater } from "@/hooks/meta-updater";
import { useScrollToTop } from "@/hooks/scroll-to-top";

type RootLayoutProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  removeDefaultClass?: boolean;
  scrollToTop?: boolean;
}

export default function RootLayout({
  children,
  title,
  className = '',
  removeDefaultClass = false,
  scrollToTop = true
}: RootLayoutProps) {
  document.title = title ?? 'NeoSKI';  // Fallback

  // Hooks
  useMetaUpdater();
  useScrollToTop(scrollToTop);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={`${removeDefaultClass ? '' : 'bg-white-800 dark:bg-background text-gray-900'} ${className}`.trim()}>
        {children}
      </div>
    </HelmetProvider>
  );
}
