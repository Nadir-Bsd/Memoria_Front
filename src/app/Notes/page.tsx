"use client";

import Plus from "@/components/Plus";
import fetchNotes from "@/Provider/NotesProvider";
import { log } from "node:console";
import { JSX, useEffect, useState } from "react";

export interface Note {
    "@id": string;
    "@type": string;
    text: string;
    resume: string;
    keyWord: string;
}

const Notes = (): JSX.Element => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchNotes();
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

    console.log("Notes data:", notes);

    return (
        <div className="flex flex-col justify-between items-center mb-4 w-[90%] h-[100%] rounded-md p-2">
            {/* filters et new Note */}
            <div className="flex justify-between items-center mb-4 bg-amber-50 w-[90%] h-12 rounded-md p-2">
                <div className="flex gap-2 h-[100%]">
                    <button className="bg-amber-950 rounded-md h-[100%]">New</button>
                    <button className="bg-amber-950 rounded-md h-[100%]">New</button>
                    <button className="bg-amber-950 rounded-md h-[100%]">New</button>
                    <button className="bg-amber-950 rounded-md h-[100%]">New</button>
                </div>
                <button className="bg-amber-950 rounded-md h-[100%]">New</button>
            </div>
            {/* if the user already have note show notes else show Plus component */}
            {notes && Array.isArray(notes) && notes.length > 0 ? (
                <div>
                    {notes.map((note, index) => (
                        <div key={index}>
                            <h2>{note.text}</h2>
                            <p>{note.resume}</p>
                            <p>{note.keyWord}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {/* mettre le composant Plus ici */}
                    <Plus pageActuel="notes" />
                </div>
            )}
        </div>
    );
};

export default Notes;
