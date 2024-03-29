import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';
import ChoiceBox from '../choiceBox.js';
import IMAGES from '../../assets/images.js';
import InputBox from '../inputBox.js';
import TAndS from '../titleAndSubText.js';
import SubmitButton from '../submitButton.js'
import SignInButton from '../signInButton.js'
import LogoLink from '../logoLink.js'
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from '../navbar.js';


import './signIn.css';


const firebaseConfig = {
    apiKey: 'AIzaSyAXcxbhAdl5YDuR-olC1-mBVlND064Zm5s',
    databaseURL: "https://waqqly-app-default-rtdb.europe-west1.firebasedatabase.app/",

}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


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

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Email: '',
        Passwd: '',
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setFormData({
          ...formData,
          [name]: value
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit hit')
        signInWithEmailAndPassword(auth, formData.Email, formData.Passwd)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.uid)
        const userID = user.uid

        if (type === 'dog-owners') {
            const url ='/mapPage/?param=dog-walkers&type=dog-owners&key=' + userID; 
            navigate(url)
        } else {
            const url ='/jobPage?key=' + userID + '&type=' + type;
            navigate(url)
        }
        
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });

      };


    return(
        <>

            <Navbar/>   
            <div className="bgContainer1">


                

                <LogoLink/>

                    
                <TAndS title="Sign In" subtext="Choose an account type and sign in!" animation="animation-wrapper"/>

                    

                    {type === 'unknown' ? (
                        
               
                            <div className="choice-wrapper">
                            
                                <div onClick={handleClick}>
                                    <Link to="/signIn/?type=dog-owners" id='owner' className='linkBox' style={{textDecoration: "none"}}>
                                        <ChoiceBox color="blue" title="Dog Owner" bodyText="You are a person who owns a dog and is looking for a dog walker!"/>
                                    </Link>  
                                    {reload && <ownerRegister />}         
                                </div>
                           
            
                                <div onClick={handleClick}>
                                    <Link to="/signIn/?type=dog-walkers" id='walker' className='linkBox' style={{textDecoration: "none"}}>
                                        <ChoiceBox color="green" title="Dog Walker" bodyText="You are a person who is looking for dog owners nearby!"/>
                                    </Link>
                                </div>
                                {reload && <ownerRegister />}
                            </div>
                        ) : (
                            <div className="form-wrapper">
                                <form onSubmit={handleSubmit} className="inputForm">
                               
                                    <InputBox id="Email" text="Email:" formDataValue={formData.Email} onChange={handleInputChange}/>
                                    <InputBox id="Passwd" text="Password:" formDataValue={formData.Passwd} onChange={handleInputChange}/>

                                    <button type='submit'>Sign In</button>

                    
                    
                                </form>
            
                            </div>
                        
                    )}

                    

                    <div className="check-wrapper">
                        <div className="abc">
                            <p className="check">Don't have an account? Create one here: </p>
                        </div>


                        <div className="signUp-wrapper">

                            <div className="signInbutton-wrapper">
                                <SignInButton text="Sign Up" destination = "/RegisterChoicePage"/>

                            </div>

                        </div>
                    </div>

                    
                    

         
            </div>
        </>
    )

}

export default OwnerRegister