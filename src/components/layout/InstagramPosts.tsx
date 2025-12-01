import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/theme";
import ArticleBackground from "./ArticleBackground";
import InstagramEmbed from "./InstagramEmbed";

export default function InstagramPosts({ urls }: { urls: string[] }) {
  const theme = useTheme();
  if (urls.length === 0) return null;

  return (
    <ArticleBackground variant="geometric" containerSize="8xl" darkMode={theme === 'dark'}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-3 md:gap-4">
          <Flame color="#FF4500" size="35" />
          <span className="bg-gradient-to-r from-pink-600 to-orange-400 bg-clip-text text-transparent">
            Instagram Post
          </span>
        </h2>
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10",
          "max-h-[60svh] lg:max-h-[70svh] mx-auto",
          "justify-items-center sm:justify-items-between overflow-y-auto px-4 md:py-10 rounded-xl",
          "bg-gray-900/10 dark:bg-white/10 custom-scrollbar scrollbar-track-gray-300"
        )}>
          {/* Instagram Embeds */}
          {urls.map(u => <InstagramEmbed key={u.split('/').pop()} url={u} withCaption />)}
        </div>
      </div>
    </ArticleBackground>
  );
}
