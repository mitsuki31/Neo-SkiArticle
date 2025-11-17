import { addClassToSVG } from '@/lib/utils';
import {
  instagram as instagramUrl,
  youtube as youtubeUrl,
  github_repo as githubUrl,
} from '@/assets/global-urls.json';
import logoSki from '@/assets/logo_ski.png';

// Icons
import instagramIcon from '@icons/instagram.svg?raw';
import youtubeIcon from '@icons/youtube.svg?raw';
import githubIcon from '@icons/github.svg?raw';
import reactIcon from '@icons/react.svg?raw';
import viteIcon from '@icons/vite.svg?raw';

export default function Footer() {
  const instagramIconHoverClass = 'hover:text-pink-600 focus:text-pink-600 active:text-pink-600';
  const youtubeIconHoverClass = 'hover:text-red-600 focus:text-red-600 active:text-red-600';
  const githubIconHoverClass = 'hover:text-black focus:text-black active:text-black dark:hover:text-white dark:focus:text-white dark:active:text-white';
  const underlineCls = `
    hover:underline hover:underline-offset-4
    focus:underline focus:underline-offset-4
    active:underline active:underline-offset-4
    hover:font-bold focus:font-bold active:font-bold
    dark:hover:decoration-orange-400
    dark:focus:decoration-orange-400
    dark:active:decoration-orange-400
    hover:decoration-2 focus:decoration-2 active:decoration-2
  `.replace(/[\n\s]+/g, ' ').trim();

  return (
    <footer className="bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-8 px-5">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 xs:pt-2 pb-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:justify-items-center-safe">
        <div className="flex gap-2">
          {/* This logo will appear on smaller screens and larger screens, but will hidden on medium screens */}
          <img src={logoSki} alt="Logo SMK Sukamandi" className='w-20 h-20 lg:w-24 lg:h-24 my-auto mr-6 xs:block md:hidden lg:block' />
          <div>
            {/* This logo will appear only on medium screens */}
            <img src={logoSki} alt="Logo SMK Sukamandi" className='w-20 h-20 ml-2 mb-4 block xs:hidden md:block lg:hidden' />
            <h2 className="text-xl font-bold mb-4">SMK Sukamandi</h2>
            <p className="text-sm">
              Tempat membangun masa depan dengan pendidikan kejuruan berkualitas dan karakter unggul.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase mb-3">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/#about" className={underlineCls}>Tentang Sekolah</a></li>
            <li><a href="/a/program-keahlian" className={underlineCls}>Program Keahlian</a></li>
            {/* <li><a href="#fasilitas" className={underlineCls}>Fasilitas</a></li> */}
            <li><a href="/a/pelatihan-vokasi-2025" className={underlineCls}>Pelatihan Vokasi 2025</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase mb-3">Lainnya</h3>
          <ul className="space-y-2 text-sm">
            {/* <li><a href="#" className="hover:underline">Berita</a></li> */}
            {/* <li><a href="#" className="hover:underline">Galeri</a></li> */}
            <li><a href="https://smksukamandi.online" target="_blank" rel="noopener noreferrer" className={underlineCls}>PPDB</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase mb-3">Ikuti Kami</h3>
          <div className="flex space-x-4">
            {/* Instagram */}
            <a href={instagramUrl} aria-label="Instagram" title='Instagram SMK Sukamandi' target="_blank" rel="noopener noreferrer">
              <span dangerouslySetInnerHTML={{ __html: addClassToSVG(instagramIcon, `w-6 h-6 transition duration-300 text-gray-500 ${instagramIconHoverClass}`) }} />
            </a>
            {/* YouTube */}
            <a href={youtubeUrl} aria-label="YouTube" title='YouTube SMK Sukamandi' target="_blank" rel="noopener noreferrer">
              <span dangerouslySetInnerHTML={{ __html: addClassToSVG(youtubeIcon, `w-6 h-6 transition duration-300 text-gray-500 ${youtubeIconHoverClass}`) }} />
            </a>
            {/* GitHub */}
            <a href={githubUrl} aria-label="GitHub" title='GitHub Repository' target="_blank" rel="noopener noreferrer">
              <span dangerouslySetInnerHTML={{ __html: addClassToSVG(githubIcon, `w-6 h-6 transition duration-300 text-gray-500 ${githubIconHoverClass}`) }} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 pt-0 flex justify-center items-center gap-2 text-md font-bold">
        <span>Built with</span>
        <span className="inline-block w-6 h-6 text-cyan-500 animate-spin-slow">
          <a href="https://react.dev/" aria-label="React" title='React' target="_blank" rel="noopener noreferrer">
            <div dangerouslySetInnerHTML={{ __html: addClassToSVG(reactIcon, 'w-full h-full animate-spin-slow') }} />
          </a>
        </span>
        <span className="inline-block w-6 h-6 text-[#646CFF]">
          <a href="https://vitejs.dev/" aria-label="Vite" title='Vite' target="_blank" rel="noopener noreferrer">
            <div dangerouslySetInnerHTML={{ __html: addClassToSVG(viteIcon, 'w-full h-full') }} />
          </a>
        </span>
      </div>

      <div className="text-center pt-3 pb-6 text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} SMK Sukamandi & DR2E Group. All rights reserved.
        <br />
        <span className="text-gray-500 dark:text-gray-400 italic">
          Developed by{' '}
          <a href="https://github.com/mitsuki31" target="_blank" rel="noopener noreferrer" className='hover:underline'>Dhefa Gusni A. (Ryuu Mitsuki)</a>
        </span>
      </div>
    </footer>
  );
}