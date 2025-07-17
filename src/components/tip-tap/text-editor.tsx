"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./tiptap.css";
import Toolbar from "./tool-bar";
import Image from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Separator } from "../ui/separator";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Bold,
      OrderedList,
      ListItem,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[300px] flex w-full p-4 flex-col text-black",
      },
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      const html = editor.getHTML().trim();
      onChange(html);
    },
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML().trim()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col w-full h-full border rounded-lg">
        {editor && <Toolbar editor={editor} />}
        <Separator />
        <div className="h-full overflow-y-scroll w-full">
          <EditorContent className="h-full" editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
