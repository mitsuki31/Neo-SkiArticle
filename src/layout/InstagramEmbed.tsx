import { useEffect } from "react";
import { loadScriptOnce } from "@/lib/socialEmbeds";

interface InstagramEmbedProps {
  url: string;
  withCaption?: boolean;
  className?: string;
  id?: string;
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      }
    }
  }
}

export default function InstagramEmbed({
  url,
  withCaption = false,
  className = ''
}: InstagramEmbedProps) {
  useEffect(() => {
    const initEmbed = async () => {
      try {
        await loadScriptOnce("https://www.instagram.com/embed.js");
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      } catch (error) {
        console.error("Failed to load Instagram embed script", error);
      }
    };

    initEmbed();
  }, [url]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: `
          <blockquote class="instagram-media" ${withCaption ? 'data-instgrm-captioned' : ''} data-instgrm-permalink="${url}" data-instgrm-version="14"></blockquote>
        `,
      }}
    />
  );
}
