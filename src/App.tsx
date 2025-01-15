import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoutesConfig from './routes';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <RoutesConfig />
      </Router>
    </AuthProvider>
  );
}

export default App;
