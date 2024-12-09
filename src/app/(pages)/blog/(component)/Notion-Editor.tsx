"use client";
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const BlogEditor = () => {
  //   const [title, setTitle] = useState("untitled");

  return (
    <>
      <ReactQuill
        value={""}
        readOnly={true}
        theme="snow"
        modules={{ toolbar: false }}
        className="h-full"
      />
    </>
  );
};
