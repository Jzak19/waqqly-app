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


import './ownerRegister.css';


const OwnerRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        Sname: '',
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const combinedAddr = (formData.HouseNumber + ", " + formData.StreetName + ", " + formData.CityName + ", " + formData.Postcode)
        console.log(formData.CityName)
        console.log(combinedAddr)
        // Output form data to console
        {type === 'owner' ? (
            writeToDB(generateUniqueID(), formData.Name, formData.Sname, formData.Pname, combinedAddr, formData.Passwd, formData.Usrname, combinedAddr, 0, 0, 'dog-owners')
            
            
        ) : (
            writeToDB(generateUniqueID(), formData.Name, formData.Sname, formData.Llength, combinedAddr, formData.Passwd, formData.Usrname, combinedAddr, 0, 0, 'dog-walkers')
        )}
        navigate('/mapPage?type=' + type)
      };

    

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
                        <form onSubmit={handleSubmit} className="inputForm">
                            
                                <InputBox id="Name" text="First Name:" formDataValue={formData.Name} onChange={handleInputChange}/>
                                <InputBox id="Sname" text="Surname:" formDataValue={formData.Sname} onChange={handleInputChange}/>
                                {type === 'owner' ? (
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

                 
                                    <button type='submit'>Register</button>
                           
                                

                                
                                
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
