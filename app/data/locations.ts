import { Location } from "../types";

export const locations: Location[] = [
	{
		name: "Central Bus Stop (Commercial Area)",
		route: "Commercial Area - KSB",
		coordinates: [-1.57699, 6.68275],
		allowed_drop_offs: [
			"Peace Junction Bus Stop A (Hall Seven)",
			"The Church of Pentecost Bus Stop (College of Science)",
			"KSB Bus Stop",
		],
	},
	{
		name: "Peace Junction Bus Stop A (Hall Seven)",
		route: "Commercial Area - KSB",
		coordinates: [-1.57281, 6.6793],
		allowed_drop_offs: [
			"The Church of Pentecost Bus Stop (College of Science)",
			"KSB Bus Stop",
		],
	},
	{
		name: "The Church of Pentecost Bus Stop (College of Science)",
    route: "Commercial Area - KSB",
		coordinates: [-1.56756, 6.67456],
		allowed_drop_offs: ["KSB Bus Stop"],
	},
	{
		name: "KSB Bus Stop",
		coordinates: [-1.56719, 6.66932],
		route: "Commercial Area - KSB",
		allowed_drop_offs: [
			"SRC Bus Stop (Casely Hayford)",
			"Peace Junction Bus Stop B (Conti)",
			"Central Bus Stop (Commercial Area)",
			"Prempeh II Library (Main Library)",
			"Brunei Bus Stop",
		],
	},
	{
		name: "SRC Bus Stop (Casely Hayford)",
		route: "Commercial Area - KSB",
		coordinates: [-1.56788, 6.675424],
		allowed_drop_offs: [
			"Peace Junction Bus Stop B (Conti)",
			"Central Bus Stop (Commercial Area)",
			"Prempeh II Library (Main Library)",
			"Brunei Bus Stop",
		],
	},
	{
		name: "Peace Junction Bus Stop B (Conti)",
		route: "Commercial Area - KSB",
		coordinates: [-1.57297, 6.67966],
		allowed_drop_offs: ["Central Bus Stop (Commercial Area)"],
	},
	{
		name: "Brunei Bus Stop",
		route: "Brunei - KSB",
		coordinates: [-1.57415, 6.67046],
		allowed_drop_offs: [
      "Prempeh II Library (Main Library)",
			"The Church of Pentecost Bus Stop (College of Science)",
			"KSB Bus Stop",
		],
	},
	{
		name: "Prempeh II Library (Main Library)",
    route: "Brunei - KSB",
		coordinates: [-1.57229, 6.67503],
		allowed_drop_offs: [
			"The Church of Pentecost Bus Stop (College of Science)",
			"KSB Bus Stop",
		],
	},
	{
		name: "CCB Bus Stop",
		route: "CCB - Medical Village",
		coordinates: [-1.56611, 6.67488],
		allowed_drop_offs: ["Medical Village", "Gaza Hostel Bus Stop"],
	},
	{
		name: "Medical Village",
		route: "CCB - Medical Village",
		coordinates: [-1.54981, 6.67986],
		allowed_drop_offs: ["CCB Bus Stop"],
	},
	{
		name: "Gaza Hostel Bus Stop",
		route: "Gaza - CCB",
		coordinates: [-1.55701, 6.68768],
		allowed_drop_offs: ["CCB Bus Stop", "Medical Village"],
	},
];
