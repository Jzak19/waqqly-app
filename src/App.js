import './App.css';
import Home from './components/pages/homePage.js'
import OwnerRegister from './components/pages/ownerRegister.js'
import WalkerRegister from './components/pages/walkerRegister.js';
import SignIn from './components/pages/signIn.js'
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
  <>
   
    <Router>

        <Routes>
          <Route path='/waqqly-app' exact element={<Home />} />
          <Route path='/ownerRegister' exact element={<OwnerRegister />} />
          <Route path='/walkerRegister' exact element={<WalkerRegister />} />
          <Route path='/signIn' exact element = {<SignIn />} />
        </Routes>
     
    </Router>
  </>
  );
}

export default App;
