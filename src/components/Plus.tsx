import { JSX } from "react";
import { FaPlus } from "react-icons/fa"; // Importer l'icône "Plus" de Font Awesome
import Link from "next/link";

interface PlusProps {
    pageActuel?: string; // Pour différencier l'affichage navbar vs page complète
}

const Plus = ({pageActuel = "boite de leitner"}: PlusProps): JSX.Element => {
    return(
        <>
           <p>Bienvenue ! Cliquez sur le bouton "+" ci-dessous pour créer votre première {pageActuel}.</p>
            <Link href="/Notes/TakeNote">
                <FaPlus /> {/* Icône Plus */}
            </Link>
        </>
    )
}

export default Plus;