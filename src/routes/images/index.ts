import { Request, Response, Router } from "express";
import { promises as fs } from "fs";
import { convertImage } from "../../utilities/resizeImage";

const imageRouter = Router();

imageRouter.get("/", async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  if (!filename || !width || !height) {
    return res.status(400).json({
      message: "filename, width and height query parameter is required",
    });
  }

  const files = (await fs.readdir(__dirname + "/../../../assets/full")).map(
    (file) => file.split(".")[0]
  );

  if (!files.includes(filename)) {
    return res.status(400).send(`
      <p>Invalid filename. Please use one of the following:</p>
      <ol>
      ${files
        .map(
          (file) => `
        <li>
          <a href="/api/images?filename=${file}&width=200&height=200">
            /api/images?filename=${file}&width=200&height=200
          </a>
        </li>`
        )
        .join("")}
      </ol>
    `);
  }

  try {
    const image = await convertImage({
      filename,
      width,
      height,
    });

    res.sendFile(image);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default imageRouter;
