import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Admissions from "./pages/Admissions";
import Academics from "./pages/Academics";
import Contact from "./pages/Contact";
import Story from "./pages/Story";
import Blog from "./pages/Blog";
import SingleBlog from "./pages/SingleBlog";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import CreatePost from "./pages/CreatePost";
import AllPosts from "./pages/AllPosts";
import EditPost from "./pages/EditPost";
import AdminGallery from "./pages/AdminGallery";
import AddImages from "./pages/AddImages";
import Login from "./pages/Login";
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/story" element={<Story />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/all-posts"
            element={
              <ProtectedRoute>
                <AllPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-images"
            element={
              <ProtectedRoute>
                <AddImages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-post/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
