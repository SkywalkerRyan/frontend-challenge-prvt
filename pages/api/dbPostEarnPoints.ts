import type { NextApiRequest, NextApiResponse } from "next";
import fsPromises from "fs/promises";
import path from "path";
import { UserData } from "@/types/global";

const dataFilePath = path.join(process.cwd(), "/db.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const jsonData = await fsPromises.readFile(dataFilePath);
			const objectData = JSON.parse(jsonData.toString());

			const { userId, point } = req.body;

			const user = await objectData.users.map(function (_user: UserData) {
				if (_user.id === parseInt(userId)) {
					console.log("if");
					_user.wallet += point;
				}

				return _user;
			});
			objectData.users = user;

			const updatedData = JSON.stringify(objectData);
			await fsPromises.writeFile(dataFilePath, updatedData);

			res.status(200).json({ message: point + " Points earned." });
		} catch (err) {
			console.error("dbPost : err : ", err);
			res.status(500).json({ message: "Error storing data" });
		}
	}
}
