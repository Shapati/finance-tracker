import { BrowserRouter as Router , Routes,Route,Navigate } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import {useAuthContext} from './hooks/useAuthContext'
function App() {

  const {authIsReady,user} = useAuthContext()

  return (
   <div className="App">
       {authIsReady && (<Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={user? <Home /> : <Navigate to='/signup' /> } />
          
          <Route path='/login'  element={user? <Navigate to='/'/> : <Login />} />
          <Route path='/signup' element={user? <Navigate to='/'/> : <Signup />} />
        </Routes>
      </Router>
       )}
    </div>
  );
}

export default App;
