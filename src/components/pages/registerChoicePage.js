import React from 'react'
import TAndS from './../titleAndSubText'
import LogoLink from '../logoLink'
import ChoiceBox from '../choiceBox'
import Navbar from '../navbar'
import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';

import './ownerRegister.css'

function RegisterChoicePage () {
    return(
        <>
        <Navbar/>
        <div className="bgContainer1">

                

                <LogoLink/>

                    
                <TAndS title="Choose your Service" subtext="Which service will you be using today?" animation="animation-wrapper"/>

                <div className="choiceBoxes">
            
                        <div>
                            <Link to="/registerPage/?type=dog-owners" id='owner' className='linkBox' style={{textDecoration: "none"}}>
                                <ChoiceBox color="blue" title="Dog Owner" bodyText="You are a person who owns a dog and is looking for a dog walker!"/>
                            </Link>               
                        </div>
           
           
                        <div>
                            <Link to="/registerPage/?type=dog-walkers" id='walker' className='linkBox' style={{textDecoration: "none"}}>
                                <ChoiceBox color="green" title="Dog Walker" bodyText="You are a person who is looking for dog owners nearby!"/>
                            </Link>  
                        </div>
  
                    
                </div>
        </div>
        </>
    )
}

export default RegisterChoicePage