import NavBar from "./components/Layout/Navbartemp";
import Image from "next/image";

const HomePage = () => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="my-14">Welcome to the Shuttle Tracker</h1>
			<Image
				src="/Rides/shuttle-green.png"
				alt="shuttle"
				width={200}
				height={200}
			/>
			<NavBar />
			{/* Other homepage content */}
		</div>
	);
};

export default HomePage;
