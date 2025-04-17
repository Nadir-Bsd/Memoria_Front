import { JSX } from "react";
import Link from "next/link";

interface PlusProps {
    pageActuel?: string; // Pour différencier l'affichage navbar vs page complète
}

const Plus = ({ pageActuel = "boite de leitner" }: PlusProps): JSX.Element => {
    return (
        <div className="flex flex-col items-center justify-center gap-5 h-100">
            <p className="text-3xl font-semibold text-center leading-11">
                Bienvenue !<br /> Cliquez sur le bouton "+" ci-dessous pour
                créer votre première {pageActuel}.
            </p>
            <Link
                href="/Notes/TakeNote"
                className="text-white p-2 flex justify-center mt-4"
                aria-label="Créer une note"
            >
                <button className="flex items-center justify-center w-16 h-16 border rounded-full text-white text-5xl hover:text-gray-600 hover:bg-gray-300 transition duration-300 ease-in-out">
                    +
                </button>
            </Link>
        </div>
    );
};

export default Plus;
