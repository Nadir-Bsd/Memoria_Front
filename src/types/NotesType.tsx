export interface Note {
    "@id": string;
    title: string | null;
    text: string;
    resume: string | null;
    keyWord: string | null;
    globalCategory: string | null;
    userCategory: string | null;
}

export interface NotesState {
    title: string | null;
    text: string;
    resume: string | null;
    keyWord: string | null;
    globalCategory: string | null;
    userCategory: string | null;    
}

export interface NotesData {
    id: string;
    title: string | null;
    text: string;
    resume: string | null;
    keyWord: string | null;
    globalCategory: string | null;
    userCategory: string | null;
}

//   export interface AuthState {
//     user: User | null;
//     isLoading: boolean;
//     error: string | null;
//     isAuthenticated: boolean;
//   }
