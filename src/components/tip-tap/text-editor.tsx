"use client";

import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./tiptap.css";
import Toolbar from "./tool-bar";
import Image from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { Separator } from "../ui/separator";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
const TextEditor = () => {
  const [htmlString, sethtmlString] = useState("");
  const [render, setrender] = useState(false);
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
    content: "",
    editorProps: {
      attributes: {
        class: "flex w-full p-4 flex-col text-black",
      },
      transformPastedHTML: () => "",
      transformPastedText: () => "",
      editable: () => true,
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      sethtmlString(editor.getHTML().trim());
    },
  });

  return (
    <div className="flex flex-col w-full h-full items-center ">
      {render && (
        <div
          className="tiptap"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      )}
      <div className="flex flex-col w-full  h-[30rem]  border  rounded-lg">
        {editor && <Toolbar editor={editor} />}
        <Separator />
        <div className="h-full overflow-y-scroll w-full">
          <EditorContent editor={editor} />
        </div>
      </div>
      {/* <button
        className="bg-blue-500 text-white p-2 rounded-lg mt-4 w-full"
        onClick={() => setrender(true)}
      >
        submit
      </button> */}
    </div>
  );
};

export default TextEditor;
