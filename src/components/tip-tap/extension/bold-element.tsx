import React from "react";
import { Editor } from "@tiptap/react";
import { Bold } from "lucide-react";
import { Button } from "@/components/ui/button";
interface BoldElementProps {
  editor: Editor;
}
const BoldElement: React.FC<BoldElementProps> = ({ editor }) => {
  return (
    <Button onClick={() => editor.chain().focus().toggleBold().run()}>
      <Bold />
    </Button>
  );
};

export default BoldElement;
