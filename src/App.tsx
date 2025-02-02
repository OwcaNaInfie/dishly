import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoutesConfig from './routes';
import './index.css'
import './output.css'
import 'notyf/notyf.min.css';

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
