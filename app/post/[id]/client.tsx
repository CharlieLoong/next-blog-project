'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Highlighter from './highlighter';
import Navigation from '@/components/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface ClientProps {
  content: string;
}

const Client: React.FC<ClientProps> = ({ content }) => {
  const articleRef = useRef(null);
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    const articleContainer = articleRef.current;
    const articleHeadings: HTMLElement = articleContainer.querySelectorAll(
      'h1, h2, h3, h4, h5, h6'
    );
    for (let heading of articleHeadings) {
      if (!heading.id) {
        heading.id = heading.innerText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-');
      }
    }

    setHeadings([...articleHeadings]);
  }, []);
  return (
    <div className>
      <article
        className="prose prose-slate dark:prose-invert max-w-full scroll-smooth"
        ref={articleRef}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <Highlighter {...props}>
                  {String(children).replace(/\n$/, '')}
                </Highlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
      <Navigation headings={headings} />
    </div>
  );
};

export default Client;
