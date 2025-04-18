import { NotesState, NotesData } from "@/types/NotesType";
import authService from "@/services/authService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = authService.getToken();

/**
 * Gère les appels API liés aux notes
 */
class NotesService {
    
    /**
     * Crée une nouvelle note
     * @param Notes - L'objet NotesState contenant les données de la note
     * @returns La réponse de l'API
     */
    async createNote(
        Notes: NotesState
    ) {
        try {

            const NotesData = {
                text: Notes.text,
                resume: Notes.resume || null,
                keyWord: Notes.keyWord || null,
                globalCategory: Notes.globalCategory || null,
                userCategory: Notes.userCategory || null,
            }

            const response = await fetch(`${API_URL}/note`, {
                method: "POST",
                headers: {
                    Accept: "application/ld+json",
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify(NotesData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Erreur lors de la création de la note :", error);
            throw error;
        }
    }

    async updateNote(
        note: NotesData
    ) {
        try {

            const response = await fetch(`${API_URL}/note/${note.id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/ld+json",
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/merge-patch+json"
                },
                body: JSON.stringify(note),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour de la note :", error);
            throw error;
        }
    }
}

const notesService = new NotesService();
export default notesService;
