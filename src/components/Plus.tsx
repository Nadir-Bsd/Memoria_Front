import { JSX } from "react";
import { FaPlus } from "react-icons/fa"; // Importer l'icône "Plus" de Font Awesome
import Link from "next/link";

interface PlusProps {
    pageActuel?: string; // Pour différencier l'affichage navbar vs page complète
}

const Plus = ({pageActuel = "boite de leitner"}: PlusProps): JSX.Element => {
    return(
        <div className="flex flex-col items-center justify-center gap-5 h-100">
           <p className="text-3xl font-semibold text-center leading-11">Bienvenue !<br /> Cliquez sur le bouton "+" ci-dessous pour créer votre première {pageActuel}.</p>
            <Link href="/Notes/TakeNote" className="text-white p-2 flex justify-center mt-4" aria-label="Créer une note">
                <FaPlus className="text-5xl border rounded-full hover:bg-gray-200 hover:text-black "/> {/* Icône Plus */}
            </Link>
        </div>
    )
}

export default Plus;