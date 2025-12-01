import Layout from "./Layout";
import { extractFirstHeading } from "@/lib/markparser";

type ArticleProps = {
  content: string;
  className?: string;
  titleClassName?: string;
  id?: string;
  preserveHeading?: boolean;
};

export default function Article({ content, className = '', titleClassName = '', id = '', preserveHeading = false }: ArticleProps) {
  const finalCn = `max-w-none sm:text-md md:text-lg sm:pr-2 leading-8 article bg-none text-gray-700 dark:text-gray-300 ${className}`;

  if (preserveHeading) {
    return (
      <Layout>
        <article
          id={id}
          className={finalCn}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Layout>
    );
  }

  const parsedMarkdown = extractFirstHeading(content);
  if (!parsedMarkdown) return <></>;

  const { title, content: html } = parsedMarkdown;
  // Styled <h2> to inject at the top of the article
  const styledHeading = `<h1 class="text-3xl font-bold mb-6 dark:text-white ${titleClassName}">${title}</h1>`;

  return (
    <Layout>
      <article
        id={id}
        className={finalCn}
        dangerouslySetInnerHTML={{ __html: `${styledHeading}\n${html}` }}
      />
    </Layout>
  );
}
