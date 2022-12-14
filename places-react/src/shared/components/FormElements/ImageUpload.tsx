import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

import "./ImageUpload.css";

interface ImageUploadProps {
  id: string;
  center: boolean;
  onInput: (id: string, pickedFile: File | undefined, isValid: boolean) => void;
  errorText: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  center,
  onInput,
  errorText,
}) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<
    FileReader | ArrayBuffer | string | undefined | null
  >();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file); // does not work with callbacks does not return a promise
  }, [file]);

  const pickImageHandler = () => {
    if (!filePickerRef.current) {
      return;
    }
    filePickerRef.current.click();
  };

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
    }

    onInput(id, pickedFile, fileIsValid);
  };

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
          {previewUrl && <img src={previewUrl as string} alt="Preview" />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
