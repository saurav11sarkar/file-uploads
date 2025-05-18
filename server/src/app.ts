import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import router from "./routers/routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
  });
});

export default app;
