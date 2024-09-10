import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthContainer from "@/components/Auth/AuthContainer";
import SignupForm from "@/components/Auth/SignupForm";

export default async function SignUpPage() {
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <AuthContainer>
      <SignupForm />
    </AuthContainer>
  );
}
