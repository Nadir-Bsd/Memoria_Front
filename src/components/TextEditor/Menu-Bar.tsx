export default function MenuBar({
    editor,
    isResume,
}: any & { isResume: boolean }) {
    if (!editor) {
        return null;
    }

    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`w-3 h-3 bg-red-500 rounded-full ${
                    editor.isActive("bold") ? "is-active" : ""
                }`}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`w-3 h-3 bg-yellow-500 rounded-full ${
                    editor.isActive("italic") ? "is-active" : ""
                }`}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`w-3 h-3 bg-blue-500 rounded-full ${
                    editor.isActive("underline") ? "is-active" : ""
                }`}
            >
                Underline
            </button>
        </>
    );
}
