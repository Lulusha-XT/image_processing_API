import express, { NextFunction, Request, Response } from "express";
import imageRouter from "./routes/images";
const app = express();
const PORT = 3050;

app.use("/api/images", imageRouter);

// Add in logging to record when images are processed or accessed.
app.use((req: Request, _: Response, next: NextFunction) => {
  console.log(
    `${req.method} ${req.path} filename:${req.query.filename} width:${req.query.width} height:${req.query.height}`
  );
  next();
});

app.get("/", (_, res) => {
  res.send("The server is working");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

export default app;
