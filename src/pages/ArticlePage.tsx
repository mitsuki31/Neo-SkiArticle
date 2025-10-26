import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMarkdownContent } from '@/lib/markparser';
import CreateErrorPage from '@/layout/ErrorPage';
import Article from '@/lib/Article';
import { Section } from '@/lib/motion-anim';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Badge } from '@/components/ui/badge';

import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import Layout from '@/lib/Layout';
import { calcReadTime, extractSections } from '@/utils/article';

export default function ArticlePage() {
  const { slug } = useParams();
  const [content, setContent] = useState<Awaited<ReturnType<typeof getMarkdownContent>> | null>(null);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<{ errno: number; message: string } | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchContent() {
      try {
        const data = await getMarkdownContent(slug!);
        setContent(data);
        window.scrollTo(0, 0);  // Prevent page jump to the bottom on load
      } catch (err) {
        console.error(err);
        setError({ errno: 404, message: 'Artikel tidak ditemukan' });
      }
    }
    fetchContent();
  }, [slug]);

  useEffect(() => {
    if (content) {
      const { data } = content;

      // Set the document title based on the article title
      if (data && Object.keys(data).length > 0 && data.title) {
        setTitle(data.title);
        document.title = data.title + ' · NeoSKI';  // Optional fallback
      } else {
        setTitle('');
        document.title = 'NeoSKI';  // Optional fallback
      }
    }
  }, [content]);

  if (error) {
    return <CreateErrorPage
      errno={error.errno}
      message={error.message}
      description="Maaf, artikel yang Anda cari tidak ada atau telah dipindahkan."
    />;
  }

  const { data, content: html } = content || { };
  const readTime = content?.raw ? calcReadTime(content.raw) : undefined;
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title ? title + '· NeoSKI' : 'NeoSKI'}</title>
        </Helmet>
        <Header className="bg-none bg-white dark:bg-background" sticky scrollThreshold={0} />
        <div className='bg-white-700 dark:bg-background text-gray-900 dark:text-white/80 pt-5 pb-20'>
        {html ? (
          <>
            {data?.category ? (
              <Layout className='px-9 sm:px-12 lg:px-13 mt-20'>
                {data.category.split(/,\s*/).map(c => {
                  return <Badge key={c.replace(' ', '-').toLowerCase()} className="mr-2 text-white dark:bg-fuchsia-700">{c}</Badge>
                })}
              </Layout>
            ) : null}
            {readTime ? (
              <Layout className='px-9 sm:px-12 lg:px-13 pt-3'>
                <p className='italic text-sm pb-0 text-gray-400 dark:text-white/60'><strong>Perkiraan waktu membaca:</strong> {
                  <span className="text-cyan-600/80 dark:text-cyan-400">{`${readTime[0]} menit, ${readTime[1]} detik`}</span>
                }
                </p>
              </Layout>
            ) : null}
            {extractSections(html).map((section, i) => (
              <Section key={`section-${i}`} className={`bg-none ${i !== 0 ? 'pt-0' : 'pt-5'}`}>
                <Article
                  id={slug}
                  content={section || ''}
                  className={
                    'prose dark:prose-invert '
                    + 'prose-a:text-blue-700 dark:prose-a:text-blue-400 prose-a:no-underline prose-a:hover:underline prose-a:hover:underline-offset-4 '
                    + 'prose-ul:list-disc prose-ol:list-decimal '
                    + 'prose-ul:marker:text-gray-700 dark:prose-ul:marker:text-white/80 prose-ol:marker:text-gray-700 dark:prose-ol:marker:text-white/80 '
                    + 'prose-ul:text-gray-700 dark:prose-ul:text-white/80 prose-ol:text-gray-700 dark:prose-ol:text-white/80 '
                    + 'prose-ol:px-0 prose-ul:px-0'
                  }
                  titleClassName='text-4xl'
                />
              </Section>
            ))}
          </>
        ) : (
          <>
            <Layout className='px-9 sm:px-12 lg:px-13 mt-20 animate-pulse text-transparent'>
              <Badge className='bg-gray-300 dark:bg-white/10 w-20 h-4 mr-2'></Badge>
              <Badge className='bg-gray-300 dark:bg-white/10 w-10 h-4 mr-2'></Badge>
              <Badge className='bg-gray-300 dark:bg-white/10 w-15 h-4 mr-2'></Badge>
              <Badge className='bg-gray-300 dark:bg-white/10 w-10 h-4 mr-2'></Badge>
              <Badge className='bg-gray-300 dark:bg-white/10 w-20 h-4 mr-2'></Badge>
            </Layout>
            <div className="max-w-4xl mx-auto px-4 mt-12 space-y-6 animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-white/10 rounded w-1/3" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-full" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-5/6" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-5/6" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4" />
              <div className="h-8 bg-gray-300 dark:bg-white/10 rounded w-1/3" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-4/5" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-2/3" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-full" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-5/6" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-4/5" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-2/3" />
            </div>
          </>
        )}
        </div>
        <Footer />
      </HelmetProvider>
    </>
  );
}
