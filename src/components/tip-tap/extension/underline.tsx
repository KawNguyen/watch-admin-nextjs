import React from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Underline } from "lucide-react";
interface UnderlineElementProps {
  editor: Editor;
}
const UnderlineElement: React.FC<UnderlineElementProps> = ({ editor }) => {
  return (
    <Button onClick={() => editor.chain().focus().toggleUnderline().run()}>
      <Underline />
    </Button>
  );
};

export default UnderlineElement;
