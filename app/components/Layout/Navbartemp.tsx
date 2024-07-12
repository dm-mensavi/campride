import Link from 'next/link';
import SignOutButton from '../Auth/SignOutButton';
import tw from 'tailwind-styled-components';

const NavBar = () => {
  return (
    <NavContainer className='flex items-center justify-between px-4 py-2 bg-blue-500 text-white'>
      <NavItem href="/">
        <Logo className='text-xl font-bold cursor-pointer'>Shuttle Tracker</Logo>
      </NavItem>
      <NavLinks>
        <NavItem href="/pages/auth/userLogin">Sign In</NavItem>
        <NavItem href="/pages/auth/driverLogin">Driver Login</NavItem>
        <SignOutButton />
      </NavLinks>
    </NavContainer>
  );
};  

export default NavBar;

const NavContainer = tw.nav`
  flex items-center justify-between px-4 py-2 bg-blue-500 text-white
`;

const Logo = tw.a`
  text-xl font-bold cursor-pointer
`;

const NavLinks = tw.div`
  flex space-x-4
`;

const NavItem = tw.a`
  py-1 px-3 rounded-lg text-sm font-medium transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white
`;
