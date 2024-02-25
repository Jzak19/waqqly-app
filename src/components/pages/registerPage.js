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

    const userType = window.location.search;

    const urlParams = new URLSearchParams(userType);
    const type =  urlParams.get('type')
    console.log(type)

    return(
        <>
            <div className="bgContainer">

                <LogoLink/>
   
                    <TAndS title="Sign Up" subtext="Input your credentials below to get started!" animation="none"/>

                    <div className="form-wrapper">
                        <form action="POST" className="inputForm">
                            
                                <InputBox id="Name" text="First Name:"/>
                                <InputBox id="SName" text="Surname:"/>
                                {type === 'owner' ? (
                                    <InputBox id="Pname" text="Pet Name:"/>
                                ) : (
                                    <InputBox id="Llength" text="Walk length (minutes):"/>
                                )}
                                <InputBox id="Address" text="Address:"/>
                                <InputBox id="Usr" text="Username:"/>
                                <InputBox id="Pass" text="Password:"/>

                                <SubmitButton/>

                                
                                
                        </form>
                       
                    </div>
                    <div className="signIn-wrapper">
                        <p className="check">Already have an account? Sign in here: </p>

                    </div>

                    <SignInButton text = "Sign In" destination="/signIn"/>
                    
         
            </div>
        </>
    )

}

export default ownerRegister
