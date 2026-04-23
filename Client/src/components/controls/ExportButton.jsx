import { exportSession } from "../../utils/exportSession";
import { useState } from "react";

export default function ExportButton() {
    const [exported, setExported] = useState(false);

    const handleExport = () => {
        exportSession();
        setExported(true);
        setTimeout(() => setExported(false), 2000);
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 border border-gray-700"
        >
            {exported ? "✅ Done!" : "📥 Export"}
        </button>
    );
}
