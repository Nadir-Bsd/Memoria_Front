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
     * @param Note - L'objet NotesState contenant les données de la note
     * @returns La note créée
     * @throws Une erreur si la requête échoue  
     */
    async createNote(Note: NotesState): Promise<NotesData>   {
        try {

            const NotesData = {
                text: Note.text,
                resume: Note.resume || null,
                keyWord: Note.keyWord || null,
                globalCategory: Note.globalCategory || null,
                userCategory: Note.userCategory || null,
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

    /**
     * Récupère toutes les notes
     * @param NotesData - L'objet NotesData contenant les données de la note
     * @returns la note mise à jour
     */
    async updateNote(note: NotesData): Promise<NotesData> {
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

    /**
     * Supprime une note
     * @param noteId - L'ID de la note à supprimer
     * @returns true si la note a été supprimée, sinon false
     */
    async deleteNote(noteId: string): Promise<boolean> {
        try {
            const response = await fetch(`${API_URL}/note/${noteId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/ld+json",
                    Authorization: `Bearer ${API_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error("Erreur lors de la suppression de la note :", error);
            return false;
        }
    }
}

const notesService = new NotesService();
export default notesService;
