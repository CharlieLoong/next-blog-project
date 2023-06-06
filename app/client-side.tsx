'use client';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ClientSide() {
  const notify = () => toast('Here is your toast.');
  return (
    <>
      <Toaster />
      <button onClick={notify}>Make me a toast</button>
    </>
  );
}



