import tw from 'tailwind-styled-components';
import Image from 'next/image';

const HomePage = () => {
  return (
    <Container>
      <Header>Welcome to the Shuttle Tracker</Header>
      <SubHeader>Your Trusted Shuttle Service Provider</SubHeader>
      <ImageContainer>
        <Image
          src="/Rides/shuttle-green.png"
          alt="shuttle"
          width={200}
          height={200}
          objectFit="contain"
          className="rounded-lg bg-gray-100"
        />
      </ImageContainer>
      <ButtonContainer>
        <ButtonLink href="/pages/auth/userLogin">Sign In as User</ButtonLink>
        <ButtonLink href="/pages/auth/driverLogin">Driver Login</ButtonLink>
      </ButtonContainer>
    </Container>
  );
};

export default HomePage;

const Container = tw.div`
  flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-green-300 px-4
`;

const Header = tw.h1`
  text-4xl font-bold text-gray-800 my-6 text-center
`;

const SubHeader = tw.p`
  text-lg text-gray-600 mb-10 text-center
`;

const ImageContainer = tw.div`
  w-48 h-48 rounded-lg overflow-hidden shadow-lg my-8
`;

const ButtonContainer = tw.div`
  flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 my-8
`;

const ButtonLink = tw.a`
  py-2 px-6 bg-blue-500 text-white rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300 ease-in-out block text-center
`;
