import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./page/Login/Login";
import { Register } from "./page/Register/register";
import {Home} from "./page/homePage/home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
