"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export function AppbarClient() {
  const { data: session, status } = useSession();

  // Ensure loading state doesn't trigger an unnecessary POST request
  if (status === "loading") return null;

  return (
    <div>
      <Appbar
        onSignin={() => signIn()} // signIn() does not trigger a POST here
        onSignout={async () => {
          await signOut(); // signOut() will call POST to sign out
        }}
        user={session?.user}
      />
    </div>
  );
}
