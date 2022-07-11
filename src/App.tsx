import './App.css';
import { useUser } from './context/AuthContext';
import { useRoutes } from 'react-router';
import routes from './routes/routes';

function App() {
  const { user } = useUser();

  const content = useRoutes(routes({ user }));

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
