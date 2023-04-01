import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			const DB_API_URI = "http://localhost:3001"; //	@todo centralize

			res.status(200).json({ message: "Data stored successfully" });
		} catch (err) {
			console.error("dbPost : err : ", err);
			res.status(500).json({ message: "Error storing data" });
		}
	}
}
