import type { NextApiRequest, NextApiResponse } from "next";
import fsPromises from "fs/promises";
import path from "path";

// const DB_API_URI = "http://localhost:3001"; //	@todo centralize
const dataFilePath = path.join(process.cwd(), "/db.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const jsonData = await fsPromises.readFile(dataFilePath);
			const objectData = JSON.parse(jsonData.toString());

			const { nickname, imageID, imageURI, breed, breedId } = req.body;

			const new_cat = {
				nickname,
				imageID,
				imageURI,
				breed,
				breedId
			};
			objectData.users[0].herd.push(new_cat);

			const updatedData = JSON.stringify(objectData);

			await fsPromises.writeFile(dataFilePath, updatedData);

			res.status(200).json({ message: "Data stored successfully" });
		} catch (err) {
			console.error("dbPost : err : ", err);
			res.status(500).json({ message: "Error storing data" });
		}
	}
}
