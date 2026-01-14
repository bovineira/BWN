import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SetorImobiliario from './components/SetorImobiliario';
import SetorSaude from './components/SetorSaude';
import SetorDelivery from './components/SetorDelivery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/imobiliario" element={<SetorImobiliario />} />
        <Route path="/saude" element={<SetorSaude />} />
        <Route path="/delivery" element={<SetorDelivery />} />
      </Routes>
    </Router>
  );
}

export default App;
