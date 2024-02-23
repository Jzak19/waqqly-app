import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';
import ChoiceBox from '../choiceBox';
import IMAGES from '../../assets/images.js';
import TAndS from '../titleAndSubText.js'
import SignInButton from '../signInButton.js';

import React from 'react';

import './homePage.css';

const Home = () => {

    return(
        <>
            <div className="bgContainer">

                <TAndS title="Waqq.ly" subtext="A place where dog owners can find dog walkers!" animation="animation-wrapper"/>

                <div className="choiceBoxes">
            
                        <div>
                            <Link to="/ownerRegister" className='linkBox' style={{textDecoration: "none"}}>
                                <ChoiceBox color="blue" title="Dog Owner" bodyText="You are a person who owns a dog and is looking for a dog walker!"/>
                            </Link>               
                        </div>
           
           
                        <div>
                            <Link to="/walkerRegister" className='linkBox' style={{textDecoration: "none"}}>
                                <ChoiceBox color="green" title="Dog Walker" bodyText="You are a person who is looking for dog owners nearby!"/>
                            </Link>  
                        </div>
  
                    
                </div>
                <div className="check-wrapper">

                    <p className="check">Already have an account? Sign in here: </p>

                    <SignInButton text = "Sign In" destination="/signIn"/>
                </div>

                <SignInButton text = "ProfileTest" destination="/userProfile"/>
                
            </div>
        </>
    )

}

export default Home


