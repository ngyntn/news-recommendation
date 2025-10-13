// src/pages/Register.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// (Bạn sẽ tạo hàm registerUser ở bước tiếp theo)
// import { registerUser } from '../api/userApi'; 

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        
        // **Lưu ý:** Dòng dispatch này sẽ hoạt động sau khi bạn cập nhật userApi.js
        /*
        dispatch(registerUser(formData))
            .unwrap()
            .then(() => {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                navigate('/login');
            })
            .catch((err) => {
                setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
            });
        */
       
        // Code tạm thời để chuyển trang
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black transition-colors">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">Tạo tài khoản mới</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                    Chào mừng bạn đến với cộng đồng!
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Họ và tên</label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Nhập họ và tên của bạn"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên đăng nhập</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Tên sẽ hiển thị với mọi người"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email của bạn"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu của bạn"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition mt-2"
                    >
                        Đăng ký
                    </button>
                </form>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                    Bạn đã có tài khoản?{' '}
                    <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;