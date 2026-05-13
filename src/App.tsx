import { Routes, Route, HashRouter } from "react-router-dom";
import Loginscreen from "./components/Loginscreen";
import Homepage from "./components/Hompage";
import Signup from "./components/Signup";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Loginscreen />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
