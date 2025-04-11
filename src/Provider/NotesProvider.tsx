const fetchNotes = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // Fetch notes from the API

    const response = await fetch(`${API_URL}/note/1`);
    if (!response.ok) {
        throw new Error("Failed to fetch notes");
    }
    return response.json();
};

export default fetchNotes;
