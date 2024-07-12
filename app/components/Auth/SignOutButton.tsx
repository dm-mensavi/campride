"use client";

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import tw from 'tailwind-styled-components';

const SignOutButton = () => {
  const { logout } = useAuth();
  return <Link href={"/"} onClick={logout}>Sign Out</Link>;
};

export default SignOutButton;

