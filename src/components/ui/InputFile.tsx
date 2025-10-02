import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropTypes {
  name: string;
  isDropable?: boolean;
  className?: string;
}

const InputFile = (props: PropTypes) => {
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const { name, className, isDropable = false } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setUploadImage(e.dataTransfer?.files?.[0] || null);
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);
      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      setUploadImage(files[0]);
    }
  };
  return (
    <label
      ref={drop}
      htmlFor={`dropzone-file-${dropzoneId}`}
      className={cn(
        "border-default-300 bg-default-50 hover:bg-default-100 flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed",
        className,
      )}
    >
      {/* render image preview */}
      {uploadImage ? (
        <div className="flex flex-col items-center justify-center p-5">
          <div className="mb-2 w-1/2">
            <Image
              fill
              src={URL.createObjectURL(uploadImage)}
              alt="image"
              className="!relative"
            />
            <p className="text-center text-sm font-semibold text-gray-500">
              {uploadImage.name}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5">
          <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
          <p className="text-center text-sm font-semibold text-gray-500">
            {isDropable
              ? "Click or drag and drop to upload an image"
              : "Click to upload an image"}
          </p>
        </div>
      )}

      <input
        name={name}
        type="file"
        className="hidden"
        accept="image/*"
        id={`dropzone-file-${dropzoneId}`}
        onChange={handleOnChange}
      />
    </label>
  );
};

export default InputFile;
