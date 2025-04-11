import Plus from "@/components/Plus";
import { JSX } from "react";

const Notes = (): JSX.Element => {
    return (
        <>
            {/* filters et new Note */}
            <div>
                <div>{/* mettre les filtres ICI */}</div>
                <button>{/* le button new Note ICI */}</button>
            </div>
            {/* if the user already have note show notes else show Plus component */}
            {notes ? (
                <div>
                    {/* map notes here */}
                    {notes.map((note) => (
                        <div key={note.id}>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {/* mettre le composant Plus ici */}
                    <Plus pageActuel="notes" />
                </div>
            )} 
        </>
    );
};

export default Notes;
