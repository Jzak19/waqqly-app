import './App.css';
import HomePage from './components/pages/homePage.js'
import Register from './components/pages/registerPage.js';
import SignIn from './components/pages/signIn.js'
import UserPage from './components/pages/userPage.js';
import MapPage from './components/pages/mapPage.js';
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
  <>
   
    <Router>

        <Routes>
          <Route path='/waqqly-app' exact element={<HomePage />} />
          <Route path='/registerPage' exact element={<Register />} />
          <Route path='/signIn' exact element = {<SignIn />} />
          <Route path='/userProfile' exact element={<UserPage/>}/>
          <Route path='/mapPage' exact element={<MapPage/>}/>
        </Routes>
     
    </Router>
  </>
  );
}

export default App;
