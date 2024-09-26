import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HostForm from './pages/HostForm';
import HomePage from './pages/MainPage';  // Example of another page

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />    {/* Home page */}
          <Route path="/host" element={<HostForm />} /> {/* HostForm page */}
          {/* <Route path="/faqs" element={<FAQsPage/>} />
          <Route path="/memories" element={<Memories.jsx />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
