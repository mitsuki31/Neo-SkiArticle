import { TypeAnimation } from 'react-type-animation';
import logoSki from '@/assets/logo_ski.png';
import background from '@/assets/smkski-bg.jpg';

export default function Hero() {
  return (
    <section className="relative w-full pt-2 md:pt-10 overflow-hidden bg-gradient-to-b from-sky-100 to-white dark:from-background dark:to-gray-500/40">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={background}
          alt="Background"
          className="w-full h-full object-cover opacity-40 dark:opacity-30 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/60 via-sky-100/40 to-white/90 dark:from-gray-950/70 dark:via-gray-900/50 dark:to-gray-800/70" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-row items-center justify-between container mx-auto px-8 md:px-16 py-20 gap-12">
        {/* Left side */}
        <div className="flex-1 text-center lg:text-left">
          <img
            src={logoSki}
            alt="Logo SMK Sukamandi"
            className="w-36 lg:w-48 mx-auto lg:mx-0 mb-8"
          />

          <h1 className="text-4xl lg:text-5xl font-bold mb-5 dark:text-white font-inter">
            <TypeAnimation
              sequence={['Selamat Datang di', 5000, '']}
              wrapper="span"
              repeat={Infinity}
            />
            <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
              Website NeoSKI
            </span>
          </h1>

          <p className="mt-8 text-lg max-w-2xl text-gray-900 dark:text-white/80 leading-8">
            Temukan informasi menarik seputar <strong>SMK Sukamandi</strong> — mulai dari
            profil sekolah, sejarah sekolah, kegiatan siswa, hingga program kejuruan
            unggulan kami. Kami hadir untuk membantu siswa dan masyarakat mengenal
            lebih dekat dunia pendidikan vokasi yang inspiratif dan berdaya saing!
          </p>
        </div>

        <div className="relative hidden lg:flex-1 lg:flex items-center justify-center md:justify-end">
          {/* Gradient overlay background */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-100/10 via-sky-100/40 to-sky-200/50 dark:from-gray-400/10 dark:via-gray-600/20 dark:to-gray-800/50 rounded-2xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col text-center lg:text-right px-6 md:px-10 py-12 w-full h-full items-center md:items-end justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white font-inter">
              Jadilah Siswa
              yang{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-600 to-orange-500 bg-clip-text text-transparent">
                <TypeAnimation
                  sequence={['Disiplin', 2000, 'Kreatif', 2000, 'Cerdas', 2000, 'Berakhlak', 2000, '']}
                  wrapper="span"
                  repeat={Infinity}
                />
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
