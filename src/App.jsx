import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DirectorStyle from './pages/DirectorStyle';
import ScrollingStyle from './pages/ScrollingStyle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/director" element={<DirectorStyle />} />
        <Route path="/scrolling" element={<ScrollingStyle />} />
      </Routes>
    </Router>
  );
}

export default App;
