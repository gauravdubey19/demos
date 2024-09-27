"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AuthContainer from "@/components/Auth/AuthContainer";
import LoginForm from "@/components/Auth/LoginForm";
import { GlobalProvider } from "@/context/GlobalProvider";

export default function SignInPage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      console.log("User already logged in:", session.user);
      window.location.href = "/";
    }
  }, [session]);

  return (
    <GlobalProvider>
      <AuthContainer>
        <LoginForm />
      </AuthContainer>
    </GlobalProvider>
  );
}