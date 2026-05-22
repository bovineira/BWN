import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GtmParentShell from './components/GtmParentShell';
import SetorImobiliario from './components/SetorImobiliario';
import SetorSaude from './components/SetorSaude';
import SetorDelivery from './components/SetorDelivery';
import ObrigadoPage from './components/ObrigadoPage';
import LandingBWNMidia from './components/LandingBWNMidia';
import AgendaDelivery from './components/AgendaDelivery';
import AgenciaEmbed from './components/AgenciaEmbed';
import FormDeliveryEmbed from './components/FormDeliveryEmbed';
import FormClinicaEmbed from './components/FormClinicaEmbed';

function App() {
  return (
    <Router>
      <GtmParentShell />
      <Routes>
        <Route path="/" element={<Navigate to="/agencia" replace />} />
        <Route path="/midia" element={<LandingBWNMidia />} />
        <Route path="/agenda-delivery" element={<AgendaDelivery />} />
        <Route path="/agencia" element={<AgenciaEmbed />} />
        <Route path="/form-delivery" element={<FormDeliveryEmbed />} />
        <Route path="/form-clinica" element={<FormClinicaEmbed />} />
        <Route path="/imobiliario" element={<SetorImobiliario />} />
        <Route path="/saude" element={<SetorSaude />} />
        <Route path="/delivery" element={<SetorDelivery />} />
        <Route path="/obrigado" element={<ObrigadoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
