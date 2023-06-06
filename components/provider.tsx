'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';



export interface ProviderProps {
  children: React.ReactNode;
  session: Session;
}


export default function Provider(props: ProviderProps) {
  return <SessionProvider session={props.session}>{props.children}</SessionProvider>;
}
