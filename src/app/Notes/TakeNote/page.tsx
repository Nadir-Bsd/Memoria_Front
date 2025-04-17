const TakeNote = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 h-full w-[90%]">
            {/* Title Area */}
            <div className="w-full max-w-2xl mb-4">
                <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                {/* Placeholder for short title line */}
                <div className="h-6 bg-gray-300 w-1/2"></div>
                {/* Placeholder for longer title line */}
            </div>
            {/* Main Content Area */}
            <main className="w-full max-w-2xl flex-grow flex flex-col border border-gray-300 rounded">
                {/* Added border and rounded corners */}
                <div className="bg-black p-2 flex space-x-2 rounded-t">
                    {/* Black header bar */}
                    <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
                    {/* Placeholder square */}
                    <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
                    {/* Placeholder square */}
                    <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
                    {/* Placeholder square */}
                </div>
                {/* Note Input */}
                <section className="flex-grow p-2 bg-gray-100 rounded-b">
                    {/* Light grey content area */}
                    <textarea
                        className="w-full h-full border-none resize-none bg-transparent outline-none text-black" // Basic styling
                        placeholder="Write your note..."
                    />
                </section>
            </main>
            <button className="bg-green-500 text-white px-6 py-2 rounded">
                Save {/* Button text */}
            </button>
        </div>
    );
};

export default TakeNote;
