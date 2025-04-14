"use client";

import Plus from "@/components/Plus";
import fetchNotes from "@/Provider/NotesProvider";
import { JSX, useEffect, useState } from "react";

const Notes = (): JSX.Element => {
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchNotes();
                setNotes(data);
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
        <>
            {/* filters et new Note */}
            <div>
                <div>{/* mettre les filtres ICI */}</div>
                <button>New</button>
            </div>
            {/* if the user already have note show notes else show Plus component */}
            {notes.length > 0 ? (
                <div>
                    {/* map notes here */}
                    {notes.map((note) => (
                        <div key={note.id}>
                            <h2>{note.title}</h2>
                            <p>{note.resume}</p>
                            <p>{note.key_words}</p>
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
