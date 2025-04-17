export interface Notes {
    id: string;
    text: string;
    resume: string | null;
    keyWord: string | null;
    globalCategory: string | null;
    userCategory: string | null;
}

export interface NotesState {
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
