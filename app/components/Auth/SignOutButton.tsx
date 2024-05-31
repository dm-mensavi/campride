"use client";

import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebaseConfig';

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/'); // Redirect to home page after sign-out
    } catch (error:any) {
      console.error('Sign-out error:', error.message);
    }
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
