"use client";

import { NotesState, Note, NotesData } from "@/types/NotesType";
import notesService from "@/services/NotesService";
import noteService from "@/Provider/NotesProvider";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TextEditor from "@/components/TextEditor/TextEditor";
import { useContent } from "@/Provider/ContentNoteProvider";

const TakeNote = () => {
    const { content, setContent } = useContent();
    // note Acctual
    const [acctualNote, setAcctualNote] = useState<Note | null>(null);
    // state de la phase de création
    const [isResume, setIsResume] = useState<boolean>(false);
    // state pour UPDATE
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const searchParams = useSearchParams();

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
            const NotesData: NotesState = {
                text: content,
                resume: null,
                keyWord: null,
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
            const NotesData: NotesData = {
                id: acctualNote["@id"].split("/").pop() as string,
                text: isUpdate ? content : acctualNote.text,
                resume: isResume ? content : acctualNote.resume || null,
                keyWord: acctualNote.keyWord || null,
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
                setAcctualNote(AcctualNoteData);
            }
        }
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
                <div className="w-[30%] max-w-3xl mb-6">
                    <div className="h-4 bg-gray-300 w-1/4 mb-2 rounded"></div>
                    <div className="h-6 bg-gray-300 w-1/2 rounded"></div>
                </div>

                {/* key words */}
                {isResume && (
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
                        <p className="text-gray-800 text-lg">
                            {acctualNote?.text}
                        </p>
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
