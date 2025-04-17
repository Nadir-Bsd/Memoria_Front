import authService from "@/services/authService";

class NotesProvider {
    private API_URL: string | undefined;
    private API_KEY: string | null;

    constructor() {
        this.API_URL = process.env.NEXT_PUBLIC_API_URL;
        this.API_KEY = authService.getToken();
    }

    async fetchNotes() {
        const response = await fetch(`${this.API_URL}/notes`, {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${this.API_KEY}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch notes");
        }
        return response.json();
    }

    async fetchNote(id: string) {
        const response = await fetch(`${this.API_URL}/note/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${this.API_KEY}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch note");
        }
        return response.json();
    }
}

const noteService = new NotesProvider();
export default noteService;