import express from "express";
import cors from "cors";
import authMiddleware from "./middlewares/user/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import helmet from "helmet";
import pinoHttp from "pino-http";

const app = express();

app.use((req, res, next) => {
  console.log("Origin", req.headers.origin);
  next();
});


app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:3001",
    "http://192.168.1.113:3001",
  ],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("/{*path}", cors());
app.use(helmet());
app.use(express.json({ limit: "200kb" }));
const isTest = process.env.NODE_ENV === "test";
if (!isTest) {
  app.use(pinoHttp());
}
app.get("/", (req, res) => {
  res.json({
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/auth", authRoutes);
app.use("/notes", authMiddleware, noteRoutes);

export default app;
