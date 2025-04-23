"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useContent } from "@/Provider/ContentNoteProvider";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "@/components/TextEditor/Menu-Bar";
import DOMPurify from "dompurify";
import { useEffect } from "react";

const TextEditor = ({ isResume }: { isResume: boolean }) => {
    const { content, setContent } = useContent();
    const sanitizedContent = DOMPurify.sanitize(content);

    const editor = useEditor({
        extensions: [StarterKit],
        content: sanitizedContent || "<p></p>",
        editorProps: {
            attributes: {
                class: "text-gray-900 text-lg bg-white rounded-b-lg block w-full p-2.5 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            const updatedContent = DOMPurify.sanitize(editor.getHTML());
            setContent(updatedContent);
        },
    });

    // Set the content when the editor is initialized or when the content changes
    useEffect(() => {
        if (editor) {
            const currentContent = editor.getHTML();
            const sanitizedContent = DOMPurify.sanitize(content);
            if (currentContent !== sanitizedContent) {
                editor.commands.setContent(sanitizedContent);
            }
        }
    }, [editor, content]);

    return (
        <>
            <div className="bg-gray-800 p-3 flex space-x-2 rounded-t-lg">
                {isResume ? null : <MenuBar editor={editor} />}
            </div>
            {editor && <EditorContent editor={editor} />}
        </>
    );
};

export default TextEditor;
