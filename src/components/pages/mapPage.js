import { BrowserRouter as Router, Route, Routes, NavLink, Link } from 'react-router-dom';
import ChoiceBox from '../choiceBox';
import IMAGES from '../../assets/images.js';
import TAndS from '../titleAndSubText.js'
import SignInButton from '../signInButton.js';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import React from 'react';
import CreateMarkers from '../locationDataExport.js';
import icon from 'leaflet/dist/images/marker-icon.png';
import getLatLng from '../../js/googleMapsAPI.js';
import writeToDB from '../../js/writeToDB.js';
import readFromDB from '../../js/readFromDB.js';
import ReactDOM from 'react-dom';
import getIDsFromDB from '../../js/getIDsFromDB.js'
import './mapPage.css';
import Navbar from '../navbar.js'
import uploadJob from '../../js/uploadJob.js';
import InputBox from '../inputBox.js';
import setPetName from '../../js/setPetName.js';


const urlParams = new URLSearchParams(window.location.search);
console.log(window.location.search)
const type =  urlParams.get('type')
const search = urlParams.get('param')
const key = urlParams.get('key')
let realType = ''
console.log(search)
console.log(type)
console.log('key : ' + key)

    
let a = await readFromDB(key, '/Pname', type)
console.log('A -> ' + a)

let IDs = await getIDsFromDB(search)
console.log(IDs)

let addresses = (await getIDsFromDB(search))

addresses = await Promise.all(addresses.map(async ID => {
  console.log(ID)
    if (await readFromDB(ID, '/jobs/deactivated', 'dog-walkers') === 'nodata') {
      return {addr: await readFromDB(ID, '/addr', search), id: ID}
    } else {
      console.log('DEACTIVATED USER FOUND')
      
    }
    
}))

let filteredAddresses = addresses.filter(element => element !== undefined);

console.log(filteredAddresses)


const positions = await Promise.all(filteredAddresses.map(async address => {
  let x = await getLatLng(address.addr)
  x.unshift(address.id)
  console.log(x)
  return(x)
}))

console.log(positions)

let currentUserAddr = await readFromDB(key, '/addr', type)
console.log(currentUserAddr)

if (currentUserAddr === undefined) {
  const newType = 'dog-walkers' 
  currentUserAddr = await readFromDB(key, '/addr', newType)
}

let center = await getLatLng(currentUserAddr)


async function check () {


  if (await readFromDB(key, '/Pname', type) === undefined) {
    realType = 'dog-walkers'
  } else {
    realType = 'dog-owners'
    
  }
  
  if ( await readFromDB(key, '/Pname', type) === 'nodata' && await readFromDB(key, '/pets', 'dog-walkers') === 'nodata') {
      console.log('user is not actually a owner yet!')
      
      return 'notOwner'
  } else {
      console.log('user is a owner!')

      return 'owner'
  }
  
}



function MapPage() {

  if (key===null) {
    window.location.reload()
  }
  
  const [result, setResult] = useState('');
  
        useEffect(() => {
            const fetchData = async () => {
              let data = await check();
              setResult(data); 
              console.log(data + ' DATA')
            };
            fetchData(); 
    }, []);

    

    


  let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize: [35, 46],
    iconAnchor: [17, 46]

  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const [formData, setFormData] = useState({
    Pname: '',
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
    
    setPetName(key, formData.Pname).then()

    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    });

  };

  

  return (
    <>

      
        


      <Navbar/>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
      <div className="bgContainer1">
        
        <TAndS title="Find other Wagglies!" subtext="Use the map to find other people who want to offer their services, or are in need of yours!" animated="none" />
        
        {result === 'owner' ? (
        
        <div className='map-wrapper'>
          <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://api.maptiler.com/maps/toner-v2/style.json?key=q0qyxEAUBc5XsgAgv7Ar>OpenStreetMap</a> contributors'
              url="https://api.maptiler.com/maps/toner-v2/256/{z}/{x}/{y}.png?key=q0qyxEAUBc5XsgAgv7Ar"
            />
            <Marker position={center}>
                    <Popup>

                      Thats you!

                    </Popup>
            </Marker>
            {
              positions.map(position => {

                function handleJob () {
                  uploadJob(position[0], key, realType)
                }

                return (

                  

                  <Marker position={[position[1], position[2]]}>
                    { position[0] === key ? (
                      <Popup>
                     <div className="popup-wrapper">
                      Thats You!

                      
            
                      </div>
                    </Popup>

                    ) : (

                      <Popup>
                     <div className="popup-wrapper">

                          You found a dog walker! tap the button to request a dog walk, and check your email for their reply!

                      <div className="uploadJobButton" onClick={handleJob}>Choose walker</div>
            
                      </div>
                    </Popup>
                    )}
                    

                    
                  </Marker>

                )
              })

              
            }
          </MapContainer>,
        </div>

        ) : result === 'notOwner' ? (

          

          <>
          
            <h1 className='warning'>Need to set Pname</h1>

            <form onSubmit={handleSubmit} className="inputForm">
                               
                  <InputBox id="Pname" text="Pet Name" formDataValue={formData.Pname} onChange={handleInputChange}/>
                  

                  <button type='submit'>Sign In</button>

  
  
              </form>
              

          </>

        ) : (

            <>Loading Page</>
          
        )}
      </div>
    </>
  )

}



export default MapPage
