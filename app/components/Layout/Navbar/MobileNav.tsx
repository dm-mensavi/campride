import Link from 'next/link';
import SignOutButton from '../../Auth/SignOutButton';

const NavBar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/auth/signin">Sign In</Link>
      <Link href="/auth/signup">Sign Up</Link>
      <SignOutButton />
    </nav>
  );
};

export default NavBar;
