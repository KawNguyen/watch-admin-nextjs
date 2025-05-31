"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, UploadCloud } from "lucide-react";

type ImageDropzoneProps = {
  preview: string | null;
  onDrop: (file: File) => void;
  onRemove: () => void;
};

const ImageDropzone = ({ preview, onDrop, onRemove }: ImageDropzoneProps) => {
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onDrop(acceptedFiles[0]);
    }
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
    maxFiles: 1,
  });

  return ( 
    <div className="relative">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer text-center transition
        ${isDragActive ? "border-blue-400 bg-blue-50" : "border-muted bg-muted/10 hover:bg-muted/20"}`}
      >
        <input {...getInputProps()} />

        <UploadCloud className="w-8 h-8 text-muted mb-2" />
        <p className="text-sm font-medium">
          {isDragActive
            ? "Drop the image here..."
            : "Click or drag your logo image here to upload"}
        </p>
        <p className="text-xs text-muted">Supported formats: JPG, PNG, GIF, WEBP</p>
      </div>

      {preview && (
        <div className="absolute top-2 right-2 w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md bg-white border">
          <Image
            src={preview}
            alt="Preview"
            width={120}
            height={120}
            className="object-cover w-full h-full"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
