import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware pour la gestion de l'authentification
function authMiddleware(request: NextRequest) {
    // Exclure les requêtes pour les ressources statiques
    if (
        request.nextUrl.pathname.startsWith("/_next/") || // Fichiers générés par Next.js
        request.nextUrl.pathname.startsWith("/static/")  // Fichiers statiques personnalisés
    ) {
        return NextResponse.next();
    }

    // Si l'utilisateur n'est pas sur la page d'accueil ou la page de connection
    if (request.nextUrl.pathname !== "/connection") {
        return NextResponse.redirect(new URL("/connection", request.url));
    }

    return NextResponse.next();
}

// Middleware principal
export function middleware(request: NextRequest) {
    // Vérifier si le token est présent
    const token = request.cookies.get("auth_token")?.value;

    // Si le token est absent, appliquer la logique du authMiddleware
    if (!token) {
        return authMiddleware(request);
    }

    // Si le token est présent, ne rien faire
    return NextResponse.next();
}