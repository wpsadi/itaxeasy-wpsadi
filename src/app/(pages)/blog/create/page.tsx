"use client"; // Correct directive with a space

import "draft-js/dist/Draft.css"; // Import Draft.js styles

import { Editor, EditorState, Modifier, RichUtils } from "draft-js"; // Import Draft.js components
import React, { useCallback, useState } from "react";
import { FaBold, FaItalic, FaTextHeight, FaUnderline } from "react-icons/fa"; // Import icons for Bold, Italic, and Underline

import { ErrorPage } from "@/components/common/errorRaiser";
import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { LoadingScreen } from "@/components/common/Loader";
import { Button } from "@/components/ui/button"; // shadcn button
import { useUserTypeQuery } from "@/services/user/useUserTypeQuery";

export default function BlogEditor() {
  // Always call hooks at the top level
  const userTypeQuery = useUserTypeQuery();

  // State hooks
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Draft.js editor state
  const [fontSize, setFontSize] = useState("16px"); // State for selected font size
  const [fontFamily, setFontFamily] = useState("Arial"); // State for selected font family

  // Handle changes in editor content
  const onEditorChange = useCallback((state: EditorState) => {
    setEditorState(state);
    setContent(state.getCurrentContent().getPlainText()); // Convert editor content to plain text for saving
  }, []);

  // Function to handle applying text styles (bold, italic, underline)
  const handleStyleClick = (style: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newState);
  };

  // Function to handle changing font size
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    setFontSize(size);

    // Apply font size change to selected text in the editor
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const contentState = Modifier.applyInlineStyle(
      currentContent,
      selection,
      `FONT_SIZE_${size}`
    );
    const newEditorState = EditorState.push(
      editorState,
      contentState,
      "apply-entity"
    );
    setEditorState(newEditorState);
  };

  // Conditional rendering logic
  if (userTypeQuery.isPending) {
    return <LoadingScreen />;
  }

  if (userTypeQuery.isError) {
    return <ErrorPage message={"Some Error"} />;
  }

  if (userTypeQuery.data?.success === false) {
    return <ErrorPage message={userTypeQuery.data.message} />;
  }

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const family = e.target.value;
    setFontFamily(family);

    // Apply font family change to selected text in the editor
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const contentState = Modifier.applyInlineStyle(
      currentContent,
      selection,
      `FONT_FAMILY_${family}`
    );
    const newEditorState = EditorState.push(
      editorState,
      contentState,
      "apply-entity"
    );
    setEditorState(newEditorState);
  };

  const handleSavePost = () => {
    if (!title || !content) {
      alert("Please fill out the title and content fields.");
      return;
    }

    const blogPost = {
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    // Save post (For now, we log it. You can integrate with an API.)
    console.log("Blog Post Saved:", blogPost);
    alert("Blog post saved successfully!");

    // Reset fields
    setTitle("");
    setContent("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <>
      <HomeNavbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-3xl space-y-4">
          <div className="w-[50%]">
            <h1 className="text-3xl font-semibold mt-20 text-blue-600 mb-6">
              Create Your Own Blog
            </h1>
          </div>
          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-20 text-3xl p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Font Size Selector */}

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-md p-4">
            {/* Text Style Buttons */}
            <div className="flex space-x-2 mb-4">
              <Button
                className="bg-gray-200 text-black hover:bg-gray-300"
                onClick={() => handleStyleClick("BOLD")}
              >
                <FaBold />
              </Button>
              <Button
                className="bg-gray-200 text-black hover:bg-gray-300"
                onClick={() => handleStyleClick("ITALIC")}
              >
                <FaItalic />
              </Button>
              <Button
                className="bg-gray-200 text-black hover:bg-gray-300"
                onClick={() => handleStyleClick("UNDERLINE")}
              >
                <FaUnderline />
              </Button>
              <div className="mb-4 flex ">
                <Button className=" mr-1 bg-gray-200 hover:bg-gray-300 text-gray-700">
                  <FaTextHeight className="text-xl text-gray-700" />
                </Button>
                <select
                  title="Font Size"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="p-2 border rounded-lg"
                >
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="22px">22px</option>
                  <option value="24px">24px</option>
                </select>
              </div>
              <div className="mb-4">
                <select
                  title="Font Family"
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                  className="p-2 border rounded-lg"
                >
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>
            </div>
            <Editor
              editorState={editorState}
              onChange={onEditorChange}
              placeholder="Write your blog content here..."
              customStyleMap={{
                FONT_SIZE_16px: {
                  fontSize: "16px",
                },
                FONT_SIZE_18px: {
                  fontSize: "18px",
                },
                FONT_SIZE_20px: {
                  fontSize: "20px",
                },
                FONT_SIZE_22px: {
                  fontSize: "22px",
                },
                FONT_SIZE_24px: {
                  fontSize: "24px",
                },
                FONT_FAMILY_Arial: {
                  fontFamily: "Arial, sans-serif",
                },
                FONT_FAMILY_Georgia: {
                  fontFamily: "Georgia, serif",
                },
                FONT_FAMILY_TimesNewRoman: {
                  fontFamily: "'Times New Roman', serif",
                },
                FONT_FAMILY_CourierNew: {
                  fontFamily: "'Courier New', monospace",
                },
                FONT_FAMILY_Verdana: {
                  fontFamily: "Verdana, sans-serif",
                },
              }}
            />
          </div>

          {/* Save Button */}
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600 w-[20%]"
            onClick={handleSavePost}
          >
            Save Blog Post
          </Button>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}
