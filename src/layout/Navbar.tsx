import { Link } from 'react-router-dom';
import { Home, Info, Users } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import ThemeToggle from '@/lib/ThemeToggle';
import {
  youtube as youtubeUrl,
  instagram as instagramUrl,
  tiktok as tiktokUrl
} from "@/assets/global-urls.json";
import { cn } from '@/lib/utils';

const navMenuTriggerStyle = cn(
  "group inline-flex h-9 w-max items-center justify-center rounded-md",
  "bg-transparent px-4 py-2 text-sm font-medium transition-colors text-gray-900 dark:text-gray-100",
  "dark:hover:bg-zinc-600 dark:hover:text-orange-400",
  "dark:focus-visible:bg-zinc-600 dark:focus-visible:text-orange-400",
  "dark:active:bg-zinc-600 dark:active:text-orange-400",
  "focus:outline-none disabled:pointer-events-none disabled:opacity-50",
);

const menuItemTransparentBlur = cn(
  "rounded-full px-3 py-2 cursor-pointer",
  "transition-colors duration-200",
  "bg-transparent backdrop-blur-md",
  "hover:text-orange-600 hover:bg-white/20",
  "dark:hover:text-orange-400 dark:hover:bg-white/10",
  // state=open
  "data-[state=open]:bg-white/20",
  "data-[state=open]:hover:bg-white/20",
  "data-[state=open]:focus:bg-white/20",
  "data-[state=open]:active:bg-white/20",
  "data-[state=open]:dark:bg-white/20",
  "data-[state=open]:dark:hover:bg-white/20",
  "data-[state=open]:dark:focus:bg-white/20",
  "data-[state=open]:dark:active:bg-white/20",
  "data-[state=open]:hover:text-orange-600",
  "data-[state=open]:dark:hover:text-orange-400",
);


export default function Navbar() {
  const youtubeHoverColor = cn(
    "transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r",
    "hover:from-red-500 hover:to-orange-400",
    "focus:text-transparent focus:bg-clip-text",
    "focus:bg-gradient-to-r focus:from-red-500 focus:to-orange-400",
  );
  const instagramHoverColor = cn(
    "transition-all duration-300",
    "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r",
    "hover:from-pink-500 hover:via-purple-500 hover:to-yellow-500",
    "focus:text-transparent focus:bg-clip-text focus:bg-gradient-to-r",
    "focus:from-pink-500 focus:via-purple-500 focus:to-yellow-500",
    "dark:hover:from-pink-400 dark:hover:via-purple-400 dark:hover:to-orange-400",
    "dark:focus:from-pink-400 dark:focus:via-purple-400 dark:focus:to-orange-400",
  );
  const tiktokHoverColor = cn(
    "transition-all duration-300",
    "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r",
    "hover:from-cyan-400 hover:via-fuchsia-500 hover:to-red-500",
    "focus:text-transparent focus:bg-clip-text focus:bg-gradient-to-r",
    "focus:from-cyan-400 focus:via-fuchsia-500 focus:to-red-500",
    "dark:hover:from-cyan-300 dark:hover:via-pink-400 dark:hover:to-red-400",
    "dark:focus:from-cyan-300 dark:focus:via-pink-400 dark:focus:to-red-400",
  );

  return (
    <NavigationMenu id="navbar">
      <NavigationMenuList className="hidden md:flex items-center">
        {/* Home */}
        <NavigationMenuItem>
          <Link to="/" className={cn(navMenuTriggerStyle, menuItemTransparentBlur)}>
            <span className="inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </span>
          </Link>
        </NavigationMenuItem>

        {/* About */}
        <NavigationMenuItem>
          <Link to="/about" className={cn(navMenuTriggerStyle, menuItemTransparentBlur)}>
            <span className="inline-flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Tentang</span>
            </span>
          </Link>
        </NavigationMenuItem>

        {/* Sosial dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(navMenuTriggerStyle, menuItemTransparentBlur)}>
            <span className="inline-flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Sosial</span>
            </span>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            {/* Content — plain anchor elements */}
            <div className="grid gap-1 w-[200px]">
              <a href={instagramUrl} target="_blank" rel="noreferrer" className={cn(
                "px-3 py-2 rounded-md block hover:bg-gray-100 dark:hover:bg-zinc-800 border-b",
                instagramHoverColor
              )}>
                <i className="bx bxl-instagram mr-2" /> Instagram
              </a>
              <a href={youtubeUrl} target="_blank" rel="noreferrer" className={cn(
                "px-3 py-2 rounded-md block hover:bg-gray-100 dark:hover:bg-zinc-800 border-b",
                youtubeHoverColor
              )}>
                <i className="bx bxl-youtube mr-2" /> YouTube
              </a>
              <a href={tiktokUrl} target="_blank" rel="noreferrer" className={cn(
                "px-3 py-2 rounded-md block hover:bg-gray-100 dark:hover:bg-zinc-800",
                tiktokHoverColor
              )}>
                <i className="bx bxl-tiktok mr-2" /> TikTok
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Theme toggle — explicit entry */}
        <NavigationMenuItem>
          <div className='mr-4'>
            <ThemeToggle className={cn(
              "mr-0 mt-0 cursor-pointer bg-transparent border-none rounded-full",
              "hover:bg-black hover:text-background",
              "dark:text-gray-100 dark:hover:bg-white dark:hover:text-background",
            )} />
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
