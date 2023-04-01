import React, { useState, FC, ReactElement, useEffect } from "react";

import styles from "@/styles/Footer.module.css";
import { UserData } from "@/types/global";

// const fs = require("fs");

const DB_API_URI = "http://localhost:3001"; //	@todo centralize

type DemoFooterProps = {
	userId: string | number;
	handleChange: (event: string) => void;
};

const DemoFooter = (props: DemoFooterProps): ReactElement => {
	const [userList, setUserList] = useState<UserData[]>([]);

	useEffect(() => {
		loadUserList();
	}, []);

	const loadUserList = async () => {
		try {
			await fetch(DB_API_URI + "/users")
				.then(resp => resp.json())
				.then(data => {
					setUserList(data);
				});
		} catch (err) {
			console.error("DemoFooter : loadUserList : err : ", err);
		}
	};

	const earnPoints = async (point: number) => {
		try {
			const body_data = {
				userId: props.userId,
				point
			};

			const response = await fetch("/api/dbPostEarnPoints", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body_data)
			});
			const data = await response.json();

			alert(data.message);
			//
		} catch (err) {
			console.error("DemoFooter : earnPoints : err : ", err);
		}
	};

	return (
		<div className={styles.footer}>
			<select className={styles.userDropDown} value={props.userId} onChange={event => props.handleChange(event.target.value)}>
				{userList.map((user: UserData, idx: number) => (
					<option key={idx} value={user.id}>
						{user.firstName}
					</option>
				))}
			</select>
			<div className={styles.buttonContainer}>
				<button className={styles.ftrButton} onClick={() => earnPoints(10)}>
					Car Alignment
				</button>
				<button className={styles.ftrButton} onClick={() => earnPoints(20)}>
					Truck Alignment
				</button>
			</div>
			{/* <img src="footerConcept.png" alt="footer concept" /> */}
		</div>
	);
};
export default DemoFooter;
