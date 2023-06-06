'use client';

import { useEffect, useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface NavigationProps {
  headings: any[]
}

const Navigation: React.FC<NavigationProps> = ({ headings }) => {
  if(!headings?.length) return null
  
  return (
    <div className="fixed top-16 right-[5%] w-64 p-4 h-1/2 hidden xl:block bg-zinc-900 m-0">
      <ul className='flex flex-col gap-2'>
        {headings?.map((heading, index) => (
          <li key={index} className="truncate shadow-lg shadow-black bg-black p-1 hover:bg-white hover:text-black">
            <a href={`#${heading.id}`}>{heading.textContent}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
