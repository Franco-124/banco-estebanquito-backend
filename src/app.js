import express from "express";
import cors from "cors";
import router from "./routes/usuarios.routes.js";

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));


app.use(express.json());
app.use(router);

export default app;