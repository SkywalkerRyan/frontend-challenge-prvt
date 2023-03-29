import React, { useState, FC, ReactElement, useEffect } from "react";

import styles from "@/styles/CatCardCreator.module.css";

// import dbAPI from "../api/db.js";

// import { join, dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// import { LowSync } from "lowdb";
// import { JSONFileSync } from "lowdb/node";

const CAT_API_KEY = "live_tYTRfU3cmdp9RJX78Xx1JNDtt5jpOSMlz18ACdNkpw25R1j3vzzC1jsnWsKSv02e";
const RANDOM_CAT_URL = "https://api.thecatapi.com/v1/images/search";

const DB_API_URI = "http://localhost:3001"; //	@todo centralize

type CatCardCreatorProps = {
	userId: string | number;
};

const CatCardCreator = (props: CatCardCreatorProps): ReactElement => {
	const [catName, setCatName] = useState<string>("");
	const [catImg, setCatImg] = useState<string>("");
	const [catImgId, setCatImgId] = useState<string>("");

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
					console.log("data : ", data);
					setCatImg(data[0].url);
					setCatImgId(data[0].id);
				});
		} catch (err) {
			console.error("catCardCreator : loadRandomCat : err : ", err);
		}
	};

	const saveCatToHerd = async () => {
		try {
			const new_cat = {
				nickname: catName,
				imageID: catImgId,
				imageURI: catImg,
				breed: "Bengal",
				breedId: "beng"
			};
			const response = await fetch("/api/dbPost", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(new_cat)
			});
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.error("catCardCreator : saveCatToHerd : err : ", err);
		}
		// const db = new Low(new JSONFile("db.json"));
		// db.read();
		// console.log("!!!!!!!!!! : ", db.data);
	};

	return (
		<div className={styles.creator}>
			<input className={styles.catNameBox} type="text" value={catName} placeholder="Cat Name" onChange={e => setCatName(e.target.value)} />
			<img className={styles.catImageBox} src={catImg} alt={catName} />
			<div className={styles.buttons}>
				<button onClick={loadRandomCat}>Refresh</button>
				<button onClick={saveCatToHerd}>Save</button>
			</div>
		</div>
	);
};
export default CatCardCreator;
