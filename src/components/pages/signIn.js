import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';

import IMAGES from '../../assets/images.js';
import InputBox from '../inputBox.js';
import TAndS from '../titleAndSubText.js';
import SubmitButton from '../submitButton.js'
import SignInButton from '../signInButton.js'
import LogoLink from '../logoLink.js'
import React from 'react';


import './ownerRegister.css';

const ownerRegister = () => {

    return(
        <>
            <div className="bgContainer">

                <LogoLink/>
   
                    <TAndS title="Sign In" subtext="Sign in to an existing account!" animation="none"/>

                    <div className="form-wrapper">
                        <form action="POST" className="inputForm">
                            
                                <InputBox id="Usr" text="Username:"/>
                                <InputBox id="Pass" text="Password:"/>

                                <SubmitButton/>

                                
                                
                        </form>
                       
                    </div>

                    <p className="check">Don't have an account? Create one here: </p>
                    <div className="button-wrapper">
                        <SignInButton text="Sign Up" destination = "/waqqly-app"/>

                    </div>

         
            </div>
        </>
    )

}

export default ownerRegister