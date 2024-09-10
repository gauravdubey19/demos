import AuthContainer from "@/components/Auth/AuthContainer";
import { LoginForm } from "@/components/Auth/LoginForm";

export default function SignInPage() {
  return (
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  );
}
