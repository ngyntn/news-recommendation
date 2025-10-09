import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, PlusSquare, User as ProfileIcon, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const currentUserId = '1';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                <ProfileIcon size={24} />
                <span className="font-medium text-sm hidden sm:block">Menu</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fade-in-down">
                    <ul className="p-2 space-y-1">
                        <li>
                            <Link to="/feed" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <Users size={20} />
                                <span>Bảng tin</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/create-post" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <PlusSquare size={20} />
                                <span>Tạo bài viết</span>
                            </Link>
                        </li>
                         <li>
                            <Link to={`/profile/${currentUserId}`} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <ProfileIcon size={20} />
                                <span>Trang cá nhân</span>
                            </Link>
                        </li>
                        <li className="border-t border-gray-200 dark:border-gray-700 my-1"></li>
                        <li className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                            <span>Chế độ tối</span>
                            <ThemeToggle />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;