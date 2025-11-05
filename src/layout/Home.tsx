import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame } from "lucide-react";
import { motion } from "framer-motion";
import { unified } from 'unified';
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/utils";
import { GradientButton, Section } from "@/lib/motion-anim";
import Article from "@/lib/Article";
import FocusableCard from "@/lib/FocusableCard";
import { unify } from "@/lib/markparser";
import { remarkSlugFromHeading, type Heading } from "@/lib/plugins/remark/remark-slug-from-heading";
import { extractSections } from '@/utils/article';
import Hero from './Hero';
import CreateErrorPage from './ErrorPage';

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
import InstagramEmbed from "./InstagramEmbed";

// Featured Articles
import featuredArticles from '@/articles/featured-articles.json';
import ArticleBackground from "./ArticleBackground";

const ARTICLE_PROSE_CLASS =
  'prose prose-indigo dark:prose-invert ' +
  'prose-a:text-blue-700 dark:prose-a:text-blue-400 prose-a:no-underline prose-a:hover:underline prose-a:hover:underline-offset-4 ' +
  'prose-ul:list-disc prose-ol:list-decimal ' +
  'prose-ul:marker:text-gray-700 dark:prose-ul:marker:text-white/80 prose-ol:marker:text-gray-700 dark:prose-ol:marker:text-white/80 ' +
  'prose-ul:text-gray-700 dark:prose-ul:text-white/80 prose-ol:text-gray-700 dark:prose-ol:text-white/80 ' +
  'prose-ol:pl-10 prose-ul:pl-10';

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
            className={`${i === 0 ? 'pt-10 lg:pt-30' : ''} ${i === sections.length - 1 ? 'pb-20 lg:pb-40' : ''}`}
          >
            <Article id={id} content={section} className={ARTICLE_PROSE_CLASS} />
          </Section>
        );
      })}
    </>
  );
}

function InstagramPosts({ urls }: { urls: string[] }) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-h-[60svh] lg:max-h-[70svh] justify-items-center sm:justify-items-between overflow-y-auto p-4 bg-white/10 rounded-md">
          {/* Instagram Embeds */}
          {urls.map(u => <InstagramEmbed key={u.split('/').pop()} url={u} withCaption />)}
        </div>
      </div>
    </ArticleBackground>
  );
}

export default function Home() {
  const badgeCardHoverClass =
    'hover:shadow-xl hover:shadow-orange-400/50 hover:ring-2 hover:ring-orange-500/40 '
    + 'focus:shadow-xl focus:shadow-orange-400/50 focus:ring-2 focus:ring-orange-500/40 focus:outline-none'
    + 'active:shadow-xl active:shadow-orange-400/50 active:ring-2 active:ring-orange-500/40'
  ;

  return (
    <div className="bg-[#D7FFFE]/10 dark:bg-background text-gray-900 dark:text-white/80">
      <Hero />

      {/* Featured Articles Section */}
      <div className="max-w-screen bg-white/90 dark:bg-[#0F1221] pb-30 pt-15 mt-0">
        <Section id="featured-articles">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl text-gray-900 dark:text-white font-bold mb-8 text-center">Artikel Unggulan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 justify-center">
              {featuredArticles.map((article) => (
                <motion.div
                  key={article.title.replace(/\s+/g, '-').toLowerCase()}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <FocusableCard className={`h-full bg-gradient-to-br from-[#FFEFA0]/20 via-[#AFDFDE]/20 to-[#D7FFFE]/20 dark:from-white/10 dark:to-gray-900 shadow-lg dark:shadow-none border-none transition-all duration-300 ease-in-out ${badgeCardHoverClass}`}>
                    {/* Featured Article */}
                    <CardContent className="p-5">
                      {/* Category */}
                      <div className="flex items-center mb-2">
                        {article.category.map((cat, i) => (
                          <Badge key={i} className="mr-2 text-white bg-orange-300/70 dark:bg-orange-400/80">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                      {/* Title */}
                      <h3 className="text-xl text-gray-900 dark:text-white font-semibold mb-2">{article.title}</h3>
                      {/* Description */}
                      <p className="text-gray-600 dark:text-white/80 text-sm mb-4">
                        {Array.isArray(article.description)
                          ? article.description.map(a => a.trim()).join(' ')
                          : typeof article.description === 'string'
                            ? (article.description as string).trim()
                            : article.description
                        }
                      </p>
                      <GradientButton className="mx-auto text-sm text-white">
                        <Link to={article.src}>Baca Selengkapnya</Link>
                      </GradientButton>
                    </CardContent>
                  </FocusableCard>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <InstagramPosts urls={igPosts} />

      {/* Main Articles */}
      <HomeArticle />
    </div>
  );
}
