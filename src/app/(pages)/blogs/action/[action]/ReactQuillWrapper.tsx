"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type ReactQuillWrapperProps = {
  value: string;
  onChange: (value: string) => void;
};

const ReactQuillWrapper = React.forwardRef<typeof ReactQuill, ReactQuillWrapperProps>(
  ({ value, onChange }, ref) => {
    const quillRef = useRef<typeof ReactQuill | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false); // Clean up on unmount
    }, []);

    useEffect(() => {
      if (ref && typeof ref === "function") {
        ref(quillRef.current);
      } else if (ref) {
        (ref as React.MutableRefObject<typeof ReactQuill  | null>).current = quillRef.current;
      }
    }, [ref]);

    if (!mounted) {
      return <div>Loading editor...</div>; // Avoid rendering until mounted
    }

    return (
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
      />
    );
  }
);

ReactQuillWrapper.displayName = "ReactQuillWrapper";

export default ReactQuillWrapper;
