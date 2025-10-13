import { useEffect } from "react"; 
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NewsDetail from "./pages/NewsDetail";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import SearchResult from "./pages/SearchResult";
import { useDispatch, Provider } from "react-redux";
import store from "./store/store";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import EditProfile from "./pages/EditProfile";
import CreatePost from "./pages/CreatePost";

import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import ContentManagement from "./pages/admin/ContentManagement"; // Import mới
import ReportManagement from "./pages/admin/ReportManagement";
import { fetchCurrentUser } from "./api/userApi.js";

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <div className="pt-16"> 
        <Outlet />
      </div>
    </>
  );
}

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCurrentUser());
      }, [dispatch]);
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<LayoutWithNavbar />}>
            <Route index element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Route>

          <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="reports" element={<ReportManagement />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

function AppWrapper() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }

export default AppWrapper;