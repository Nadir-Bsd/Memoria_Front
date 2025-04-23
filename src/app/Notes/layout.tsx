import { ContentProvider } from "@/Provider/ContentNoteProvider";

export default function NotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ContentProvider>{children}</ContentProvider>;
}
