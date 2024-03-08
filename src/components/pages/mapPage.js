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



const urlParams = new URLSearchParams(window.location.search);
const type =  urlParams.get('type')
const search = urlParams.get('param')
const key = urlParams.get('key')
console.log(search)
console.log(type)
console.log(key)


let addresses = (await getIDsFromDB(search))

addresses = await Promise.all(addresses.map(async ID => {
  console.log(ID)
    return readFromDB(ID, '/addr', search)
}))

const positions = await Promise.all(addresses.map(address => {
  return getLatLng(address)
}))

let currentUserAddr = await readFromDB(key, '/addr', type)
console.log(currentUserAddr)


let center = await getLatLng(currentUserAddr)


function MapPage() {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize: [35, 46],
    iconAnchor: [17, 46]

  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
      <div className="bgContainer">
        <TAndS title="Find other Wagglies!" subtext="Use the map to find other people who want to offer their services, or are in need of yours!" animated="none" />
        <div className='map-wrapper'>
          <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://api.maptiler.com/maps/basic-v2/256/tiles.json?key=q0qyxEAUBc5XsgAgv7Ar>OpenStreetMap</a> contributors'
              url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=q0qyxEAUBc5XsgAgv7Ar"
            />
            <Marker position={center}>
                    <Popup>

                      A Dog Owner is near your location! <br /> tap to learn more.

                    </Popup>
            </Marker>
            {
              positions.map(position => {
                return (

                  

                  <Marker position={position}>
                    <Popup>

                      A Dog Owner is near your location! <br /> tap to learn more.

                    </Popup>
                  </Marker>

                )
              })

              
            }
          </MapContainer>,
        </div>
      </div>
    </>
  )

}



export default MapPage
