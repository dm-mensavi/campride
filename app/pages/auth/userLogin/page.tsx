"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebaseConfig';
import { useAuth } from '../../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      toast.success('Signed in with Google successfully!');
      router.push('/pages/routeselect/user'); // Redirect to student dashboard
    } catch (error) {
      setError('Sign-in with Google failed. Please try again.');
      toast.error('Sign-in with Google failed. Please try again.');
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed in successfully!');
      router.push('/pages/routeselect/user'); // Redirect to student dashboard
    } catch (error) {
      setError('Sign-in with Email and Password failed. Please try again.');
      toast.error('Sign-in with Email and Password failed. Please try again.');
    }
  };

  const handleRegister = () => {
    router.push('/pages/auth/userLogin/signup'); // Redirect to registration page
  };

  if (user) {
    router.push('/pages/routeselect/user');
    return null;
  }

  return (
    <Wrapper>
      <ToastContainer />
      <FormContainer>
        <Title>Student Sign In</Title>
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
          <span className="firebaseui-idp-text firebaseui-idp-text-long">Login</span>
        </Button>
        <RegisterButton onClick={handleRegister}>Register</RegisterButton>
        <GoogleButton onClick={handleGoogleSignIn}>
          <span className="firebaseui-idp-icon-wrapper">
            <img className="firebaseui-idp-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Icon" />
          </span>
          <span className="pl-2">Sign In with Google</span>
        </GoogleButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </Wrapper>
  );
};

export default StudentSignInForm;
const Wrapper = tw.div`
  flex h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-green-300
`;

const FormContainer = tw.div`
  flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto
`;

const Title = tw.h2`
  text-3xl font-bold mb-6 text-center text-gray-800
`;

const Input = tw.input`
  border border-gray-300 p-3 rounded mb-4
`;

const Button = tw.button`
  bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mb-2
`;

const RegisterButton = tw.button`
  border border-blue-500 text-blue-500 p-3 rounded-lg hover:bg-blue-300 transition-colors duration-300 flex items-center justify-center mb-2
`;

const GoogleButton = tw.button`
  border border-blue-500 text-blue-500 p-3 rounded-lg hover:bg-blue-300 transition-colors duration-300 flex items-center justify-center mb-2
`;

const ErrorMessage = tw.p`
  text-red-500 text-center mt-4
`;