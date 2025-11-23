import { Link, Path } from 'react-router-dom';
import { BookOpenText, Home, Users } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { ExternalLink } from '@/components/custom/ui/ExternalLink';
import ThemeToggle from '@/components/custom/ui/ThemeToggle';
import {
  youtube as youtubeUrl,
  instagram as instagramUrl,
  tiktok as tiktokUrl
} from "@/assets/global-urls.json";
import { cn } from '@/lib/utils';

const navMenuTriggerStyle = cn(
  "group inline-flex h-9 w-max items-center justify-center rounded-md",
  "bg-transparent px-4 py-2 text-sm font-medium transition-colors text-gray-900 dark:text-gray-100",
  "focus:outline-none disabled:pointer-events-none disabled:opacity-50",
);

const menuItemTransparentBlur = cn(
  "rounded-full px-3 py-2 cursor-pointer",
  "transition-colors duration-200",
  "bg-transparent dark:bg-transparent focus:bg-transparent active:bg-transparent backdrop-blur-md",
  "hover:text-orange-600",
  "focus:text-orange-600",
  "active:text-orange-600",
  "dark:hover:text-orange-400",
  "dark:focus:text-orange-400",
  "dark:active:text-orange-400",
  // state=closed
  "data-[state=closed]:bg-transparent",
  "data-[state=closed]:hover:bg-transparent",
  "data-[state=closed]:focus:bg-transparent",
  "data-[state=closed]:active:bg-transparent",
  "data-[state=closed]:dark:hover:bg-transparent",
  "data-[state=closed]:dark:focus:bg-transparent",
  "data-[state=closed]:dark:active:bg-transparent",
  // state=open
  "data-[state=open]:bg-transparent",
  "data-[state=open]:hover:bg-transparent",
  "data-[state=open]:focus:bg-transparent",
  "data-[state=open]:active:bg-transparent",
  "data-[state=open]:dark:hover:bg-transparent",
  "data-[state=open]:dark:focus:bg-transparent",
  "data-[state=open]:dark:active:bg-transparent",
  "data-[state=open]:text-orange-600",
  "data-[state=open]:hover:text-orange-600",
  "data-[state=open]:focus:text-orange-600",
  "data-[state=open]:active:text-orange-600",
  "data-[state=open]:dark:hover:text-orange-400",
  "data-[state=open]:dark:focus:text-orange-400",
  "data-[state=open]:dark:active:text-orange-400",
);

type NavMenu = {
  name: string;
  icon?: React.ReactElement;
  logoClass?: string;
  to?: string | Partial<Path>;
  submenu?: (Omit<NavMenu, "to" | "submenu"> & {
    href: string;
    hoveredClass: string;
  })[];
};

const navMenus: NavMenu[] = [
  { name: 'Beranda', to: '/', icon: <Home className="w-4 h-4" /> },
  {
    name: 'Sosial',
    icon: <Users className="w-4 h-4" />,
    submenu: [
      {
        name: 'YouTube',
        href: youtubeUrl,
        logoClass: 'bx bxl-youtube',
        hoveredClass: cn(
          "before:bg-gradient-to-r before:from-[#000000] before:via-[#FF0000] before:to-[#EE0000]",
          "focus:before:bg-gradient-to-r focus:before:from-[#000000] focus:before:via-[#FF0000] focus:before:to-[#EE0000]",
          "focus:outline-none",
          "focus-visible:ring-0"
        )
      },
      {
        name: 'Instagram',
        href: instagramUrl,
        logoClass: 'bx bxl-instagram',
        hoveredClass: cn(
          "before:bg-gradient-to-r before:from-[#F58529] before:via-[#DD2A7B] before:to-[#8134AF]",
          "focus:outline-none",
          "focus-visible:ring-0"
        )
      },
      {
        name: 'TikTok',
        href: tiktokUrl,
        logoClass: 'bx bxl-tiktok',
        hoveredClass: cn(
          "before:bg-gradient-to-r before:from-[#69C9D0] before:via-[#000000] before:to-[#EE1D52]",
          "focus:outline-none",
          "focus-visible:ring-0"
        )
      },
    ],
  },
  { name: 'Histori', to: '/a/sejarah-sekolah', icon: <BookOpenText className="w-4 h-4" /> },
];


export default function Navbar() {
  const menuHoverClass = cn(
    "group-hover:text-white group-hover:font-semibold",
    "group-focus:text-white group-focus:font-semibold",
  );
  const animatedBg = cn(
    "relative before:z-10",
    "before:content-[''] before:absolute before:inset-0",
    "before:origin-left before:scale-x-0 before:opacity-20 hover:before:opacity-100 hover:before:scale-x-100",
    "before:transition before:duration-300",
  );

  return (
    <NavigationMenu id="navbar" role="navigation">
      <NavigationMenuList className="hidden md:flex items-center">
        {navMenus.map((menu, idx) => (
          <NavigationMenuItem key={`navmenu-${idx + 1}`}>
            {menu.to ? (
              <Link to={menu.to} className={cn(navMenuTriggerStyle, menuItemTransparentBlur)}>
                <span className="inline-flex items-center gap-2">
                  {menu.icon ? menu.icon : (
                    menu.logoClass ? <i className={cn(menu.logoClass, "text-[1.3rem]")} /> : null
                  )}
                  <span>{menu.name}</span>
                </span>
              </Link>
            ) : menu.submenu ? (
              <>
                <NavigationMenuTrigger className={cn(navMenuTriggerStyle, menuItemTransparentBlur)}>
                  <span className="inline-flex items-center gap-2">
                    {menu.icon ? menu.icon : (
                      menu.logoClass ? <i className={cn(menu.logoClass, "text-[1.3rem]")} /> : null
                    )}
                    <span>{menu.name}</span>
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1 w-[200px]">
                    {menu.submenu.map((subMenu, i) => (
                      <ExternalLink newTab tabIndex={0} key={i * Math.random()} href={subMenu.href} className={cn(
                        "group px-3 py-3 rounded-md block border-b",
                        animatedBg,
                        subMenu.hoveredClass
                      )}>
                        <span className="relative z-10 flex text-base leading-0 items-center gap-x-2">
                          <span className={menuHoverClass}>
                            {subMenu.icon ? subMenu.icon : (
                              subMenu.logoClass ? <i className={cn(subMenu.logoClass, "text-[1.2rem]")} /> : null
                            )}
                          </span>
                          <span className={menuHoverClass}>{subMenu.name}</span>
                        </span>
                      </ExternalLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </>
            ) : null}
          </NavigationMenuItem>
        ))}
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
