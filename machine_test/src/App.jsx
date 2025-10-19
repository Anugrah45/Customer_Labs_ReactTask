import React, { useState } from "react";
import SidebarModal from "./Components/Sidebar";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex items-start bg-gray-300">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border-2 border-white text-white text-lg rounded-sm hover:bg-gray-400 transition-colors font-medium"
      >
        Save segment
      </button>

      {isOpen && <SidebarModal onClose={() => setIsOpen(false)} setIsOpen={setIsOpen} isOpen={isOpen} />}
    </div>
  );
};

export default App;
