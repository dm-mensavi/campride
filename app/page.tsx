import NavBar from './components/Layout/Navbartemp';

const HomePage = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='my-32'>Welcome to the Shuttle Tracker</h1>
      <NavBar />
      {/* Other homepage content */}
    </div>
  );
};

export default HomePage;
