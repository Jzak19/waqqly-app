import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';
import ChoiceBox from '../choiceBox';
import IMAGES from '../../assets/images.js';
import TAndS from '../titleAndSubText.js'
import SignInButton from '../signInButton.js';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../navbar.js';
import VideoPanel from '../videoPanel.js';
import AlignedBox from '../alignedBox.js';


import React from 'react';
import './homePage.css';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";


import './signIn.css';


const firebaseConfig = {
    apiKey: 'AIzaSyAXcxbhAdl5YDuR-olC1-mBVlND064Zm5s',
    databaseURL: "https://waqqly-app-default-rtdb.europe-west1.firebasedatabase.app/",

}



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const Home = ({begginerKey}) => {

    const userLoggedIn = auth.currentUser
    
    const urlParams = new URLSearchParams(window.location.search);
    const type =  urlParams.get('type')
    const search = urlParams.get('param')
    const key = urlParams.get('key')
    console.log(search)
    console.log(type)
    console.log('key : ' + key)

    let ownerSignedIn = ''
    let walkerSignedIn = ''
    
    if (userLoggedIn) {
        ownerSignedIn = '/mapPage/?param=dog-walkers&type=dog-owners&key=' + userLoggedIn.uid;
        walkerSignedIn = '/jobPage?key=' + userLoggedIn.uid +'&type=' + type;
    } else {
        ownerSignedIn = '/registerPage/?type=dog-owners'
        walkerSignedIn = '/registerPage/?type=dog-walkers'
    }

    return(
        <>
            <body>
            <Navbar></Navbar>
            <div className="bgContainer1">

            

                <TAndS title="Waqq.ly" subtext="A place where dog owners can find dog walkers!" animation="animation-wrapper"/>


                {!userLoggedIn ? (

                    <div className="choiceBoxes">
                                
                    <div>
                        <Link to={ownerSignedIn} id='owner' className='linkBox' style={{textDecoration: "none"}}>
                            <ChoiceBox color="blue" title="Dog Owner" bodyText="Register as an owner and look for dog walkers in your area!"/>
                        </Link>               
                    </div>


                    <div>
                        <Link to={walkerSignedIn} id='walker' className='linkBox' style={{textDecoration: "none"}}>
                            <ChoiceBox color="green" title="Dog Walker" bodyText="Register as a dog walker and get notifications from owners in your area!"/>
                        </Link>  
                    </div>


                    </div>


                ) : (

                    <div className="choiceBoxes">
            
                        <div>
                            <Link to={ownerSignedIn} id='owner' className='linkBox' style={{textDecoration: "none"}}>
                                <ChoiceBox color="blue" title="Dog Owner" bodyText="Already logged in! proceed to map page!"/>
                            </Link>               
                        </div>
           
           
                        <div>
                            <Link to={walkerSignedIn} id='walker' className='linkBox' style={{textDecoration: "none"}}>
                                <ChoiceBox color="green" title="Dog Walker" bodyText="Already Logged in! Proceed to job page!"/>
                            </Link>  
                        </div>
  
                    
                </div>


                )}
                

                <div className="check-wrapper">
                    <div className="signIn-wrapper">
                        <p className="check">Already have an account? Sign in here: </p>
                    </div>

                    
                </div>

                <SignInButton text = "Sign In" destination="/signIn/?type=unknown"/>
                
            </div>
            <div className="vid-wrapper">
                <VideoPanel/>
            </div>
            
            <div className="alignedBoxWrapper">
                <AlignedBox image={IMAGES.dogs} alignment={'left'} title={"How our Service works..."} subtext={"When a new user reaches our webpage, the first step is to register! Firstly, pick which type of service you are interested in, and then complete the registration process. You will be met with a customised page to suit your needs."}/>
                <AlignedBox image={IMAGES.single} alignment={'right'} title={"How our Service works..."} subtext={"When a new user reaches our webpage, the first step is to register! Firstly, pick which type of service you are interested in, and then complete the registration process. You will be met with a customised page to suit your needs."}/>
                <AlignedBox image={IMAGES.nice} alignment={'left'} title={"How our Service works..."} subtext={"When a new user reaches our webpage, the first step is to register! Firstly, pick which type of service you are interested in, and then complete the registration process. You will be met with a customised page to suit your needs."}/>
                <AlignedBox image={IMAGES.dogs} alignment={'right'} title={"How our Service works..."} subtext={"When a new user reaches our webpage, the first step is to register! Firstly, pick which type of service you are interested in, and then complete the registration process. You will be met with a customised page to suit your needs."}/>
            </div>

            </body>
        </>
    )

}

export default Home


