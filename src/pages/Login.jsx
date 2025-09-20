

import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const handleOnClickSubmit = () => {
        navigate('/');
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
                {/* Tiêu đề */}
                <h2 className="text-2xl font-bold text-center mb-2">Chào mừng bạn đã trở lại</h2>
                <p className="text-gray-500 text-center mb-6">
                    Vui lòng đăng nhập để tiếp tục
                </p>

                {/* Form */}
                <form className="flex flex-col gap-4">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập của bạn"
                            className="w-full px-4 py-2 border rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            className="w-full px-4 py-2 border rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                        onClick={handleOnClickSubmit}
                    >
                        Đăng nhập
                    </button>
                </form>

                {/* Links */}
                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-gray-500 hover:underline">
                        Quên mật khẩu?
                    </a>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                    Bạn chưa có tài khoản?
                    <Link to="/signup" className="text-purple-600 font-medium hover:underline">
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
