import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './index';
import Tarefas from './tarefas';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tarefas/" element={<Tarefas />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
