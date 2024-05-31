"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import tw from 'tailwind-styled-components';

const SignInDriverForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirect to driver dashboard or any other driver-specific page
      router.push('/pages/driver');
    } catch (error) {
      setError('Sign-in with Google failed. Please try again.');
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <Title>Driver Sign In</Title>
        <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </Wrapper>
  );
};

export default SignInDriverForm;

const Wrapper = tw.div`
  flex h-screen items-center justify-center bg-gray-100
`;

const FormContainer = tw.div`
  flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-md
`;

const Title = tw.h2`
  text-2xl font-bold mb-6 text-center
`;

const Button = tw.button`
  bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300
`;

const ErrorMessage = tw.p`
  text-red-500 text-center mt-4
`;
