export default function MenuBar({
    editor,
}: any & { isResume: boolean }) {
    if (!editor) {
        return null;
    }

    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`w-30 h-fit bg-red-500 rounded ${
                    editor.isActive("bold") ? "is-active" : ""
                }`}
            >
                Bold (Ctrl + B)
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`w-30 h-fit bg-yellow-500 rounded ${
                    editor.isActive("italic") ? "is-active" : ""
                }`}
            >
                Italic (Ctrl + I)
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`w-40 h-fit bg-blue-500 rounded ${
                    editor.isActive("underline") ? "is-active" : ""
                }`}
            >
                Underline (Ctrl + U)
            </button>
        </>
    );
}
