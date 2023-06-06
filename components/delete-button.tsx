'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  id: number;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter()
  async function handleDelete() {
    if (confirm('Do you want to delete this post?')) {
      alert('confirmed');
      await fetch(`/api/post/handler`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
      });
      router.push('/')
      router.refresh()
    } else {
      alert('canceled');
    }
  }
  return (
    <button className="bg-red-500 hover:bg-red-700" onClick={handleDelete}>
      DELETE
    </button>
  );
}
