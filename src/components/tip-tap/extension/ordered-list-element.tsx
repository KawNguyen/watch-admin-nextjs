import React from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
interface OrderedListElementProps {
  editor: Editor;
}
const OrderedListElement: React.FC<OrderedListElementProps> = ({ editor }) => {
  return (
    <Button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
      <List />
    </Button>
  );
};

export default OrderedListElement;
