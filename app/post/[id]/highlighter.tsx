'use client';
import { toast } from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PostClientProps {
  children: React.ReactNode;
}

const Highlighter: React.FC<PostClientProps> = ({ children, ...props }) => {
  const handleCopy = (e) => {
    navigator.clipboard.writeText(children?.toString());
    toast.success('Code copied')
  }
  return (
    <div className='relative'>
      <SyntaxHighlighter
        {...props}
        language="js"
        PreTag="div"
        style={atomDark}
        customStyle={{
          backgroundColor: 'transparent',
        }}
      >
        {children as string}
      </SyntaxHighlighter>
      <button className="absolute top-0 right-0 py-0" onClick={handleCopy}>copy</button>
    </div>
  );
};

export default Highlighter;
