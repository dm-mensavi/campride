// StudentSignUpForm.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../lib/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tw from 'tailwind-styled-components';

const StudentSignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/pages/auth/userLogin'); // Redirect to sign-in page
      }, 2000);
    } catch (error) {
      setError('Sign-up failed. Please try again.');
    }
  };

  return (
    <Wrapper>
      <ToastContainer />
      <FormContainer>
        <Title>Student Sign Up</Title>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleSignUp}>Sign Up</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </Wrapper>
  );
};

export default StudentSignUpForm;

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
  bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300 mb-4
`;

const ErrorMessage = tw.p`
  text-red-500 text-center mt-4
`;
