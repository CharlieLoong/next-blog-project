import { prisma } from '@/lib/db';
import { GetServerSideProps } from 'next';
import type { FC } from 'react';
import Post from '../components/post';
import { Post as PostType } from '@prisma/client';

interface PostListProps {
  posts: Array<PostType>;
  className?: string;
}

const PostList: FC<PostListProps> = (props) => {
  if (props.posts === undefined) return <div>undefined</div>;
  return (
    <div className={`flex flex-col gap-4 min-w-[320px] ${props.className}`}>
      {props.posts.map((post) => ( 
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
