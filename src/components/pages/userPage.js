import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';
import LogoLink from '../logoLink';
import InputBox from '../inputBox';
import SubmitButton from '../submitButton';

import React from 'react';

import './userPage.css';

const UserType = 'walker'

const userPage = () => {

    

    return(
        
        <>
            <div className="bgContainer">
                <div className="profileInfo-wrapper">
                    
                    <div className="profileInfo">
                        <div className="userImage">
                            
                        </div>

                        <div className="info">
                            <h1 className="userName">Users's Profile</h1>
                            <h2 className="profileText">Here you can manage information about your profile</h2>
                        </div>

                    </div>
                </div>
                <div className="form-wrapper">
                    <form action="UPDATE" className="inputForm">
                        <InputBox id="Name" text="First Name:"/>
                        <InputBox id="SName" text="Surname:"/>
                        {UserType === 'owner' ? (
                                <InputBox id="Pname" text="Pet Name:"/>
                            ) : (
                                <InputBox id="Llength" text="Walk length (minutes):"/>
                        )}
                        <InputBox id="Address" text="Address:"/>
                        <InputBox id="Usr" text="Username:"/>
                        <InputBox id="Pass" text="Password:"/>
                    </form>
                </div>
                
                

                <SubmitButton/>
</div>
        </>
    )

}

export default userPage
