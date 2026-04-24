export default function ThreeColumnLayout({ left, middle, right }) {
    return (
        <div className="flex flex-1 overflow-hidden">
            {/* Left Column — Transcript */}
            <div className="w-1/3 min-w-[280px] border-r border-purple-900/30 flex flex-col">
                {left}
            </div>

            {/* Middle Column — Suggestions */}
            <div className="w-1/3 min-w-[280px] border-r border-purple-900/30 flex flex-col">
                {middle}
            </div>

            {/* Right Column — Chat */}
            <div className="flex-1 min-w-[280px] flex flex-col">
                {right}
            </div>
        </div>
    );
}
