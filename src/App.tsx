import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import "../src/index.css";
import CreatePost from "./pages/create-posts/CreatePost";

function App() {
  return (
    <main className="bg-gray-100 min-h-screen w-[full] font-dm">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<CreatePost />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
