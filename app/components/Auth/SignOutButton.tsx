"use client";

import { useAuth } from '../../context/AuthContext';
import tw from 'tailwind-styled-components';

const SignOutButton = () => {
  const { logout } = useAuth();

  return <Button onClick={logout}>Sign Out</Button>;
};

export default SignOutButton;

const Button = tw.button`
  bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-300
`;
