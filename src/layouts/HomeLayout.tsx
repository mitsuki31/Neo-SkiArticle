import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { unified } from 'unified';
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Section } from "@/components/custom/ui/motion-anim";
import Article from "@/components/layout/Article";
import FocusableCard from "@/components/custom/ui/FocusableCard";
import { unify } from "@/lib/markparser";
import { remarkSlugFromHeading, type Heading } from "@/lib/plugins/remark/remark-slug-from-heading";
import { extractSections } from '@/utils/article';
import Hero from '@/components/layout/Hero';
import CreateErrorPage from './ErrorPageLayout';

// Remark plugins
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkHeadings from '@vcarl/remark-headings';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// Articles
import homeArticle from '@/articles/home/index.md?raw';

// Instagram
import igPosts from '@/assets/ig-posts.json';
import InstagramPosts from '@/components/layout/InstagramPosts';

// Featured Articles
import featuredArticles from '@/articles/featured-articles.json';

const ARTICLE_PROSE_CLASS =
  'prose prose-indigo dark:prose-invert ' +
  'prose-a:text-blue-700 dark:prose-a:text-blue-400 prose-a:no-underline prose-a:hover:underline prose-a:hover:underline-offset-4 ' +
  'prose-ul:list-disc prose-ol:list-decimal ' +
  'prose-ul:marker:text-gray-700 dark:prose-ul:marker:text-white/80 prose-ol:marker:text-gray-700 dark:prose-ol:marker:text-white/80 ' +
  'prose-ul:text-gray-700 dark:prose-ul:text-white/80 prose-ol:text-gray-700 dark:prose-ol:text-white/80 ' +
  'prose-ol:pl-10 prose-ul:pl-10';

function formatDate(input: Date | string): string {
  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("id-ID", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function HomeArticle() {
  const [sections, setSections] = useState<string[] | null>(null);
  const [headingIds, setHeadingIds] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkSlugFromHeading)
      .use(remarkHeadings)
      .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
      .use(remarkRehype, { clobberPrefix: '', allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true })
      // ! WARNING: No HTNL sanitize here, dangerous HTML is allowed
      // !          make sure double check the used markdown file
    ;

    (async () => {
      try {
        const file = await unify(homeArticle, processor);
        const headings = (file.data?.headings ?? []) as Heading[];
        const headingsList = headings.map(h => h.data?.id).filter(Boolean) as string[];
        const secs = extractSections(String(file)) as string[];

        if (!mounted) return;
        setSections(secs);
        setHeadingIds(headingsList);
      } catch (err) {
        if (!mounted) return;
        setError(err as Error);
      }
    })();

    return () => { mounted = false; };
  }, []);

  if (error) {
    return <CreateErrorPage
      errno={500}
      message="Gagal memuat artikel"
      description={error.message}
    />
  }

  // No loading animation, because the content are loaded in prebuild
  // In other words, it will never be empty
  if (!sections) return null;

  return (
    <>
      {sections.map((section, i) => {
        const id = headingIds[i] ?? undefined;
        return (
          <Section
            key={id ?? `sec-${i}`}
            id={/tentang/i.test(id) ? 'about' : undefined}
            className={`${i === 0 ? 'pt-10 lg:pt-30' : ''} ${i === sections.length - 1 ? 'pb-20 lg:pb-40' : ''}`}
          >
            <Article id={id} content={section} className={ARTICLE_PROSE_CLASS} />
          </Section>
        );
      })}
    </>
  );
}

export default function Home() {
  const badgeCardHoverClass = cn(
    'hover:shadow-xl hover:shadow-orange-400/50 hover:ring-2 hover:ring-orange-500/40',
    'focus:shadow-xl focus:shadow-orange-400/50 focus:ring-2 focus:ring-orange-500/40 focus:outline-none',
    'active:shadow-xl active:shadow-orange-400/50 active:ring-2 active:ring-orange-500/40',
    'dark:hover:shadow-xl dark:hover:shadow-orange-400/50 dark:hover:ring-2 dark:hover:ring-orange-500/40',
    'dark:focus:shadow-xl dark:focus:shadow-orange-400/50 dark:focus:ring-2 dark:focus:ring-orange-500/40 dark:focus:outline-none',
    'dark:active:shadow-xl dark:active:shadow-orange-400/50 dark:active:ring-2 dark:active:ring-orange-500/40'
  );
  const articleCardBg_light = "bg-linear-[135deg,#5B86E5_10%,#8BA8E799,#E0C2A099,#F0A23D99_80%,#FF7E0099]";
  const articleCardBg_dark = "dark:bg-linear-[135deg,#0A1D4B,#294D7E99,#71478D99,#CC7A3399_85%,#FF950099]";
  const articleCardBg = `${articleCardBg_light} ${articleCardBg_dark}`;

  const getColSpan = (colspan: number): `lg:col-span-${number}` => {
    if (colspan > 3) return 'lg:col-span-3';
    switch (colspan) {
      case 1: return 'lg:col-span-1';
      case 2: return 'lg:col-span-2';
      case 3: return 'lg:col-span-3';
      default: return 'lg:col-span-1';
    }
  }

  return (
    <div className="bg-[#D7FFFE]/10 dark:bg-background text-gray-900 dark:text-white/80">
      <Hero />

      {/* Featured Articles Section */}
      <div id="featured-articles" className={`max-w-screen pb-30 pt-15 mt-0 ${articleCardBg}`}>
        <div className="group flex flex-col items-center relative pt-5">
          <h1 className={cn(
            "absolute text-7xl md:text-8xl uppercase text-center font-bold text-transparent select-none",
            "[-webkit-text-stroke:2px_rgba(17,24,39,0.1)]",
            "dark:[-webkit-text-stroke:2px_rgba(255,255,255,0.1)]"
          )}>
            ARTIKEL UNGGULAN
          </h1>
          <div className="relative flex flex-col items-center mt-10 md:mt-15">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">Artikel Unggulan</h1>
            <div className="w-[45%] group-hover:w-[100%] group-active:w-[100%] group-focus:w-[100%] transition-[width] duraiton-[1.2s] ease h-[4px] bg-orange-600 rounded-full mt-2"></div>
          </div>
        </div>
        <Section id="featured-articles-container">
          <div className={cn(
            "mx-auto lg:mx-0 mt-15 px-6 pt-10 lg:pt-0 max-w-2xl lg:max-w-none",
            `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${featuredArticles.length < 3 ? 'lg:grid-cols-2' : ''} gap-8`
          )}>
            {featuredArticles.map((article, idx) => (
              <motion.div
                key={article.title.replace(/\s+/g, '-').toLowerCase()}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={cn("group", getColSpan(article.colspan ?? 1))}
              >
                <FocusableCard className={`h-full bg-white/1 dark:bg-gray-800/1 border-none backdrop-blur-[100px] shadow-lg transition-all duration-300 ease-in-out ${badgeCardHoverClass}`}>
                  {/* Featured Article */}
                  <CardContent className="p-5">
                    <article className={`flex max-w-xl flex-col items-start justify-between`}>
                      <div className="flex flex-col items-center gap-x-4 gap-y-1.5 text-xs">
                        <time dateTime={article.date} className="self-start text-gray-600 dark:text-gray-300">{formatDate(article.date)}</time>
                        {/* Category */}
                        <div className="flex flex-wrap items-center gap-2">
                          {article.category.map((cat, i) => (
                            <Badge key={i} className="text-gray-900 font-semibold bg-gradient-to-r from-[#FF9951] via-orange-400 to-[#FF8867]">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="relative grow">
                        <h3 className={cn(
                          "mt-3 text-lg/6 font-semibold text-gray-900 dark:text-white",
                          "group-hover:text-orange-700 dark:group-hover:text-orange-300",
                          "group-focus:text-orange-700 dark:group-focus:text-orange-300",
                          "group-active:text-orange-700 dark:group-active:text-orange-300",
                        )}>
                          <a href={article.href}>
                            <span className="absolute inset-0"></span>
                            {article.title}
                          </a>
                        </h3>
                        <p className="mt-5 text-sm/6 text-gray-800 dark:text-white/80 md:not-group-hover:line-clamp-4">
                          {article.description.map(a => a.trim()).join(' ')}
                        </p>
                      </div>
                    </article>
                  </CardContent>
                </FocusableCard>
                {idx !== featuredArticles.length - 1 && (
                  <hr className="md:hidden mt-8 border-gray-300 dark:border-gray-700" />
                )}
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      <InstagramPosts urls={igPosts} />

      {/* Main Articles */}
      <HomeArticle />
    </div>
  );
}
