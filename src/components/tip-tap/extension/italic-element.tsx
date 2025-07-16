import React from "react";
import { Editor } from "@tiptap/react";
import { ItalicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ItalicElementProps {
  editor: Editor;
}
const ItalicElement: React.FC<ItalicElementProps> = ({ editor }) => {
  return (
    <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
      <ItalicIcon />
    </Button>
  );
};
export default ItalicElement;
