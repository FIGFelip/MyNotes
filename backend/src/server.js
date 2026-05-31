import express from "express";
import cors from "cors";
import authMiddleware from "./middlewares/authMiddleware.js"
import authRoutes from "./routes/authRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"
import { WaitForDb } from "./config/waitForDb.js";
import pool from "./config/db.js";

await WaitForDb()

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/auth", authRoutes)
app.use("/notes",authMiddleware, noteRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server runnning at port ${PORT}`));
