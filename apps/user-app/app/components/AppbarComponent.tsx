"use client";
import React from "react";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AppbarComponent = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <Appbar
        user={session.data?.user}
        onSignin={signIn}
        onSignout={async () => {
          await signOut({ redirect: false });
          router.replace("/api/auth/signin");
          window.location.href = "/api/auth/signin"; // Hard redirect
          setTimeout(
            () => window.history.replaceState(null, "", "/api/auth/signin"),
            100
          );
        }}
      />
    </div>
  );
};

export default AppbarComponent;
