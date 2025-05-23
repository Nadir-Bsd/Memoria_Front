"use client";

import { NotesState, Note, NotesData } from "@/types/NotesType";
import notesService from "@/services/NotesService";
import { useContent } from "@/Provider/ContentNoteProvider";
import noteService from "@/Provider/NotesProvider";
import TextEditor from "@/components/TextEditor/TextEditor";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const TakeNote = () => {
    const { content, setContent } = useContent();
    // note Acctual
    const [acctualNote, setAcctualNote] = useState<Note | null>(null);
    // state de la phase de création
    const [isResume, setIsResume] = useState<boolean>(false);
    // state pour UPDATE
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    // recupere la note dans le localStorage si isTarget est vrai dans l'URL, set accutalNote
    useEffect(() => {
        // get isTarget dans l'URL
        const isTarget = searchParams.get("isTarget");
        if (isTarget === "true") {
            const storedNote = localStorage.getItem("targetedNote");
            if (storedNote) {
                const note = JSON.parse(storedNote);
                setAcctualNote(note);
                setIsUpdate(true);
                setContent(note.text || "");
            }
        }
    }, []);

    // si acctualNote a un resume ou text en DB, on setContent pour Update phase ou Resume phase
    useEffect(() => {
        // si isResume phase est vrais on fetch note actuel, si resume dans note on setContent
        if (isResume) {
            const fetchNote = async () => {
                if (acctualNote) {
                    const note = await noteService.fetchNote(
                        acctualNote["@id"].split("/").pop() as string
                    );
                    setAcctualNote(note);
                    setContent(note.resume ? note.resume : "");
                }
            };

            fetchNote();
        } else if (isUpdate) {
            // si isUpdate phase est vrais on fetch note acctuel, si text dans note on setContent
            const fetchNote = async () => {
                if (acctualNote) {
                    const note = await noteService.fetchNote(
                        acctualNote["@id"].split("/").pop() as string
                    );
                    setAcctualNote(note);
                    setContent(note.text ? note.text : "");
                }
            };

            fetchNote();
        }
    }, [isResume, isUpdate]);

    // Nettoye le localStorage et le contexte lors du démontage du composant
    useEffect(() => {
        return () => {
            // Réinitialiser le contexte
            setContent("");

            // Supprimer les données du localStorage
            localStorage.removeItem("noteContent");
            localStorage.removeItem("targetedNote");
        };
    }, []);

    // Fonction pour creer une note via l'API
    const handleCreate = async () => {
        if (content) {
            const keywords = handleExtractKeywords(content);

            const NotesData: NotesState = {
                title: acctualNote?.title || null,
                text: content,
                resume: null,
                keyWord: keywords || null,
                globalCategory: null,
                userCategory: null,
            };

            var AcctualNoteData = await notesService.createNote(NotesData);

            if (AcctualNoteData) {
                setContent("");
                localStorage.removeItem("noteContent");
                setIsResume(true);
                setAcctualNote(AcctualNoteData);
            }
        }
    };

    // function pour update la note actuelle via l'API
    const handleUpdate = async () => {
        if (content && acctualNote !== null) {
            const keywords = handleExtractKeywords(content);

            const NotesData: NotesData = {
                id: acctualNote["@id"].split("/").pop() as string,
                title: acctualNote?.title || null,
                text: isUpdate ? content : acctualNote.text,
                resume: isResume ? content : acctualNote.resume || null,
                keyWord: isUpdate ? keywords : acctualNote.keyWord || null,
                globalCategory: acctualNote.globalCategory || null,
                userCategory: acctualNote.userCategory || null,
            };

            var AcctualNoteData = await notesService.updateNote(NotesData);

            if (isUpdate) {
                setIsUpdate(false);
                setIsResume(true);
                setContent(AcctualNoteData.resume || "");
            }

            if (AcctualNoteData) {
                console.log(AcctualNoteData);
                setAcctualNote(AcctualNoteData);
            }
        }
    };

    // Fonction pour supprimer la note actuelle
    const handleDelete = async () => {
        if (acctualNote) {
            await notesService.deleteNote(
                acctualNote["@id"].split("/").pop() as string
            );
            setAcctualNote(null);
            setContent("");
            setIsResume(false);
            setIsUpdate(false);
            localStorage.removeItem("targetedNote");
            localStorage.removeItem("noteContent");
            // move to the Notes page
            router.push("/Notes");
        }
    };

    // Fonction pour extraire les mots clés du texte
    const handleExtractKeywords = (text: string): string => {
        const regex = /<strong>(.*?)<\/strong>/g;
        const matches = [];
        let match;
        while ((match = regex.exec(text)) !== null) {
            matches.push(match[1]);
        }
        return matches.join(", ");
    };

    // faire un event si on click sur la div (the note wirte before) pour UpdatePhase
    const UpdatePhase = () => {
        // on envoie les modif en DB et set la note actuelle
        handleUpdate();
        // change les phases
        setIsResume(false);
        setIsUpdate(true);

        // set le content avec la note actuelle
        if (acctualNote) {
            setContent(acctualNote.text);
        } else {
            setContent("");
            setIsResume(false);
            setIsUpdate(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-full w-full p-4">
            {/* Title Area */}
            <section className="flex justify-between items-center w-[90%] bg-green-600">
                {/* Title Area */}
                <div className="w-[40%] h-full bg-amber-400">

                    {/* faire quelque chose pour modifier le title et que je useEffect s'acctive */}
                    <input
                        type="text"
                        value={acctualNote?.title || ""}
                        onChange={(e) => {
                            if (acctualNote) {
                                setAcctualNote({
                                    ...acctualNote,
                                    title: e.target.value,
                                });
                            }
                        }}
                        className="border border-gray-300 rounded p-2 w-full"
                    />

                    <div className="h-fit border-b-gray-300 border-2 rounded">
                        {!isResume
                            ? "Ici, écris ta note et mets en gras les mots qui sont importants (mots-clés). tu peux utiliser le bouton de la barre d'outils pour mettre en gras."
                            : "Ici, fais un résumé de ta note en réfléchissant aux connaissances de celle-ci."}
                    </div>
                </div>

                {/* key words */}
                {!isResume ? (
                    <div
                        onClick={handleDelete}
                        className="flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl h-10 w-20"
                    >
                        Delete
                    </div>
                ) : (
                    <div className="w-[30%] max-w-3xl mb-6 border-amber-300 border-2 rounded-lg p-4">
                        <p>{acctualNote?.keyWord || "No keywords available"}</p>
                    </div>
                )}
            </section>

            {/* Main Content Area */}
            <section className="flex items-center w-[90%] bg-yellow-950">
                {/* the Note wirte before */}
                {isResume && (
                    <div
                        className="w-[20%] h-full border border-gray-300 bg-gray-200 p-4 rounded-t-lg"
                        onClick={UpdatePhase}
                    >
                        <p
                            className="text-gray-800 text-lg"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    acctualNote?.text || ""
                                ),
                            }}
                        ></p>
                    </div>
                )}

                {/* Text Area */}
                <div className="w-[70%] max-w-3xl flex-grow flex flex-col border border-gray-300 shadow-md rounded-lg">
                    <TextEditor isResume={isResume} />
                </div>
            </section>

            {/* Save Button */}
            <button
                className={`bg-blue-600 text-white px-8 py-3 rounded-lg shadow relative overflow-hidden transition-all duration-500 ${
                    isResume ? "animate-pulse" : "hover:bg-blue-700"
                }`}
                onClick={isResume || isUpdate ? handleUpdate : handleCreate}
            >
                <span className="relative">Save</span>
            </button>
        </div>
    );
};

export default TakeNote;
