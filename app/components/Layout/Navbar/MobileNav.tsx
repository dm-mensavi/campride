"use client";

import Link from 'next/link';
import SignOutButton from '../../Auth/SignOutButton';
import { useAuth } from '../../../context/AuthContext';
import tw from 'tailwind-styled-components';

const NavBar = () => {
  const { user } = useAuth();

  return (
    <NavContainer>
      <Link href="/">Home</Link>
      {!user && <Link href="/auth/student-signin">Student Sign In</Link>}
      {!user && <Link href="/auth/driver-signin">Driver Sign In</Link>}
      {user && <SignOutButton />}
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = tw.nav`
  flex justify-between p-4 bg-gray-800 text-white
`;
