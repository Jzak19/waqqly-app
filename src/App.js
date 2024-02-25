import './App.css';
import Home from './components/pages/homePage.js'
import Register from './components/pages/registerPage.js';
import SignIn from './components/pages/signIn.js'
import UserPage from './components/pages/userPage.js';
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
  <>
   
    <Router>

        <Routes>
          <Route path='/waqqly-app' exact element={<Home />} />

          <Route path='/registerPage' exact element={<Register />} />
          <Route path='/signIn' exact element = {<SignIn />} />
          <Route path='/userProfile' exact element={<UserPage/>}/>
        </Routes>
     
    </Router>
  </>
  );
}

export default App;
