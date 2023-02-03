import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";

type Input = {
  filename: string;
  width: number;
  height: number;
};

export const convertImage = async ({
  filename,
  width,
  height,
}: Input): Promise<string> => {
  const filepath = path.join(
    __dirname,
    "..",
    "..",
    "assets/full",
    `${filename}.jpg`
  );

  const savePath = path.join(
    __dirname,
    "..",
    "..",
    "assets/thumb",
    `${filename}-${width}x${height}.jpg`
  );

  // Check if the image already exists
  if (existsSync(savePath)) {
    return savePath;
  }

  await sharp(filepath)
    .resize({
      width: Number(width),
      height: Number(height),
    })
    .toFile(savePath);

  return savePath;
};
