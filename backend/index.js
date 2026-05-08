import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: "https://lost-n-found-9y4kmht5d-yash-adkes-projects.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
