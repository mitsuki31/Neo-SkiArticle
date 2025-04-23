export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
