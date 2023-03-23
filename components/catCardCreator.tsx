import React, { useState, FC, ReactElement, useEffect } from "react";

import styles from "@/styles/CatCardCreator.module.css";

const CAT_API_KEY = "live_tYTRfU3cmdp9RJX78Xx1JNDtt5jpOSMlz18ACdNkpw25R1j3vzzC1jsnWsKSv02e";
const RANDOM_CAT_URL = "https://api.thecatapi.com/v1/images/search";

const CatCardCreator: FC = (): ReactElement => {
	const [catName, setCatName] = useState("");
	const [catImg, setCatImg] = useState("");

	useEffect(() => {
		loadRandomCat();
	}, []);

	const loadRandomCat = async () => {
		try {
			fetch(RANDOM_CAT_URL, {
				headers: {
					"x-api-key": CAT_API_KEY
				}
			})
				.then(data => {
					return data.json();
				})
				.then(data => {
					setCatImg(data[0].url);
				});
		} catch (err) {
			console.error("catCardCreator : loadRandomCat : err : ", err);
		}
	};

	const saveCatToHerd = () => {
		//
	};

	return (
		<div className={styles.creator}>
			<input className={styles.catNameBox} type="text" value={catName} placeholder="Cat Name" onChange={e => setCatName(e.target.value)} />
			<img src={catImg} alt={catName} className={styles.catImageBox} />
			<div className={styles.buttons}>
				<button onClick={loadRandomCat}>Refresh</button>
				<button onClick={saveCatToHerd}>Save</button>
			</div>
		</div>
	);
};
export default CatCardCreator;
