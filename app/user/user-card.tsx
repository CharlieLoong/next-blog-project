import { User } from '@prisma/client';
import Image from 'next/image';
import type { FC } from 'react';
import favicon from '@/public/favicon.ico';
import Link from 'next/link';

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <Link href={`/user/${user.id}`}>
    <div className='flex border border-violet-600 items-center p-4 rounded-lg h-48 from-zinc-700 to via-violet-900 bg-gradient-to-r'>
      <Image src={favicon} width={128} height={128} alt="user-image" />
      <div className='m-auto flex flex-row gap-3 justify-between text-4xl'>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    </div>
    </Link>
  );
};

export default UserCard;
