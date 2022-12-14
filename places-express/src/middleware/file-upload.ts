import multer from "multer";
import { Express, Request } from "express";
import { v1 as uuidv1 } from "uuid";
import path from "path";

interface FileFilterCallback {
  (error: Error): void;
  (error: null, acceptFile: boolean): void;
}

enum MimetypeEnum {
  PNG = "png",
  JPEG = "jpeg",
  JPG = "jpg",
}

const MIME_TYPE_MAP: { [key: string]: string } = {
  "image/png": MimetypeEnum.PNG as string,
  "image/jpeg": MimetypeEnum.JPEG as string,
  "image/jpg": MimetypeEnum.JPG as string,
};

const fileUpload = multer({
  limits: { fileSize: 500000 },
  storage: multer.diskStorage({
    destination: (
      req: Request,
      file,
      callback: (error: Error | null, destination: string) => void
    ) => {
      callback(null, path.join(__dirname, "../uploads/images"));
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void
    ): void => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      callback(null, `${uuidv1()}.${ext}`);
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: any
  ): void => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!")!;
    callback(error, isValid);
  },
});

export default fileUpload;
