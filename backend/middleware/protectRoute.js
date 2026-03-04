import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;
		if (!accessToken) {
			return res.status(401).json({ error: "Unauthorized: No Access Token Provided" });
		}

		const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized: Invalid Access Token" });
		}
		
		const user = await User.findById(decoded.id).select("-password");
		

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		next();
		
	} catch (err) {
		console.log("Error in protectRoute middleware", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};