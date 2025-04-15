import authService from "@/services/authService";

const fetchNotes = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // get API token from authService
    const API_KEY =  authService.getToken();

    // Fetch notes from the API
    const response = await fetch(`${API_URL}/notes`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    if (!response.ok) {
        console.log("TEST");
        console.error("Failed to fetch notes:", response.statusText);
        throw new Error("Failed to fetch notes");
    }
    return response.json();
};

export default fetchNotes;
