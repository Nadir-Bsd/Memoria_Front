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
        <>
            {/* filters et new Note */}
            <div>
                <div>{/* mettre les filtres ICI */}</div>
                <button>New</button>
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
        </>
    );
};

export default Notes;
