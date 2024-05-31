import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: (process.env.NODE_ENV === "development") ? "*" : process.env.APP_URL,
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ Hello: "BYTEBOOK" });
});

app.use(routes);

export default app;
