const fetchNotes = async () => {
    // Fetch notes from the API

    const response = await fetch("http://127.0.0.1:8000/api/note/1");
    if (!response.ok) {
        throw new Error("Failed to fetch notes");
    }
    return response.json();
};

export default fetchNotes;
