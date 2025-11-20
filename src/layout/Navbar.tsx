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
  const youtubeHoverColor =
    "before:bg-gradient-to-r before:from-[#000000] before:via-[#FF0000] before:to-[#EE0000]";
  const instagramHoverColor =
    "before:bg-gradient-to-r before:from-[#F58529] before:via-[#DD2A7B] before:to-[#8134AF]";
  const tiktokHoverColor =
    "before:bg-gradient-to-r before:from-[#69C9D0] before:via-[#000000] before:to-[#EE1D52]";

  const menuHoverClass = cn(
    "group-hover:text-white group-hover:font-semibold",
    "group-focus:text-white group-focus:font-semibold",
  );
  const animatedBg = cn(
    "relative before:z-10",
    "before:content-[''] before:absolute before:inset-0",
    "before:origin-left before:scale-x-0 before:opacity-20 hover:before:opacity-100 hover:before:scale-x-100 before:transition before:duration-300",
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
          <Link to={{ pathname: "/", hash: "#about" }} className={cn(navMenuTriggerStyle, menuItemTransparentBlur)}>
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
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={cn(
                "group px-3 py-2 rounded-md block border-b",
                animatedBg,
                instagramHoverColor
              )}>
                <span className="relative z-10 flex items-center">
                  <span className={menuHoverClass}><i className="bx bxl-instagram mr-2" /></span>
                  <span className={menuHoverClass}>Instagram</span>
                </span>
              </a>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={cn(
                "group px-3 py-2 rounded-md blockborder-b",
                animatedBg,
                youtubeHoverColor
              )}>
                <span className="relative z-10 flex items-center">
                  <span className={menuHoverClass}><i className="bx bxl-youtube mr-2" /></span>
                  <span className={menuHoverClass}>YouTube</span>
                </span>
              </a>
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className={cn(
                "group px-3 py-2 rounded-md block",
                animatedBg,
                tiktokHoverColor
              )}>
                <span className="relative z-10 flex items-center">
                  <span className={menuHoverClass}><i className="bx bxl-tiktok mr-2" /></span>
                  <span className={menuHoverClass}>TikTok</span>
                </span>
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
