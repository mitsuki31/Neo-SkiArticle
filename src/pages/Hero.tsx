import logoSki from '@/assets/logo_ski.png'

export default function Hero() {
  return (
    <>
      <section className="w-full py-20 bg-gradient-to-b from-sky-100 to-white dark:from-background dark:to-gray-500/40 text-center">
        <img src={logoSki} alt='Logo SMK Sukamandi' className='w-50 mx-auto mb-12' />
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 dark:text-white">
            Selamat Datang di{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
              Artikel SMK Sukamandi
            </span>
          </h1>
          <p className="mt-10 text-lg text-center max-w-3xl mx-auto text-gray-600 dark:text-white/80 leading-8">
            Temukan informasi menarik seputar <strong>SMK Sukamandi</strong> — mulai dari profil sekolah, kegiatan siswa, hingga program kejuruan unggulan kami. Kami hadir untuk membantu siswa dan masyarakat mengenal lebih dekat dunia pendidikan vokasi yang inspiratif dan berdaya saing!
          </p>
          {/* <Button variant="default" className="text-lg px-6 py-2"> */}
          {/*   Mulai Membaca */}
          {/* </Button> */}
        </div>
      </section>
    </>
  );
}
