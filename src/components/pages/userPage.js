import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';
import LogoLink from '../logoLink';
import InputBox from '../inputBox';
import SubmitButton from '../submitButton';
import { useState } from 'react';
import readFromDB from '../../js/readFromDB'
import { getDatabase, ref, child, get, set, update } from "firebase/database";
import { initializeApp } from "firebase/app";

import React from 'react';

import './userPage.css';

const urlParams = new URLSearchParams(window.location.search);
let type =  urlParams.get('type')
let realType = ''
let key = urlParams.get('key')
console.log(type)
console.log(key)


if (await readFromDB(key, '/f_name', type) === 'nodata') {
    type = 'dog-walkers'
}

let fName = await readFromDB(key, '/f_name', type)
let sName = await readFromDB(key, '/s_name', type)
let Pname = await readFromDB(key, '/Pname', type)
let wLength = await readFromDB(key, '/w_length', type)
let addr = await readFromDB(key, '/addr', type)
let usrname = await readFromDB(key, '/usrname', type)
let ownerWalkLength = await readFromDB(key, '/w_length', 'dog-walkers')
let walkerPetName = await readFromDB(key, '/pets/Pname', 'dog-walkers')


const firebaseConfig = {
    apiKey: 'AIzaSyAXcxbhAdl5YDuR-olC1-mBVlND064Zm5s',
    databaseURL: `https://waqqly-app-default-rtdb.europe-west1.firebasedatabase.app/`,

}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const UserPage = () => {

    const [formData, setFormData] = useState({
        f_name: fName,
        s_name: sName,
        Pname: Pname,
        w_length: wLength,
        addr: addr,
        usrname: usrname,
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        
        if (type === 'dog-owners') {
            const ownerRef = `users/${type}/${key}`
            const ownerWalkerRef = `users/dog-walkers/${key}`
            await update(ref(db, ownerRef), formData).then(console.log("data updated succesfully"))
            await update(ref(db, ownerWalkerRef), formData).then(console.log("data updated succesfully for walker profile"))

        } else {
            const dbref = `users/${type}/${key}`
            await update(ref(db, dbref), formData).then(console.log("data updated succesfully"))
            const petRef = `users/${type}/${key}/pets/`
            await update(ref(db, petRef), formData).then(console.log("data updated succesfully"))
        }

      }

    return(
        
        <>
            <div className="bgContainer1">
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
                    <form onSubmit={handleSubmit} className="inputForm">
                                <InputBox id="f_name" text="First Name:" formDataValue={formData.f_name} onChange={handleInputChange} initialValue={fName}/>
                                <InputBox id="s_name" text="Surname:" formDataValue={formData.s_name} onChange={handleInputChange} initialValue={sName}/>
                                {type === 'dog-owners' ? (
                                    <InputBox id="Pname" text="Pet Name:" formDataValue={formData.Pname} onChange={handleInputChange} initialValue={Pname}/>
                                  
                                ) : (
                                    <InputBox id="w_length" text="Walk length (minutes):" formDataValue={formData.w_length} onChange={handleInputChange} initialValue={wLength}/>
                                    
                                )}
                                <InputBox id="addr" text="Address:" formDataValue={formData.addr} onChange={handleInputChange} initialValue={addr}/>
                                <InputBox id="usrname" text="Username:" formDataValue={formData.usrname} onChange={handleInputChange} initialValue={usrname}/>
                                {ownerWalkLength !== 'nodata' ? (
                                    <InputBox id="w_length" text="Walk length (minutes):" formDataValue={formData.w_length} onChange={handleInputChange} initialValue={ownerWalkLength}/>
                                ) : (
                                    console.log('no job account yet')
                                )}
                                {walkerPetName !== 'nodata' ? (
                                    <InputBox id="Pname" text="Walk length (minutes):" formDataValue={formData.Pname} onChange={handleInputChange} initialValue={walkerPetName}/>
                                ) : (
                                    console.log('no job account yet')
                                )}
                                <button type='submit'>Update Info</button>
                    </form>
                </div>
                
                


</div>
        </>
    )

}

export default UserPage
