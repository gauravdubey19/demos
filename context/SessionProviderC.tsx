'use client';

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
  session?: Session | null; // Make session optional
}

const SessionProviderC = ({ children, session }: ProviderProps) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
);

export default SessionProviderC;