"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";
import { AuthState, LoginFormData, RegisterFormData } from "@/types/authType";

// Création du contexte d'authentification
interface AuthContextType extends AuthState {
    login: (data: LoginFormData) => Promise<void>;
    register: (data: RegisterFormData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// État initial
const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

// connecte user, redirige vers home et cree un context avec le token
export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>(initialState);
    const router = useRouter();

    // Fonction de connection
    const login = async (data: LoginFormData) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            // returns le token, les infos utilisateur et stocke le token dans le cookie, localStorage ou sessionStorage
            const { user } = await authService.login(data);

            setState({
                user,
                isLoading: false,
                error: null,
                isAuthenticated: true,
            });

            router.push("/");
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Échec de la connection",
                isAuthenticated: false,
            }));
        }
    };

    // Fonction d'inscription
    const register = async (data: RegisterFormData) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const { user } = await authService.register(data);

            setState({
                user,
                isLoading: false,
                error: null,
                isAuthenticated: true,
            });

            router.push("/connection?registered=true");
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Échec de l'inscription",
                isAuthenticated: false,
            }));
        }
    };

    // Fonction de déconnexion
    const logout = () => {
        authService.logout();
        setState({
            ...initialState,
            isLoading: false,
        });
        router.push("/connection");
    };

    // Mémoisation des valeurs du contexte pour éviter les re-rendus inutiles
    const value = useMemo(
        () => ({
            ...state,
            login,
            register,
            logout,
        }),
        [state]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte d'authentification
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error(
            "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
        );
    }

    return context;
}
