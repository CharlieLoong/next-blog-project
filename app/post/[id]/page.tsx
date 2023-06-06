import type { FC } from 'react';
import { Post as PostType } from '@prisma/client';
import Link from 'next/link';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import DeleteButton from '@/components/delete-button';

import Navigation from '@/components/navigation';
import Client from './client';

interface PostProps {
  post: PostType;
  params: {
    id: string;
  };
}

const Post = async ({ params }: PostProps) => {
  const { id } = params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id, 10),
    },
    include: {
      author: true,
    },
  });
  if (!post) {
    notFound();
  }
  function handleDelete(): void {}

  return (
    <>
      <div className="from-zinc-800 to-black bg-gradient-to-tr rounded-md shadow-md p-4 pt-8 grow flex flex-col gap-2 relative">
        <h1 className="text-5xl font-bold text-center">{post?.title}</h1>
        <div className="mt-2 flex justify-between w-full">
          <Link
            href={`/user/${post.author.id}`}
            className="text-center text-2xl font-normal italic"
          >
            {post.author?.name}
          </Link>
          <span className="mt-auto">{post.createdAt.toDateString()}</span>
        </div>

        <hr />
        {/* <p className="mt-8 text-xl">{post?.content}</p> */}
        <Client content={post.content as string} />

        <div className="mt-auto flex justify-between w-full">
          <Link href="/">Go Back</Link>
          <DeleteButton id={parseInt(id, 10)} />
        </div>
      </div>
    </>
  );
};

export default Post;
