import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://waqqly-app-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

function writeToDB(ID, f_name, s_name, variable_data, addr, passwd, usrname, address, lon, lat){
    set(ref(db, 'users/dog-walkers/' + ID), {
        ID: ID,
        f_name: f_name,
        s_name: s_name,
        w_length: variable_data,
        passwd: passwd,
        usrname: usrname,
        addr: addr,
        lon: lon,
        lat: lat 
    })
}

export default writeToDB