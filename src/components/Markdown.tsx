import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownPorops {
  children: string;
}

const Markdown = ({ children }: MarkdownPorops) => {
  return (
    <ReactMarkdown
      className="space-y-5"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        a: (props) => (
          <a className="text-green-500 hover:underline" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
