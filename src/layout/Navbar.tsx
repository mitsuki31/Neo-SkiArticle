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
  instagram as instagramUrl
} from "@/assets/global-urls.json";
import { cn } from '@/lib/utils';

const navMenuTriggerStyle = `
  group inline-flex h-9 w-max items-center justify-center rounded-md
  bg-transparent px-4 py-2 text-sm font-medium transition-colors
  text-gray-900 dark:text-gray-100
  dark:hover:bg-zinc-600 dark:hover:text-orange-400
  dark:focus-visible:bg-zinc-600 dark:focus-visible:text-orange-400
  dark:active:bg-zinc-600 dark:active:text-orange-400
  focus:outline-none disabled:pointer-events-none disabled:opacity-50
`.replace(/[\s\n]+/g, ' ').trim();

const menuItemTransparentBlur = [
  "transition-colors",
  "duration-200",
  "bg-transparent",
  "backdrop-blur-md",
  "hover:text-orange-600",
  "dark:hover:text-orange-400",
  "hover:bg-white/20",
  "dark:hover:bg-white/10",
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
  "rounded-lg",
  "px-3",
  "py-2",
  "cursor-pointer",
].join(' ');


export default function Navbar() {
  const youtubeHoverColor = `
    transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
    hover:from-red-500 hover:to-orange-400
    focus:text-transparent focus:bg-clip-text
    focus:bg-gradient-to-r focus:from-red-500 focus:to-orange-400
  `.replace(/[\n\s]+/g, ' ').trim();
  const instagramHoverColor = `
    transition-all duration-300
    hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
    hover:from-pink-500 hover:via-purple-500 hover:to-yellow-500
    focus:text-transparent focus:bg-clip-text focus:bg-gradient-to-r
    focus:from-pink-500 focus:via-purple-500 focus:to-yellow-500
    dark:hover:from-pink-400 dark:hover:via-purple-400 dark:hover:to-orange-400
    dark:focus:from-pink-400 dark:focus:via-purple-400 dark:focus:to-orange-400
  `.replace(/[\n\s]+/g, ' ').trim();

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
          {/* Use the Trigger provided by the library (it renders the correct button) */}
          <NavigationMenuTrigger className={cn(navMenuTriggerStyle, menuItemTransparentBlur)}>
            <span className="inline-flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Sosial</span>
            </span>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            {/* Content — plain anchor elements */}
            <div className="grid gap-1 w-[200px]">
              <a href={instagramUrl} target="_blank" rel="noreferrer" className={cn("px-3 py-2 rounded-md block hover:bg-gray-100 dark:hover:bg-zinc-800 border-b", instagramHoverColor)}>
                <i className="bx bxl-instagram mr-2" /> Instagram
              </a>
              <a href={youtubeUrl} target="_blank" rel="noreferrer" className={cn("px-3 py-2 rounded-md block hover:bg-gray-100 dark:hover:bg-zinc-800", youtubeHoverColor)}>
                <i className="bx bxl-youtube mr-2" /> YouTube
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Theme toggle — explicit entry */}
        <NavigationMenuItem>
          <div className="px-2">
            <ThemeToggle
              className="mr-0 mt-0 cursor-pointer bg-inherit
                         dark:text-gray-100 dark:bg-background
                         border-none hover:bg-black
                         hover:text-background dark:hover:bg-white
                         dark:hover:text-background"
            />
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
