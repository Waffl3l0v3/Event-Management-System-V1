import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import {connectDB} from "./config/connectMongoDB.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', authRoutes);
// if (process.env.NODE_ENV ==	= "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.get("/", (req,res) => {
	res.send("Server is ready");
})

console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
	// console.log(`MONGO_URI=`${process.env.MONGO_URI});
});
