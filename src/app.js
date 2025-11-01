import express from "express";
import cors from "cors";
import usuarios from "./routes/usuarios.routes.js";
import auth from "./routes/auth.routes.js";

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));


app.use(express.json());
app.use(usuarios);
app.use(auth);

export default app;