export default function Layout({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
