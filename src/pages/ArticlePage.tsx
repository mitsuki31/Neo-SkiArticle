import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMarkdownContent } from '@/lib/markparser';
import CreateErrorPage from '@/layout/ErrorPage';
import Article from '@/lib/Article';

import Home from '@/layout/Home';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { Section } from '@/lib/motion-anim';

export default function ArticlePage() {
  const { slug } = useParams();
  const [content, setContent] = useState<Awaited<ReturnType<typeof getMarkdownContent>> | null>(null);
  const [error, setError] = useState<{ errno: number; message: string } | null>(null);
  
  useEffect(() => {
    if (!slug) return;
    getMarkdownContent(slug)
      .then((data) => setContent(data))
      .catch((err) => {
        console.error(err);
        setError({ errno: 404, message: 'Artikel tidak ditemukan' });
      });
  }, [slug]);

  if (error) {
    return <CreateErrorPage
      errno={error.errno}
      message={error.message}
      description="Maaf, artikel yang Anda cari tidak ada atau telah dipindahkan."
    />;
  }

  // if (!content) return <div className="p-4">Mempersiapkan artikel...</div>;
  const { data, content: html } = content || {};

  return (
    <>
      <Header className="bg-none bg-gray-100 dark:bg-background" />
      <div className='bg-white-700 dark:bg-background text-gray-900 dark:text-white/80 pt-5 pb-20'>
      {content ? (
        <Section className='bg-none'>
          <Article
            id={slug}
            content={html}
            className='prose prose-h2:font-bold dark:prose-h2:text-white'
            titleClassName='text-4xl'
          />
        </Section>
      ) : (
        <div className="max-w-4xl mx-auto px-4 mt-12 space-y-6 animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-white/10 rounded w-1/3" />
          <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-full" />
          <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-5/6" />
          <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-4/5" />
          <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-2/3" />
        </div>
      )}
      </div>
      <Footer />
    </>
  );
}