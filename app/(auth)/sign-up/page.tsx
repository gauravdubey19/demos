import AuthContainer from "@/components/Auth/AuthContainer";
import { SignupForm } from "@/components/Auth/SignupForm";

export default function SignUpPage() {
  return (
    <AuthContainer>
      <SignupForm />
    </AuthContainer>
  );
}
