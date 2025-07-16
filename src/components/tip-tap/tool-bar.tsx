import React from "react";

import { Editor } from "@tiptap/react";
import BoldElement from "./extension/bold-element";
import ItalicElement from "./extension/italic-element";
import OrderedListElement from "./extension/ordered-list-element";
import UnOrderedList from "./extension/unordered-list";
import TextCenter from "./extension/text-center";
import ImageUploadUrl from "./extension/image";
import UnderlineElement from "./extension/underline";

interface ToolbarProps {
  editor: Editor;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  return (
    <div className="flex p-4 gap-2">
      <ImageUploadUrl editor={editor} />
      <BoldElement editor={editor} />
      <ItalicElement editor={editor} />
      <OrderedListElement editor={editor} />
      <UnOrderedList editor={editor} />
      <TextCenter editor={editor} />
      <UnderlineElement editor={editor} />
    </div>
  );
};

export default Toolbar;
