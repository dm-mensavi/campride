"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import tw from "tailwind-styled-components";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <Title>Sign Up</Title>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <Button onClick={handleSignUp}>Sign Up</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </Wrapper>
  );
};

export default SignUpForm;

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
  border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500
`;

const Button = tw.button`
  bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300
`;

const ErrorMessage = tw.p`
  text-red-500 text-center mt-4
`;
