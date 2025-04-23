import { parseMarkdown } from "@/lib/markparser";
import Layout from "./Layout";

type ArticleProps = {
  content: string;
  className?: string;
  id?: string;
};

function extractFirstHeading(html: string): { title: string, content: string } | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  for (let i = 1; i <= 6; i++) {
    const heading = doc.body.querySelector(`h${i}`);
    if (heading && heading.textContent) {
      const title = heading.textContent.trim();
      heading.parentNode?.removeChild(heading);
      const content = doc.body.innerHTML.trim();
      return { title, content };
    }
  }

  return null;
}

export default function Article({ content, className = '', id = '' }: ArticleProps) {
  const { title, content: html } = extractFirstHeading(parseMarkdown(content))!;
  // Styled <h2> to inject at the top of the article
  const styledHeading = `<h2 class="text-2xl font-bold mb-6 dark:text-white">${title}</h2>`;

  return (
    <Layout>
      <article
        id={id}
        title={title}
        className={`max-w-none sm:text-md md:text-lg sm:pr-2 leading-8 article ${className}`}
        dangerouslySetInnerHTML={{ __html: `${styledHeading}\n${html}` }}
      />
    </Layout>
  );
}
