'use client';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import type { FC, FormEvent } from 'react';

interface CreatePostProps {}

const CreatePost: FC<CreatePostProps> = ({ }) => {
  const router = useRouter()
  async function handleSubmit(
    e: FormEvent
  ) {
    e.preventDefault();
    if()
    await fetch('/api/post/handler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: e.target.title.value,
        content: e.target.content.value,
      }),
    });
    router.refresh()
  }
  return (
    <>
      <form
        className="flex flex-col m-4 gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="w-[75%]"
          type="text"
          name="title"
          placeholder="Title"
          required
        />
        <textarea
          className="h-20 w-[75%]"
          name="content"
          placeholder="Content"
          required
        />
        <button type="submit" disabled>Create</button>
      </form>
    </>
  );
};

export default CreatePost;
