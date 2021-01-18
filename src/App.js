import './App.css';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { UsuarioProvider } from './contexts/user';

export default function App() {
  return (
    <div className="App">
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
    </div>
  );
}
