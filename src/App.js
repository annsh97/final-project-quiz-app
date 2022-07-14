import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import History from "./components/History/History";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/History" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
