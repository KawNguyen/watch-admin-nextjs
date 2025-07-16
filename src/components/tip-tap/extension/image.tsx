"use client";
import React, { ChangeEvent, useState } from "react";
import { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ImageProps {
  editor: Editor;
}

const ImageUploadUrl: React.FC<ImageProps> = ({ editor }) => {
  const [showModal, setshowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const insertUrl = () => {
    if (imageUrl) {
      console.log(imageUrl);

      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setshowModal(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={() => setshowModal(true)}>
        <ImageIcon />
      </Button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Insert Image via URL</h2>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="w-full border rounded px-3 py-2 mb-4 "
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                className="bg-white text-black px-4 py-2 rounded hover:bg-slate-100"
                onClick={() => setshowModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-black text-white px-4 py-2 rounded cursor-pointer"
                onClick={insertUrl}
              >
                Insert
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadUrl;
