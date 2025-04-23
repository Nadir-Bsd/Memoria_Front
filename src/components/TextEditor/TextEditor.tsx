"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "@/components/TextEditor/Menu-Bar";
import { useEffect } from "react";
import { useContent } from "@/Provider/ContentNoteProvider";

const TextEditor = ({ isResume }: { isResume: boolean }) => {
    const { content, setContent } = useContent();

    const editor = useEditor({
        extensions: [StarterKit],
        content: content || "<p></p>",
        editorProps: {
            attributes: {
                class: "text-gray-900 text-lg bg-white rounded-b-lg block w-full p-2.5 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            const updatedContent = editor.getHTML();
            setContent(updatedContent);
        },
    });

    // Set the content when the editor is initialized or when the content changes
    useEffect(() => {
        if (editor) {
            const currentContent = editor.getHTML();
            if (currentContent !== content) {
                editor.commands.setContent(content);
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
