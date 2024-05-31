"use client";

import Link from 'next/link';
import SignOutButton from '../Auth/SignOutButton';
// import styles from '../../../styles/components/NavBar.module.css';

const NavBar = () => {
  return (
    <nav className='flex space-x-3 '>
      <Link href="/">Login Page</Link>
      <Link href="/pages/auth/userLogin">Sign In</Link>
      <Link href="/pages/auth/driverLogin">Driver Login</Link>
      <SignOutButton />
    </nav>
  );
};  

export default NavBar;
