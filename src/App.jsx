import { useEffect } from "react"; 
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
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