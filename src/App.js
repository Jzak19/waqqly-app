import './App.css';
import HomePage from './components/pages/homePage.js'
import Register from './components/pages/registerPage.js';
import SignIn from './components/pages/signIn.js'
import UserPage from './components/pages/userPage.js';
import MapPage from './components/pages/mapPage.js';
import RegisterChoicePage from './components/pages/registerChoicePage.js';
import JobPage from './components/pages/jobPage.js';
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';



function App() {
  return (
  <>
   
    <Router>

        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/registerPage' exact element={<Register />} />
          <Route path='/signIn' exact element = {<SignIn />} />
          <Route path='/userProfile' exact element={<UserPage/>}/>
          <Route path='/mapPage' exact element={<MapPage/>}/>
          <Route path='/RegisterChoicePage' exact element={<RegisterChoicePage/>}/>
          <Route path='/jobpage' exact element={<JobPage/>}/>
        </Routes>
     
    </Router>
  </>
  );
}

export default App;
