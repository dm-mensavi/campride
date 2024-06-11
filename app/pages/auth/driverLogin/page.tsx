"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebaseConfig';
import { useAuth } from '../../../context/AuthContext';
import tw from 'tailwind-styled-components';

const StudentSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/pages/routeselect/driver'); // Redirect to student dashboard
    } catch (error) {
      setError('Sign-in with Google failed. Please try again.');
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/pages/routeselect/driver'); // Redirect to student dashboard
    } catch (error) {
      setError('Sign-in with Email and Password failed. Please try again.');
    }
  };

  if (user) {
    router.push('/pages/routeselect/driver');
    return null;
  }

  return (
    <Wrapper>
      <FormContainer>
        <Title>Driver Sign In</Title>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleEmailSignIn}>
          <span className="firebaseui-idp-icon-wrapper">
            <img className="firebaseui-idp-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg" alt="Email Icon" />
          </span>
          <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign In with Email</span>
        </Button>
        <Button onClick={handleGoogleSignIn}>
          <span className="firebaseui-idp-icon-wrapper">
            <img className="firebaseui-idp-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Icon" />
          </span>
          <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign In with Google</span>
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </Wrapper>
  );
};

export default StudentSignInForm;

const Wrapper = tw.div`
  flex h-screen items-center justify-center bg-gray-100
`;

const FormContainer = tw.div`
  flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-md
`;

const Title = tw.h2`
  text-2xl font-bold mb-6 text-center
`;

const Input = tw.input`
  border border-gray-300 p-2 rounded mb-4 w-full
`;

const Button = tw.button`
  bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300 mb-4 flex items-center justify-center
`;

const ErrorMessage = tw.p`
  text-red-500 text-center mt-4
`;
