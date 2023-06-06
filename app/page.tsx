import PostList from '@/app/post-list';
import prisma from '@/lib/db';
import CreatePost from './create';
import { Post } from '@prisma/client';

type Props = {};

export default async function Home() {
  const posts = await prisma.post.findMany({
    // where: {
    //   published: true,
    // },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
  return (
    <div className='w-full'>
      <h1>Homepage</h1>
      <PostList posts={posts} />
    </div>
  );
}
