import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (query.trim() === "" && location.pathname.startsWith('/search')) {
            navigate("/");
        }
    }, [query, navigate, location.pathname]);

    const handleSearch = () => {
        if (query.trim() !== "") {
            navigate(`/search/${query}`);
        } else {
            navigate("/");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex justify-center fixed top-0 left-0 w-full bg-white z-50 py-4 shadow-sm">
            <div className="relative w-full max-w-xs">
                <input
                    type="text"
                    placeholder="Bạn muốn đọc gì hôm nay?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                    className="input input-bordered border w-full pl-4 pr-10 py-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                />
                <button onClick={handleSearch} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Navbar;