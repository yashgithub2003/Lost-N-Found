import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "https://lost-n-found-two-sigma.vercel.app",
  credentials: true,
}));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
