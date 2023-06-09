import { useState } from "react";
import { useQuery } from "react-query";

import CatCardPanel from "../components/catCardPanel";
import CatCardCreator from "../components/catCardCreator";
import DemoFooter from "../components/demoFooter";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { UserData } from "@/types/global";

const DB_API_URI = "http://localhost:3001"; //	@todo centralize
const inter = Inter({ subsets: ["latin"] });

// Mock userID for testing.
const _userID = 42;

export default function App() {
	const [userID, setUserID] = useState<string | number>(_userID);

	const endpoint = `${DB_API_URI}/users/${userID}`;

	const { isLoading, error, data } = useQuery(["userData", userID], (): Promise<UserData> => fetch(endpoint).then(res => res.json()));

	if (isLoading) return <div>Loading...</div>;

	if (error && error instanceof Error) return <div>{"An error has occurred: " + error.message}</div>;

	if (!data) return <div>No data</div>;

	const ChangeUser = (usrID: string) => {
		setUserID(usrID);
	};

	return (
		<>
			<div className={styles.main}>
				<div className={styles.row}>
					<div className={styles.description}>
						<h1 className={inter.className}>Cat Club 🐱</h1>
					</div>
				</div>
				<div className={styles.row}>
					<div className={[styles.col].join(" ")}>
						<CatCardCreator userId={userID} />
					</div>
					<div className={styles.fixed2}>
						<div className={styles.description}>{data.firstName + "'"}s Herd</div>
						<CatCardPanel herd={data.herd} />
					</div>
				</div>
				<div className={styles.row}>
					<DemoFooter userId={userID} handleChange={val => ChangeUser(val)} />
				</div>
			</div>
		</>
	);
}
