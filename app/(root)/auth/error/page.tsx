"use client";
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

const AuthErrorPage: FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || "Unknown error occurred";

  return (
    <div>
      <h3>Authentication Error</h3>
      <p>{error}</p>
    </div>
  );
};

export default AuthErrorPage;
