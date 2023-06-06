import type { FC } from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import DeleteButton from '@/components/delete-button';
import PostList from '@/app/post-list';
import UserCard from '../user-card';

interface Props {
  params: {
    id: string,
  }
}

const Page = async ({ params }: Props) => {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id, 10),
    },
    include: {
      posts: true,
    },
  });
  if (!user) {
    notFound();
  }
  return (
    <div className='flex flex-col grow'>
      <UserCard user={user} />
      <PostList className='mt-10' posts={user.posts}/>
    </div>
  );
};

export default Page;
