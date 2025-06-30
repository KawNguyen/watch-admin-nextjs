"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, UploadCloud } from "lucide-react";

interface ImageDropzoneProps {
  preview?: string;
  onDrop: (file: File) => void;
  onRemove: () => void;
}

const ImageDropzone = ({ preview, onDrop, onRemove }: ImageDropzoneProps) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onDrop(acceptedFiles[0]);
      }
    },
    [onDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full max-w-md border-2 border-dashed rounded-2xl p-8 cursor-pointer text-center transition-transform duration-200 ease-in-out
        ${
          isDragActive
            ? "border-blue-400 bg-blue-50 scale-105"
            : "border-muted bg-muted/10 hover:bg-muted/20 hover:scale-105"
        }`}
      >
        <input {...getInputProps()} />

        <UploadCloud className="w-8 h-8 text-muted mb-2" />
        <p className="text-sm font-medium">
          {isDragActive
            ? "Drop the image here..."
            : "Click or drag your logo image here to upload"}
        </p>
        <p className="text-xs text-muted">
          Supported formats: JPG, PNG, GIF, WEBP
        </p>
      </div>

      {/* Preview (outside of dropzone) */}
      {preview && (
        <div className="relative w-[160px] h-[160px] rounded-xl overflow-hidden shadow-md bg-white border">
          <Image
            src={preview}
            alt="Preview"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full shadow-sm"
            onClick={onRemove}
          >
            <X className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
