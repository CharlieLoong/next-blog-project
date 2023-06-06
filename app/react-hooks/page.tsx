'use client';

import { FC, Suspense, useEffect, useState } from 'react';
import { Contents } from './Contents';
import { toast } from 'react-hot-toast';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [count, setCount] = useState<number>(0);
  const [contents, setContents] = useState<string | null>('');
  const [position, setPosition] = useState({
    x: -10,
    y: -10,
  });

  useEffect(() => {
    return () => {};
  }, []);

  async function fetchHandler() {
    const data = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    ).then((res) => res.json());
    setContents(JSON.stringify(data, null, 2));
  }

  return (
    <>
      <div className="text-center flex flex-col p-2">
        <h1>useState Hook</h1>
        <h1 className="mx-auto text-4xl border border-white rounded-full p-2 w-16 h-16 self-center">
          {count}
        </h1>
        <div className="flex justify-around mx-40">
          <button
            className="bg-slate-500 rounded p-2 px-4"
            onClick={() => setCount((count) => count - 1)}
          >
            -
          </button>
          <button
            className="bg-slate-500 rounded p-2 px-4"
            onClick={() => setCount((count) => count + 1)}
          >
            +
          </button>
          <button onClick={() => toast('hahaha')}>toast</button>
        </div>
      </div>
      <div className="text-center flex flex-col p-2">
        <h1>useState Hook</h1>
        <div
          className="w-40 h-40 bg-slate-400 mx-auto m-4 rounded-sm"
          onPointerMove={(e) => {
            setPosition({
              x: e.clientX,
              y: e.clientY,
            });
          }}
          onPointerLeave={() =>
            setPosition({
              x: -8,
              y: -8,
            })
          }
        >
          <div
            className="w-4 h-4 bg-red-700 rounded-full absolute"
            style={{
              left: `${position.x - 8}px`,
              top: `${position.y - 8}px`,
            }}
          ></div>
        </div>
      </div>
      <div>
        Suspense
        <div>
          <button onClick={fetchHandler}>Fetch</button>
          <button onClick={() => setContents('')}>Clear</button>
          {/* <Suspense fallback={<div>Loading...</div>}>
            <Contents contents={contents} />
          </Suspense> */}
        </div>
      </div>
    </>
  );
};

// const Contents = ({ contents }) => {
//   let start = Date.now();
//   // while (performance.now() - start < 1000) {

//   // }
//   return <pre>{contents}</pre>;
// }

export default Page;
