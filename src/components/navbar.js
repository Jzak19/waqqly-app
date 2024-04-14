import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';
import { browserSessionPersistence, getAuth, onAuthStateChanged, setPersistence, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";

import { useState, useEffect} from 'react';




import './navbar.css'

const firebaseConfig = {
  apiKey: 'AIzaSyAXcxbhAdl5YDuR-olC1-mBVlND064Zm5s',
  databaseURL: "https://waqqly-app-default-rtdb.europe-west1.firebasedatabase.app/",

}

const app = initializeApp(firebaseConfig);

const auth = getAuth();

setPersistence(auth, browserSessionPersistence)

let status = auth.currentUser



function signOutFunc () {
  signOut(auth).then(() => {
    console.log('SIGNED OUT')
    window.location.reload();
  }).catch((error) => {
    console.log(error)
    window.location.reload();
  });
}




function Navbar () {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  const urlParams = new URLSearchParams(window.location.search);
  const type =  urlParams.get('type')
  const search = urlParams.get('param')
  const key = urlParams.get('key')
  console.log(search)
  console.log(type)
  console.log('key : ' + key)

  const homeURL = '/waqqly-app?search=' + search + '&type=' + type + '&key=' + key

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setIsLoggedIn(user ? true : false);
      });

      return () => unsubscribe();
    }, []);

    return(

    <>
    <div class="navbar">
        
        <Link to={homeURL}><a className='title' href="#">Waqq.ly</a></Link>

          {isLoggedIn ? (
            <>
                <div className="a" onClick={signOutFunc}><Link to='/'><a href="#">Sign Out</a></Link></div>
                <div className="a"><Link to={`/userProfile?key=${key}&type=${type}`}><a href="#">Profile</a></Link></div>
            </>

          ) : (
            <>
              <div className="a"><Link to='/signIn?type=unknown'><a href="#">Sign In</a></Link></div>
              <div className="a"><Link to='/RegisterChoicePage'><a href="#">Register</a></Link></div>
            </>
            
          )}

          <div className="hamburger" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

      </div>


      <div className="sideMenu" style={{left: isMenuOpen ? '0' : '100%'}}>
        {isLoggedIn ? (
              <>
                  <div className="a" onClick={signOutFunc}><Link to='/'><a href="#">Sign Out</a></Link></div>
                  <div className="a"><Link to={`/userProfile?key=${key}&type=${type}`}><a href="#">Profile</a></Link></div>
              </>

            ) : (
              <>
                <div className="a"><Link to='/signIn?type=unknown'><a href="#">Sign In</a></Link></div>
                <div className="a"><Link to='/RegisterChoicePage'><a href="#">Register</a></Link></div>
              </>
              
            )}
      </div>
    </>
    
    )
}

export default Navbar