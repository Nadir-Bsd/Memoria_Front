"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// !CONTEXT
const ContentContext = createContext<{
    content: string;
    setContent: (value: string) => void;
} | null>(null);

// !PROVIDER
export const ContentProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState("");

    // Sauvegarde dans le localStorage à chaque modification
    useEffect(() => {
        // faire du debouncing
        const handler = setTimeout(() => {
            localStorage.setItem("noteContent", content);
        }, 800); // 800ms debounce time

        return () => {
            clearTimeout(handler);
        };
    }, [content]);
    

    return (
        <ContentContext.Provider value={{ content, setContent }}>
            {children}
        </ContentContext.Provider>
    );
};

// !HOOK
export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context;
};
