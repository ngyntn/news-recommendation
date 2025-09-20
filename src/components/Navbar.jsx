
function Navbar() {
  return (
    <div className="flex justify-center fixed top-0 left-50 w-full bg-white z-50 py-4">
      <div className="relative w-full max-w-xs mt-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        </span>
        <input
          type="text"
          placeholder="Bạn muốn đọc gì hôm nay?"
          spellCheck="false"
          className="input input-bordered border w-full pl-10 pr-4 py-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
        />
      </div>

    </div>
  );
}

export default Navbar;
