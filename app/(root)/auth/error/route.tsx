import { useRouter } from 'next/router';
import { NextPage } from 'next';

const AuthErrorPage: NextPage = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{error as string}</p>
    </div>
  );
};

export default AuthErrorPage;