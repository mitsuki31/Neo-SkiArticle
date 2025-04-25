import Header from "./Header";
import Footer from "./Footer";

interface ErrorPageProps {
  errno?: number;
  message?: string;
  description?: string;
}

function createErrorBody(errno: number, message: string, description: string) {
  return (
    <div className={`text-center py-50 md:py-35 dark:bg-zinc-900 dark:text-white bg-white text-black}`}>
      <h1 className="text-6xl md:text-8xl font-bold mb-5 font-inter">
        <span className="animate-blink">{errno}</span>
      </h1>
      <p className="mt-2 text-lg text-center max-w-3xl mx-auto text-gray-600 dark:text-white/80 leading-8">
        {message}
      </p>
      <p className="mt-10 text-md text-center max-w-md md:max-w-3xl mx-auto text-gray-800 dark:text-white/60 leading-8 opacity-70 italic">
        {description}
      </p>
    </div>
  );
}

export default function CreateErrorPage({
  errno = 404,
  message = 'Halaman tidak ditemukan',
  description = 'Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.'
}: ErrorPageProps) {
  return (
    <>
      <Header className="bg-none bg-gray-100 dark:bg-background" />
      {createErrorBody(errno, message, description)}
      <Footer />
    </>
  );
}