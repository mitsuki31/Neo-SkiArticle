import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { enhanceTable } from "@/lib/utils";
import { GradientButton, Section } from "@/lib/motion-anim";
import Article from "@/lib/Article";
import FocusableCard from "@/lib/FocusableCard";
import { parseMarkdown } from "@/lib/markparser";
import { Link } from 'react-router-dom';
import Hero from './Hero';
import { Flame } from "lucide-react";

// Articles
import profilSekolah from '@articles/home/profil-sekolah.md?raw';
import sejarahSingkat from '@articles/home/sejarah-singkat.md?raw';
import visiMisi from '@articles/home/visi-misi.md?raw';
import saranaFasilitas from '@articles/home/sarana-fasilitas.md?raw';
import igPosts from '@/assets/ig-posts.json';
import featuredArticles from '@/articles/featured-articles.json';
import ArticleBackground from "./ArticleBackground";
import InstagramEmbed from "./InstagramEmbed";

type ArticleTable = Array<{
  id: string;
  content: string;
  bgVariant?: Parameters<typeof ArticleBackground>[0]['variant'];
}>;

// ! WARNING: DO NOT MESS UP IF YOU DO NOT KNOW WHAT YOU'RE DOING
const articlesTable: ArticleTable = [
  { id: 'profil-sekolah', content: parseMarkdown(profilSekolah), bgVariant: 'gradient' },
  { id: 'sejarah-singkat', content: parseMarkdown(sejarahSingkat), bgVariant: 'dots' },
  { id: 'visi-misi', content: parseMarkdown(visiMisi) },
  { id: 'sarana-fasilitas', content: parseMarkdown(saranaFasilitas) },
];


function InstagramPosts({ urls }: { urls: string[] }) {
  if (urls.length === 0) return null;
  return (
    <ArticleBackground variant="geometric" containerSize="8xl">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-3 md:gap-4">
          <Flame color="#FF4500" size="35" />
          <span className="bg-gradient-to-r from-pink-600 to-orange-400 bg-clip-text text-transparent">
            Instagram Post
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] lg:max-h-[400px] overflow-y-auto p-4 bg-white/10 rounded-md">
          {/* Instagram Embeds */}
          {urls.map(u => <InstagramEmbed url={u} withCaption />)}
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
    <div className="bg-white-700 dark:bg-background text-gray-900 dark:text-white/80">
      <Hero />

      {/* Featured Articles Section */}
      <div className="max-w-screen bg-[#0F1221] pb-30 pt-15">
        <Section id="featured-articles">
          <div className="container px-4">
            <h2 className="text-3xl text-white font-semibold mb-8 text-center">Artikel Unggulan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <motion.div
                  key={article.title.replace(/\s+/g, '-').toLowerCase()}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <FocusableCard className={`h-full bg-white/10 dark:bg-background border-none transition-all duration-300 ease-in-out ${badgeCardHoverClass}`}>
                    {/* Featured Article */}
                    <CardContent className="p-5">
                      {/* Category */}
                      <div className="flex items-center mb-2">
                        {article.category.map((cat, i) => (
                          <Badge key={i} className="mr-2 text-gray-300 dark:bg-orange-400/80">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                      {/* Title */}
                      <h3 className="text-xl text-white font-semibold mb-2">{article.title}</h3>
                      {/* Description */}
                      <p className="text-gray-300 dark:text-white/80 text-sm mb-4">{article.description}</p>
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
      {articlesTable.map(article => {
        article.content = enhanceTable(article.content);
        return (
          <Section key={`section-${article.id}`}>
            <Article id={article.id} content={article.content} />
          </Section>
        );
      })}
    </div>
  );
}
