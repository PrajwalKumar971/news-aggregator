import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
