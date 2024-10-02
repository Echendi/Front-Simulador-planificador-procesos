import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SimulationResult } from './pages/SimulationResult';
import { NewSimulation } from './pages/NewSimulation';
import Footer from './components/Footer/Footer';
import { Header } from './components/Header/Header';

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<NewSimulation />} />
          <Route path="/simulation-result" element={<SimulationResult />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
