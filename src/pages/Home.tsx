import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { enhanceTable } from "@/lib/utils";
import { GradientButton, Section } from "@/lib/motion-anim";
import Article from "@/lib/Article";
import { parseMarkdown } from "@/lib/markparser";

import Hero from './Hero';

// Articles
import profilSekolah from '@/assets/articles/profil-sekolah.md?raw';
import sejarahSingkat from '@/assets/articles/sejarah-singkat.md?raw';
import visiMisi from '@/assets/articles/visi-misi.md?raw';
import saranaFasilitas from '@/assets/articles/sarana-fasilitas.md?raw';

// WARNING: DO NOT MESS UP IF YOU DO NOT KNOW WHAT YOU'RE DOING
const articlesTable = [
  { id: 'profil-sekolah', content: parseMarkdown(profilSekolah) },
  { id: 'sejarah-singkat', content: parseMarkdown(sejarahSingkat) },
  { id: 'visi-misi', content: parseMarkdown(visiMisi) },
  { id: 'sarana-fasilitas', content: parseMarkdown(saranaFasilitas) },
];

export default function Home() {
  return (
    <div className="bg-white-800 dark:bg-background text-gray-900">
      <Hero />

      {/* Featured Articles Section */}
      <div className="max-w-screen bg-[#0F1221] pb-30 pt-15">
        <Section id="featured-articles">
          <div className="container px-4">
            <h2 className="text-3xl text-white font-semibold mb-8 text-center">Artikel Unggulan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
              >
                <Card className="h-full bg-white/10 dark:bg-background border-none transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-orange-400/50 hover:ring-2 hover:ring-orange-500/40 focus:shadow-xl focus:shadow-orange-400/50 focus:ring-2 focus:ring-orange-500/40">
                  {/* FIXME: Add actual featured articles */}
                  <CardContent className="p-5">
                    {/* Category */}
                    <Badge variant="secondary" className="mb-2 mr-2 bg-[#0F1221] text-white/80">Kategori A</Badge>
                    <Badge variant="secondary" className="mb-2 mr-2 bg-[#0F1221] text-white/80">Kategori B</Badge>
                    <Badge variant="secondary" className="mb-2 bg-[#0F1221] text-white/80">Kategori C</Badge>
                    {/* Title */}
                    <h3 className="text-xl text-white font-semibold mb-2">Judul Artikel {i}</h3>
                    {/* Description */}
                    <p className="text-gray-700 text-white/80 text-sm mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet cursus magna sit amet pellentesque.
                      Vestibulum posuere quis erat sit amet semper. Duis convallis aliquam pulvinar. Sed efficitur tempus suscipit.
                    </p>
                    <GradientButton className="mx-auto text-sm text-white">
                      Baca Selengkapnya
                    </GradientButton>
                  </CardContent>
                </Card>
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
