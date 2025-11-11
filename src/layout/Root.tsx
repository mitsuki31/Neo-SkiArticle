import { Helmet, HelmetProvider } from "react-helmet-async";

type RootLayoutProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  removeDefaultClass?: boolean;
}

export default function RootLayout({ children, title, className, removeDefaultClass }: RootLayoutProps) {
  title ??= 'NeoSKI';
  document.title = title;  // Fallback

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={`${removeDefaultClass ? '' : 'bg-white-800 dark:bg-background text-gray-900'} ${className}`}>
        {children}
      </div>
    </HelmetProvider>
  );
}
