"use client";

import { NotesState } from "@/types/NotesType";
import notesService from "@/services/NotesService"
import { useState, useEffect } from "react";

const TakeNote = () => {
    const [content, setContent] = useState<string>("");
    // state de la fase de création
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

    // Fonction pour envoyer les données
    const handleSave = async () => {
        if (content) {

            const NotesData: NotesState = {
                text: content,
                resume: null,
                keyWord: null,
                globalCategory: null,
                userCategory: null,
            };

            if (await notesService.createNote(NotesData)) {
                setContent("");
                localStorage.removeItem("noteContent");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-full w-full p-4">
            {/* Title Area */}
            <div className="w-full max-w-3xl mb-6">
                <div className="h-4 bg-gray-300 w-1/4 mb-2 rounded"></div>
                <div className="h-6 bg-gray-300 w-1/2 rounded"></div>
            </div>

            {/* Main Content Area */}
            <main className="w-full max-w-3xl flex-grow flex flex-col border border-gray-300 shadow-md rounded-lg bg-white">
                <div className="bg-gray-800 p-3 flex space-x-2 rounded-t-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <section className="flex-grow p-4 bg-gray-100 rounded-b-lg">
                    <textarea
                        className="w-full h-full border-none resize-none bg-transparent outline-none text-gray-800 text-lg"
                        placeholder="Write your note..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </section>
            </main>

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
