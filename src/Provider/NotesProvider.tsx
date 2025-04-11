import { useState, useEffect } from "react";

interface Note {
    id: number;
    title: string;
    resume: string;
    key_words: string[];
}

interface FetchNotesResult {
    notes: Note[];
    loading: boolean;
    error: string | null;
}

const fetchNotes = (): FetchNotesResult => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch notes from the API
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/note/1");
                if (!response.ok) {
                    throw new Error("Failed to fetch notes");
                }
                const data = await response.json();
                setNotes(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message); // Accès sécurisé à la propriété `message`
                } else {
                    setError("An unknown error occurred"); // Gestion des erreurs non typées
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    return { notes, loading, error };
};

export default fetchNotes;