import { extractFirstHeading, parseMarkdown } from "@/lib/markparser";
import Layout from "./Layout";

type ArticleProps = {
  content: string;
  className?: string;
  titleClassName?: string;
  id?: string;
};

export default function Article({ content, className = '', titleClassName = '', id = '' }: ArticleProps) {
  const parsedMarkdownn = extractFirstHeading(parseMarkdown(content));
  if (!parsedMarkdownn) return <></>;

  const { title, content: html } = parsedMarkdownn;
  // Styled <h2> to inject at the top of the article
  const styledHeading = `<h2 class="text-2xl font-bold mb-6 dark:text-white ${titleClassName}">${title}</h2>`;

  return (
    <Layout>
      <article
        id={id}
        title={title}
        className={`max-w-none sm:text-md md:text-lg sm:pr-2 leading-8 article bg-none text-gray-700 dark:text-gray-300 ${className}`}
        dangerouslySetInnerHTML={{ __html: `${styledHeading}\n${html}` }}
      />
    </Layout>
  );
}
