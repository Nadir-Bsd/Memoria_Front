"use client";

import { NotesState, Notes } from "@/types/NotesType";
import notesService from "@/services/NotesService";
import noteService from "@/Provider/NotesProvider";
import { useState, useEffect } from "react";

const TakeNote = () => {
    // state de la note qui est en cours de création
    const [content, setContent] = useState<string>("");
    // note Acctual
    const [acctualNote, setAcctualNote] = useState<Notes | null>(null);
    // state de la phase de création
    const [isResume, setIsResume] = useState<boolean>(false);
    // state pour UPDATE
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    // Sauvegarde dans le localStorage à chaque modification
    useEffect(() => {
        // faire du debouncing
        const handler = setTimeout(() => {
            localStorage.setItem("noteContent", content);
        }, 800); // 800ms debounce time

        return () => {
            clearTimeout(handler);
        };
    }, [content]);

    // Récupère le contenu du localStorage au chargement
    useEffect(() => {
        const savedContent = localStorage.getItem("noteContent");
        if (savedContent) {
            setContent(savedContent);
        }
    }, []);

    // get les données de la note
    useEffect(() => {

        if (isResume) {
            const fetchNote = async () => {
                if (acctualNote) {
                    const note = await noteService.fetchNote(acctualNote.id);
                    setAcctualNote(note);
                    setContent(note.resume ? note.resume : "");
                }
            };
    
            fetchNote();
        }
    }, [isResume]);

    // Fonction pour envoyer les données
    const handleSave = async () => {

        // check dans quel phase on est !!!!

        if (content) {
            const NotesData: NotesState = {
                text: content,
                resume: null,
                keyWord: null,
                globalCategory: null,
                userCategory: null,
            };

            const AcctualNoteData = await notesService.createNote(NotesData);

            if (AcctualNoteData) {
                setContent("");
                localStorage.removeItem("noteContent");
                setIsResume(true);
                setAcctualNote(AcctualNoteData);
            }
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
                    <div className="w-[20%] h-full border border-gray-300 bg-gray-200 p-4 rounded-t-lg">
                        <p className="text-gray-800 text-lg">{acctualNote?.text}</p>
                    </div>
                )}

                {/* Text Area */}
                <div className="w-[70%] max-w-3xl flex-grow flex flex-col border border-gray-300 shadow-md rounded-lg">
                    <div className="bg-gray-800 p-3 flex space-x-2 rounded-t-lg">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-grow p-4 bg-gray-100 rounded-b-lg">
                        <textarea
                            className="w-full h-full border-none resize-none bg-transparent outline-none text-gray-800 text-lg"
                            placeholder="Write your note..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Save Button */}
            <button
                className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    );
};

export default TakeNote;
