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
   
                    <TAndS title="Sign Up" subtext="Input your credentials below to get started!" animation="none"/>

                    <div className="form-wrapper">
                        <form action="POST" className="inputForm">
                            
                                <InputBox id="Name" text="First Name:"/>
                                <InputBox id="SName" text="Surname:"/>
                                <InputBox id="PName" text="Pet Name:"/>
                                <InputBox id="Address" text="Address:"/>
                                <InputBox id="Usr" text="Username:"/>
                                <InputBox id="Pass" text="Password:"/>

                                <SubmitButton/>

                                
                                
                        </form>
                       
                    </div>

                    <p className="check">Already have an account? Sign in here: </p>

                    <SignInButton text = "Sign In" destination="/signIn"/>
                    
         
            </div>
        </>
    )

}

export default ownerRegister
