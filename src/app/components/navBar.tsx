import React from "react";
import { FaStickyNote, FaBox, FaUser } from "react-icons/fa";
import Link from "next/link";
import Timer from "@/components/Timer";

function NavBar() {
    return (
        <header className="bg-black text-white w-full">
            <nav className="container mx-auto flex justify-between items-center py-4">
                {/* Left Section: Logo and Countdown */}
                <div className="flex items-center space-x-6">
                    <Link href="/" className="text-2xl font-bold">
                        <div className="text-lg font-bold">Memoria</div>
                    </Link>
                    <Timer isCompact={true} />
                </div>

                {/* Right Section: Functionalities */}
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            href="/Notes"
                            className="hover:text-gray-400 flex items-center space-x-2"
                        >
                            <FaStickyNote /> <span>Take Notes</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/LeitnerBox"
                            className="hover:text-gray-400 flex items-center space-x-2"
                        >
                            <FaBox /> <span>Leitner Box</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/Profile"
                            className="hover:text-gray-400 flex items-center space-x-2"
                        >
                            <FaUser /> <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
