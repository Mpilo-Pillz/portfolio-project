import React, { useRef } from "react";
import Button from "./Button";

import "./ImageUpload.css";

interface ImageUploadProps {
  id: string;
  center: boolean;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ id, center }) => {
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const pickImageHandler = () => {
    if (!filePickerRef.current) {
      return;
    }
    filePickerRef.current.click();
  };
  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    console.log(event.target);

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
