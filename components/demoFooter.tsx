import React, { useState, FC, ReactElement, useEffect } from "react";

import styles from "@/styles/Footer.module.css";
import { DropDownProps, UserData } from "@/types/global";

const DB_API_URI = "http://localhost:3001"; //	@todo centralize

const DemoFooter = (props: DropDownProps): ReactElement => {
	const [userList, setUserList] = useState<UserData[]>([]);

	useEffect(() => {
		loadUserList();
	}, []);

	const loadUserList = async () => {
		try {
			await fetch(DB_API_URI + "/users")
				.then(resp => resp.json())
				.then(data => {
					console.log("!!!!!!! ", data);
					setUserList(data);
				});
		} catch (err) {
			console.error("DemoFooter : loadUserList : ", err);
		}
	};

	return (
		<div className={styles.footer}>
			<select className={styles.userDropDown} onChange={event => props.handleChange(event.target.value)}>
				{userList.map((user: UserData, idx: number) => (
					<option key={idx} value={user.id}>
						{user.firstName}
					</option>
				))}
			</select>

			{/* <img src="footerConcept.png" alt="footer concept" /> */}
		</div>
	);
};
export default DemoFooter;
