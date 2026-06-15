import express from "express";
import cors from "cors";
import authMiddleware from "./middlewares/authMiddleware.js"
import authRoutes from "./routes/authRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"
import helmet from "helmet"

const app = express();
app.use(cors());
app.use(express.json());
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