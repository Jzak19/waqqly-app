import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';
import writeToDB from '../../js/writeToDB.js'
import { useState } from 'react';
import { useEffect } from 'react';
import IMAGES from '../../assets/images.js';
import InputBox from '../inputBox.js';
import TAndS from '../titleAndSubText.js';
import SubmitButton from '../submitButton.js'
import SignInButton from '../signInButton.js'
import LogoLink from '../logoLink.js'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar.js';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import './ownerRegister.css';

const firebaseConfig = {
    apiKey: 'AIzaSyAXcxbhAdl5YDuR-olC1-mBVlND064Zm5s',
    databaseURL: "https://waqqly-app-default-rtdb.europe-west1.firebasedatabase.app/",

}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);





const OwnerRegister = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        Name: '',
        Sname: '',
        Email: '',
        Pname: '',
        Llength: '',
        HouseNumber: '',
        StreetName: '',
        CityName: '',
        Postcode: '',
        Usrname: '',
        Passwd: '',
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setFormData({
          ...formData,
          [name]: value
        });
      };

    const generateUniqueID = () => {

        let ID = (Math.round(Math.random() * 1000))

        return ID;
        
    }

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        const combinedAddr = (formData.HouseNumber + ", " + formData.StreetName + ", " + formData.CityName + ", " + formData.Postcode)
        // Output form data to console
        createUserWithEmailAndPassword(auth, formData.Email, formData.Passwd)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        const userID = user.uid
        const userEmail = user.email
        console.log('UID > ' + userID)


            if (type === 'dog-owners') {
                writeToDB(userID, formData.Email, formData.Name, formData.Sname, formData.Pname, combinedAddr,'', formData.Usrname, combinedAddr, 0, 0, 'dog-owners')
                const url ='/mapPage/?param=dog-walkers&type=dog-owners&key=' + userID; 
                navigate(url)

            } else {
                writeToDB(userID, formData.Email, formData.Name, formData.Sname, formData.Pname, combinedAddr,'', formData.Usrname, combinedAddr, 0, 0, 'dog-walkers')

            }
        })
      };

    

    const userType = window.location.search;

    const urlParams = new URLSearchParams(userType);
    const type =  urlParams.get('type')
    console.log(type)

    return(
        <>
            <Navbar></Navbar>
            <div className="bgContainer1">

                <LogoLink/>
   
                    <TAndS title="Register" subtext="Input your credentials below to get started!" animation="none"/>

                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit} className="inputForm">
                            
                                <InputBox id="Name" text="First Name:" formDataValue={formData.Name} onChange={handleInputChange}/>
                                <InputBox id="Sname" text="Surname:" formDataValue={formData.Sname} onChange={handleInputChange}/>
                                <InputBox id="Email" text="Email:" formDataValue={formData.Email} onChange={handleInputChange}/>
                                {type === 'dog-owners' ? (
                                    <InputBox id="Pname" text="Pet Name:" formDataValue={formData.Pname} onChange={handleInputChange}/>
                                ) : (
                                    <InputBox id="Llength" text="Walk length (minutes):" formDataValue={formData.Llength} onChange={handleInputChange}/>
                                )}
                                <InputBox id="HouseNumber" text="House Number:" formDataValue={formData.HouseNumber} onChange={handleInputChange}/>
                                <InputBox id="StreetName" text="Street Name:" formDataValue={formData.StreetName} onChange={handleInputChange}/>
                                <InputBox id="CityName" text="City:" formDataValue={formData.CityName} onChange={handleInputChange}/>
                                <InputBox id="Postcode" text="Postcode:" formDataValue={formData.Postcode} onChange={handleInputChange}/>
                                <InputBox id="Usrname" text="Username:" formDataValue={formData.Usrname} onChange={handleInputChange}/>
                                <InputBox id="Passwd" text="Password:" formDataValue={formData.Passwd} onChange={handleInputChange}/>

                                    <div className="signInbutton-wrapper">
                                        <button className='registerButton1' type='submit'>Register</button>
                                    </div>   
                                    
                           
                                

                                
                                
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

export default OwnerRegister
