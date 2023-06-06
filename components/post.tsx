import { FC, useRef } from 'react';
import { Post as PostType } from '@prisma/client';
import Link from 'next/link';

interface PostProps {
  post: PostType & {
    author: {
      name: string;
    };
  };
}

const Post: FC<PostProps> = ({ post }) => {
  return (
    <div className="rounded-md shadow-md p-4 bg-gradient-to-b from-zinc-800 to-zinc-900 opacity-85 drop-shadow-xl shadow-zinc-600 h-32">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{post.title}</h1>{' '}
        <Link href={`/user/${post.authorId}`}>
          <h2 className="bg-zinc-600 p-1 rounded shadow-lg hover:bg-zinc-200 hover:text-black transition-colors px-3">
            {post.author?.name}
          </h2>
        </Link>
      </div>
      <p className="mt-2 hidden sm:inline-block">{post.content?.slice(0,200)}</p>
      <div className="flex justify-between">
        <Link
          href={`/post/${post.id}`}
          className="font-extrabold text-zinc-500 hover:text-zinc-50"
        >
          Show more...
        </Link>
        <span>{Intl.DateTimeFormat('en-US').format(post.createdAt)}</span>
      </div>
    </div>
  );
};

export default Post;
