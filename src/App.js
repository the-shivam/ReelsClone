import './App.css';
import Signup from './component/Signup';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Signup></Signup>
    </AuthProvider>
  );
}

export default App;
