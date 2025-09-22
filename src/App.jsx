import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NewsDetail from "./pages/NewsDetail";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import SearchResult from "./pages/SearchResult";
import { Provider } from "react-redux";
import store from "./store/store";

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* nơi render Home */}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Route có navbar */}
          <Route element={<LayoutWithNavbar />}>
            <Route index element={<Home />} />
            <Route path="/search/:query" element={<SearchResult />} />
          </Route>

          {/* Route không có navbar */}
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;