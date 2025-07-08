'use client';

import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';

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
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`flex w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-transform duration-200 ease-in-out ${
          isDragActive
            ? 'scale-105 border-blue-400 bg-blue-50'
            : 'border-muted bg-muted/10 hover:scale-105 hover:bg-muted/20'
        }`}
      >
        <input {...getInputProps()} />

        <UploadCloud className="mb-2 h-8 w-8 text-muted" />
        <p className="font-medium text-sm">
          {isDragActive
            ? 'Drop the image here...'
            : 'Click or drag your logo image here to upload'}
        </p>
        <p className="text-muted text-xs">
          Supported formats: JPG, PNG, GIF, WEBP
        </p>
      </div>

      {/* Preview (outside of dropzone) */}
      {preview && (
        <div className="relative h-[160px] w-[160px] overflow-hidden rounded-xl border bg-white shadow-md">
          <Image
            alt="Preview"
            className="h-full w-full object-cover"
            height={160}
            src={preview}
            width={160}
          />
          <Button
            className="absolute top-1 right-1 rounded-full bg-white/80 shadow-sm hover:bg-white"
            onClick={onRemove}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
