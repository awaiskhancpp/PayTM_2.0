"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children, session }: { children: React.ReactNode; session?: any }) => {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>{children}</SessionProvider>
    </RecoilRoot>
  );
};
