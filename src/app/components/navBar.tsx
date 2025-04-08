import React from "react";
import { FaStickyNote, FaBox, FaUser } from "react-icons/fa";
function NavBar() {
    return (
        <header className="bg-gray-800 text-white">
            <nav className="container mx-auto flex justify-between items-center py-4">
                {/* Left Section: Logo and Countdown */}
                <div className="flex items-center space-x-6">
                    <div className="text-lg font-bold">Memoria</div>
                    {/* a travailer */}
                    <div className="text-sm font-mono bg-gray-700 px-3 py-1 rounded">
                        11:11
                    </div>
                </div>

                {/* Right Section: Functionalities */}
                <ul className="flex space-x-6">
                    <li>
                        <a href="/Notes" className="hover:text-gray-400 flex items-center space-x-2">
                            <FaStickyNote /> <span>Take Notes</span>
                        </a>
                    </li>
                    <li>
                        <a href="/LeitnerBox" className="hover:text-gray-400 flex items-center space-x-2">
                            <FaBox /> <span>Leitner Box</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Profile" className="hover:text-gray-400 flex items-center space-x-2">
                            <FaUser /> <span>Profile</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
