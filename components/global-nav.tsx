'use client';
import type { FC } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface GlobalNavProps {}

const GlobalNav: FC<GlobalNavProps> = ({}) => {
  const { data: session } = useSession();
  return (
    <div className="bg-black top-0 bottom-0 lg:w-[15vw] min-w-64  lg:flex z-10 fixed h-full flex-col border-slate-500 hidden bg-gradient-to-bl from-black to-indigo-900/20 shadow-xl shadow-black pr-4">
      <span className='p-1 font-extrabold'>Blog App</span>
      <div className="flex flex-col border p-4 rounded m-2 gap-4">
        {session ? (
          <>
            <div className="flex items-center justify-around">
              {session.user?.image && (
                <Image
                  src={session.user?.image}
                  height={64}
                  width={64}
                  alt="user-image"
                  className="rounded-full ring-4"
                  priority
                />
              )}
              <p className="hidden xl:flex break-words">{session.user?.name}</p>
            </div>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </div>
      <hr />
      <div className="flex flex-col mt-4 gap-2">
        <Link href="/" className="flex flex-col px-4">
          <button>Home</button>
        </Link>
        {/* <Link href="/react-hooks" className="flex flex-col px-4">
          <button>react hooks</button>
        </Link> */}
        <Link href="/user" className="flex flex-col px-4">
          <button>Users</button>
        </Link>
        <hr />
        <Link href="/create" className="flex flex-col px-4">
          <button className="bg-slate-300 text-black hover:text-purple-200 font-bold">
            Create Post
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GlobalNav;
