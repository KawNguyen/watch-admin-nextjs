import React from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ListOrdered } from "lucide-react";
interface UnOrderedListProps {
  editor: Editor;
}
const UnOrderedList: React.FC<UnOrderedListProps> = ({ editor }) => {
  return (
    <Button onClick={() => editor.chain().focus().toggleBulletList().run()}>
      <ListOrdered />
    </Button>
  );
};

export default UnOrderedList;
