import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { getMarkdownContent, ParsedMarkdown } from '@/lib/markparser';
import CreateErrorPage from '@/layout/ErrorPage';
import Article from '@/lib/Article';
import { Section } from '@/lib/motion-anim';
import { Badge } from '@/components/ui/badge';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import Layout from '@/lib/Layout';
import { calcReadTime, extractSections, useActiveHeading } from '@/utils/article';
import { MobileTableOfContents, TableOfContents } from '@/layout/TOC';

export type ArticleFrontMatter = {
  title?: string;
  date?: Date;
  category?: string[];
};

export function ArticleLoading() {
  return (
    <>
      <Layout className='px-9 sm:px-12 lg:px-13 mt-20 animate-pulse text-transparent'>
        <Badge className='bg-gray-300 dark:bg-white/10 w-20 h-4 mr-2'></Badge>
        <Badge className='bg-gray-300 dark:bg-white/10 w-10 h-4 mr-2'></Badge>
        <Badge className='bg-gray-300 dark:bg-white/10 w-15 h-4 mr-2'></Badge>
        <Badge className='bg-gray-300 dark:bg-white/10 w-10 h-4 mr-2'></Badge>
        <Badge className='bg-gray-300 dark:bg-white/10 w-20 h-4 mr-2'></Badge>
      </Layout>
      <div className="max-w-8xl mx-auto px-4 mt-12 space-y-6 animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-white/10 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-full" />
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
  );
}

function MainContent({ slug, parsedMarkdown }: { slug: string, parsedMarkdown: Required<ParsedMarkdown<ArticleFrontMatter>> }) {
  const { data, raw, content: html } = parsedMarkdown ?? {};
  const readTime = calcReadTime(raw, 150);
  const sections = extractSections(html);

  return (
    <>
      {Array.isArray(data.category) ? (
        <Layout className='px-9 sm:px-12 lg:px-13 mt-20'>
          {(data.category as string[]).map(c => {
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
      {sections.map((section, i) => (
        <Section key={`section-${i}`} className={`bg-none py-0 ${i !== 0 ? '!pt-0' : '!pt-5'} ${i === sections.length - 1 ? 'pb-20 lg:pb-40' : ''}`}>
          <Article
            id={slug}
            content={section || ''}
            className={
              'prose prose-indigo dark:prose-invert article theme-transition '
              + 'prose-a:text-blue-700 dark:prose-a:text-blue-400 prose-a:no-underline prose-a:hover:underline prose-a:hover:underline-offset-4 '
              + 'prose-ul:list-disc prose-ol:list-decimal '
              + 'prose-ul:marker:text-gray-700 dark:prose-ul:marker:text-white/80 prose-ol:marker:text-gray-700 dark:prose-ol:marker:text-white/80 '
              + 'prose-ul:text-gray-700 dark:prose-ul:text-white/80 prose-ol:text-gray-700 dark:prose-ol:text-white/80 '
              + 'prose-ol:pl-10 prose-ul:pl-10 '
              + 'prose-hr:my-8'
            }
            titleClassName='text-3xl md:text-4xl'
            preserveHeading
          />
        </Section>
      ))}
    </>
  )
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [content, setContent] = useState<Required<ParsedMarkdown<ArticleFrontMatter>> | null>(null);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<{ errno: number; message: string } | null>(null);
  const [isClose, setIsClose] = useState(false);
  const headingsList = content?.headings.map(h => h.data?.id).filter(Boolean) ?? [];
  const activeId = useActiveHeading(headingsList, 68);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [mainContentReady, setMainContentReady] = useState<boolean>(false);

  const tocToggler = useCallback(() => {
    setIsClose(!isClose);
  }, [isClose]);

  const [isMobileTocClosed, setIsMobileTocClosed] = useState(true);
  const tocMobileToggler = useCallback(() => {
    setIsMobileTocClosed(!isMobileTocClosed);
  }, [isMobileTocClosed]);

  useEffect(() => {
    if (!slug) return;

    function updateDocumentTitle(data?: NonNullable<typeof content>['data']): void {
      // Set the document title based on the article title
      if (data && Object.keys(data).length > 0 && data.title) {
        setTitle(data.title);
        document.title = data.title + ' · NeoSKI';  // Optional fallback
      } else {
        setTitle('');
        document.title = 'NeoSKI';  // Optional fallback
      }
    }

    async function fetchContent() {
      try {
        const data = await getMarkdownContent<ArticleFrontMatter>(slug!);
        setContent(data);
        window.scrollTo(0, 0);  // Prevent page jump to the bottom on load
        updateDocumentTitle(data.data);
      } catch (err) {
        console.error(err);
        setError({ errno: 404, message: 'Artikel tidak ditemukan' });
      }
    }
    fetchContent();
  }, [slug]);

  useEffect(() => {
    if (!mainContentReady) {
      setMainContentReady(true);
      const { current } = mainContentRef ?? {};

      const cb = () => { window.scrollTo(0, 0) };
      current?.addEventListener('load', cb);
      return () => current?.removeEventListener('load', cb);
    }
  }, [mainContentRef, mainContentReady]);

  if (error) {
    return <CreateErrorPage
      errno={error?.errno ?? 404}
      message={error?.message ?? 'Artikel tidak ditemukan'}
      description="Maaf, artikel yang Anda cari tidak ada atau telah dipindahkan."
    />;
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title ? title + '· NeoSKI' : 'NeoSKI'}</title>
        </Helmet>
        <Header className="bg-none" sticky scrollThreshold={0} />
        <div className="flex bg-white-700 dark:bg-background text-gray-900 dark:text-white/80 pt-5">
          <TableOfContents
            headings={content?.headings}
            activeId={activeId ?? headingsList[0]}
            toggler={tocToggler}
            isClosed={isClose}
          />
          <MobileTableOfContents
            headings={content?.headings}
            activeId={activeId ?? headingsList[0]}
            toggler={tocMobileToggler}
            isClosed={isMobileTocClosed}
          />
          {/* Main Content */}
          <div ref={mainContentRef} className='flex-1 transition-colors duration-500'>
            {content
              ? <MainContent slug={slug!} parsedMarkdown={content} />
              : <ArticleLoading />
            }
          </div>
        </div>
        <Footer />
      </HelmetProvider>
    </>
  );
}
