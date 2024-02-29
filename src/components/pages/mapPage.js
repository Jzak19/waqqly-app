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

writeToDB(3, 'Matt', 'Coppard', 10, '156 greenhill road winchester', 'c', 'c', 'a', 0, 0)

let addresses = (await getIDsFromDB())


addresses = await Promise.all(addresses.map(async ID => {
    return readFromDB(ID, '/addr')
}))

const positions = await Promise.all(addresses.map(address => {
  return getLatLng(address)
}))


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
          <MapContainer center={positions[0]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://api.maptiler.com/maps/basic-v2/256/tiles.json?key=q0qyxEAUBc5XsgAgv7Ar>OpenStreetMap</a> contributors'
              url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=q0qyxEAUBc5XsgAgv7Ar"
            />
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
