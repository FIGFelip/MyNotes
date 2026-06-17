import express from "express";
import cors from "cors";
import authMiddleware from "./middlewares/user/authMiddleware.js"
import authRoutes from "./routes/authRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"
import helmet from "helmet"

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json({limit:"200kb"}));
app.use(helmet())

app.get("/", (req, res) => {
  res.json({
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/auth", authRoutes)
app.use("/notes",authMiddleware, noteRoutes)

export default app