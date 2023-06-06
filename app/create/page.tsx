'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { FormEvent, Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

function Page() {
  const { data: session, status } = useSession()
  const [title, setTitle] = useState('notitle');
  const [content, setContent] = useState('**Hello world!!!**');
  
  const router = useRouter();
  async function handleSubmit() {
    const result = await fetch('/api/post/handler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    router.push('/');
    router.refresh();
  }
  if(status === 'unauthenticated') return (<div> Please Sign In First</div>)
  return (
    <div className="grow flex flex-col gap-4">
      <h1 className="text-2xl text-center">Create a Post</h1>
      <div className="my-auto flex-col flex gap-4">
        <h1>Title</h1>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <h1>Content</h1>
        <Suspense
          fallback={
            <div className="h-full animate-ping bg-zinc-400 rounded"></div>
          }
        >
          <MDEditor
            className="min-h-full"
            value={content}
            onChange={setContent}
          />
        </Suspense>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Page;
