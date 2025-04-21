"use client";

import Plus from "@/components/Plus";
import noteService from "@/Provider/NotesProvider";
import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { Notes } from "@/types/NotesType";


const NotesPage = (): JSX.Element => {
    const [notes, setNotes] = useState<Notes | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await noteService.fetchNotes();
                setNotes(data.member);
            } catch (err) {
                setError("Failed to fetch notes");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col justify-between items-center mb-4 w-[90%] h-[100%] rounded-md p-2">
            {/* if the user already have note show notes else show Plus component */}
            {notes && Array.isArray(notes) && notes.length > 0 ? (
                <>
                    {/* filters et new Note */}
                    <div className="flex justify-between items-center mb-4 bg-amber-50 w-[90%] h-12 rounded-md p-2">
                        <div className="flex gap-2 h-[100%]">
                            <button className="bg-amber-950 rounded-md h-[100%]">
                                New
                            </button>
                            <button className="bg-amber-950 rounded-md h-[100%]">
                                New
                            </button>
                            <button className="bg-amber-950 rounded-md h-[100%]">
                                New
                            </button>
                            <button className="bg-amber-950 rounded-md h-[100%]">
                                New
                            </button>
                        </div>
                        <Link
                            href="/Notes/TakeNote"
                            className="bg-amber-950 rounded-md h-[100%]"
                        >
                            new Note
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {notes.map((note, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-4 w-[300px] h-[200px] flex flex-col  items-center border border-gray-300"
                            >
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2 w-full">
                                    <span className="bg-gray-200 rounded-full px-2 py-1 text-sm text-gray-700">
                                        {note.resume ? "un resume" : "pas de resume"}
                                    </span>
                                    <span className="bg-gray-200 rounded-full px-2 py-1 text-sm text-gray-700">
                                        {note.keyWord}
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold text-gray-800 mt-2 text-center">
                                    {note.text}
                                </h2>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    {/* mettre le composant Plus ici */}
                    <Plus pageActuel="notes" />
                </>
            )}
        </div>
    );
};

export default NotesPage;
