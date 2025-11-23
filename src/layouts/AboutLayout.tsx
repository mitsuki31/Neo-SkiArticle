import { Section } from "@/lib/motion-anim";
import Article from "@/lib/Article";
import { parseMarkdown } from "@/lib/markparser";

import tentangSekolah from '@articles/home/tentang-sekolah.md?raw';

export default function About() {
  const html = parseMarkdown(tentangSekolah);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('*').forEach(el => el.classList.add('dark:text-white'));
  const content = doc.body.innerHTML;

  return (
    <div className="bg-white-800 dark:bg-background text-gray-900">
      <Section id="about" className="bg-none">
        <Article id='tentang-sekolah' content={content} />
      </Section>
    </div>
  );
}
