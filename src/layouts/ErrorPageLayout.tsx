import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface ErrorPageProps {
  errno?: number;
  message?: string;
  description?: string;
}

function createErrorBody(errno: number, message: string, description: string) {
  return (
    <div className="flex flex-col items-center justify-center h-svh text-center dark:bg-zinc-900 dark:text-white bg-white text-black">
      <h1 className="text-6xl md:text-8xl font-bold mb-5 font-inter">
        <span className="animate-blink">{errno}</span>
      </h1>

      <p className="mt-2 text-lg max-w-3xl mx-auto text-gray-600 dark:text-white/80 leading-8">
        {message}
      </p>

      <p className="mt-6 text-md max-w-md md:max-w-3xl mx-auto text-gray-800 dark:text-white/60 leading-8 opacity-70 italic">
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
      <Header className="bg-none bg-white dark:bg-background" sticky scrollThreshold={0} />
      {createErrorBody(errno, message, description)}
      <Footer />
    </>
  );
}