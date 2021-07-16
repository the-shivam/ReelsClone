import './App.css';
import Signup from './component/Signup';
import AuthProvider from './context/AuthProvider';
import Signin from './component/Signin';

function App() {
  return (
    <AuthProvider>
      {/* <Signup></Signup> */}
      <Signin></Signin>
    </AuthProvider>
  );
}

export default App;
