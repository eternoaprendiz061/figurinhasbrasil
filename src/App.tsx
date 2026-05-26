import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { FormPage } from './pages/FormPage';
import { PaymentPage } from './pages/PaymentPage';
import { GeneratingPage } from './pages/GeneratingPage';
import { ResultPage } from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/criar" element={<FormPage />} />
        <Route path="/pagamento/:stickerId" element={<PaymentPage />} />
        <Route path="/gerando/:stickerId" element={<GeneratingPage />} />
        <Route path="/resultado/:stickerId" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
