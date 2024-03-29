import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';
import { browserSessionPersistence, getAuth, onAuthStateChanged, setPersistence, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";

import './signInButton.css'
function signInButton({text, destination}) {

    const firebaseConfig = {
        apiKey: 'AIzaSyAXcxbhAdl5YDuR-olC1-mBVlND064Zm5s',
        databaseURL: "https://waqqly-app-default-rtdb.europe-west1.firebasedatabase.app/",
      
      }

    const urlParams = new URLSearchParams(window.location.search);
    const type =  urlParams.get('type')
    const search = urlParams.get('param')
    const key = urlParams.get('key')
    console.log(search)
    console.log(type)
    console.log('key : ' + key)

    let signedInURL = ''

    const app = initializeApp(firebaseConfig);

    const auth = getAuth();

    let status = auth.currentUser

      


    if (type === 'dog-owners') {
        signedInURL = '/mapPage/?param=dog-walkers&type=dog-owners&key=' + key
        
    } else if (type === 'dog-walkers'){
        signedInURL = '/jobPage?key=' + key
    } else {
        signedInURL = '/signIn?type=unknown&key=null'
    }
    console.log(signedInURL)
  return (
    <>
        
        <div className="signInbutton-wrapper">

            {key === 'null' ? (

                <Link to={destination} style={{textDecoration:"none"}}>
                <button className="signInButton">
                    
                        <div className="buttonText">
                            {text}
                        </div>
                    
                </button>
                </Link>

            ) : (

                <Link to={signedInURL} style={{textDecoration:"none"}}>
                <button className="signInButton">
                    
                        <div className="buttonText">
                            {text}
                        </div>
                    
                </button>
            </Link>

            )}

            
        </div>
        
    </>
    )
}

export default signInButton