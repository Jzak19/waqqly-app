import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';
import ChoiceBox from '../choiceBox.js';


import IMAGES from '../../assets/images.js';
import InputBox from '../inputBox.js';
import TAndS from '../titleAndSubText.js';
import SubmitButton from '../submitButton.js'
import SignInButton from '../signInButton.js'
import LogoLink from '../logoLink.js'
import React, {useState} from 'react';



import './signIn.css';

function OwnerRegister() {
    const userType = window.location.search;

    const urlParams = new URLSearchParams(userType);
    const type =  urlParams.get('type')
    console.log(type)

    const [reload, setReload] = useState(false);

    const handleClick = () => {
        // Toggle the reload state
        setReload(!reload);
    };

    return(
        <>
            <div className="bgContainer">

                

                <LogoLink/>

                    
                <TAndS title="Sign In" subtext="Choose an account type and sign in!" animation="animation-wrapper"/>

                    

                    {type === 'unknown' ? (
                        
               
                            <div className="choice-wrapper">
                            
                                <div onClick={handleClick}>
                                    <Link to="/signIn/?type=owner" id='owner' className='linkBox' style={{textDecoration: "none"}}>
                                        <ChoiceBox color="blue" title="Dog Owner" bodyText="You are a person who owns a dog and is looking for a dog walker!"/>
                                    </Link>  
                                    {reload && <ownerRegister />}         
                                </div>
                           
            
                                <div onClick={handleClick}>
                                    <Link to="/signIn/?type=walker" id='walker' className='linkBox' style={{textDecoration: "none"}}>
                                        <ChoiceBox color="green" title="Dog Walker" bodyText="You are a person who is looking for dog owners nearby!"/>
                                    </Link>
                                </div>
                                {reload && <ownerRegister />}
                            </div>
                        ) : (
                            <div className="form-wrapper">
                                    <form action="POST" className="inputForm">

                    
                    
                
                                    <InputBox id="Usr" text="Username:"/>
                                    <InputBox id="Pass" text="Password:"/>

                                    <SubmitButton/>

                    
                    
                                </form>
            
                            </div>
                        
                    )}

                    

                    <div className="check-wrapper">
                        <div className="abc">
                            <p className="check">Don't have an account? Create one here: </p>
                        </div>


                        <div className="signUp-wrapper">

                            <div className="button-wrapper">
                                <SignInButton text="Sign Up" destination = "/waqqly-app"/>

                            </div>

                        </div>
                    </div>

                    
                    

         
            </div>
        </>
    )

}

export default OwnerRegister