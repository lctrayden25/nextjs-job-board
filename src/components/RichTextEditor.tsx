"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { forwardRef } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//fixed window undefined and avoid render on server side
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const RichTextEditor = forwardRef<Object, EditorProps>((props, ref) => {
  return (
    <Editor
      editorClassName={cn(
        "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        props.editorClassName,
      )}
      toolbar={{
        options: ["inline", "list", "link", "history"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      editorRef={(r) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(r);
          } else if (typeof ref === "object") {
            ref.current = r;
          }
        }
      }}
      {...props}
    />
  );
});

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
