import authService from "@/services/authService";

const fetchNotes = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // get API token from authService
    const API_KEY = authService.getToken();

    // Fetch notes from the API
    const response = await fetch(`${API_URL}/notes`, {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch notes");
    }
    return response.json();
};

export default fetchNotes;
