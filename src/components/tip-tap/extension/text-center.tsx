import React from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface TextAlignElementProps {
  editor: Editor;
}

const TextAlign: React.FC<TextAlignElementProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="space-x-2">
      <Button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight />
      </Button>
    </div>
  );
};

export default TextAlign;
