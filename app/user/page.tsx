import prisma from '@/lib/db';
import { User } from '@prisma/client';
import React from 'react';
import UserCard from './user-card';

type Props = {
  users: Array<User> | null;
};


export default async function Page() {
  const users = await prisma.user.findMany({
    where: {},
  });
  return <div className='flex flex-col gap-4 w-full'>
    {users.map(user => (
      <UserCard key={user.id} user={user} />
    ))}
  </div>;
}
