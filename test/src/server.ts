import express, { Request } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { JwtPayload } from "jsonwebtoken";

export type MyReq = Request & { secret: string; user: JwtPayload | string };

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: MyReq, res) => {
  res.status(200);
  res.json({
    message: req.secret,
  });
});

app.use("/api", protect, router);

export default app;
