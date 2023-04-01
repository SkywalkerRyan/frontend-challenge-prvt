import type { NextApiRequest, NextApiResponse } from "next";
import fsPromises from "fs/promises";
import path from "path";

// const DB_API_URI = "http://localhost:3001"; //	@todo centralize
const dataFilePath = path.join(process.cwd(), "/db.json");
import { UserData } from "@/types/global";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const jsonData = await fsPromises.readFile(dataFilePath);
			const objectData = JSON.parse(jsonData.toString());

			const { userId, nickname, imageID, imageURI, breed, breedId } = req.body;

			const user = await objectData.users.map(function (_user: UserData) {
				if (_user.id === parseInt(userId)) {
					const new_cat = {
						nickname,
						imageID,
						imageURI,
						breed,
						breedId
					};
					_user.herd.push(new_cat);
				}

				return _user;
			});

			objectData.users = user;
			const updatedData = JSON.stringify(objectData);

			await fsPromises.writeFile(dataFilePath, updatedData);

			res.status(200).json({ message: "Data stored successfully" });
		} catch (err) {
			console.error("dbPost : err : ", err);
			res.status(500).json({ message: "Error storing data" });
		}
	}
}
