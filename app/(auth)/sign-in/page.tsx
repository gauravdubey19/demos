import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthContainer from "@/components/Auth/AuthContainer";
import LoginForm from "@/components/Auth/LoginForm";

export default async function SignInPage() {
  const session = await getServerSession();
  if (session) redirect("/");
  return (
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  );
}
