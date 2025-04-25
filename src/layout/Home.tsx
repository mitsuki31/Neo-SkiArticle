import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { enhanceTable } from "@/lib/utils";
import { GradientButton, Section } from "@/lib/motion-anim";
import Article from "@/lib/Article";
import FocusableCard from "@/lib/FocusableCard";
import { parseMarkdown } from "@/lib/markparser";

import Hero from './Hero';

// Articles
import profilSekolah from '@/assets/articles/profil-sekolah.md?raw';
import sejarahSingkat from '@/assets/articles/sejarah-singkat.md?raw';
import visiMisi from '@/assets/articles/visi-misi.md?raw';
import saranaFasilitas from '@/assets/articles/sarana-fasilitas.md?raw';

// ! WARNING: DO NOT MESS UP IF YOU DO NOT KNOW WHAT YOU'RE DOING
const articlesTable = [
  { id: 'profil-sekolah', content: parseMarkdown(profilSekolah) },
  { id: 'sejarah-singkat', content: parseMarkdown(sejarahSingkat) },
  { id: 'visi-misi', content: parseMarkdown(visiMisi) },
  { id: 'sarana-fasilitas', content: parseMarkdown(saranaFasilitas) },
];

const featuredArticles = [
  {
    title: 'Program Keahlian',
    category: ['Program Keahlian', 'TKJ', 'TKR', 'TP'],
    description: 'Kenali berbagai jurusan unggulan yang membekali siswa dengan keterampilan siap kerja di bidang teknologi dan industri.'
  },
];

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
                        <Badge
                          key={i}
                          className="mr-2 text-gray-300 dark:bg-orange-400/80"
                          onClick={() => alert('Sorry, this feature is not available yet.')}
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    {/* Title */}
                    <h3 className="text-xl text-white font-semibold mb-2">{article.title}</h3>
                    {/* Description */}
                    <p className="text-gray-300 dark:text-white/80 text-sm mb-4">{article.description}</p>
                    <GradientButton className="mx-auto text-sm text-white">
                      Baca Selengkapnya
                    </GradientButton>
                  </CardContent>
                </FocusableCard>
              </motion.div>
            ))}
            </div>
          </div>
        </Section>
      </div>

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
