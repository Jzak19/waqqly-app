import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

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

async function writeToDB(f_name, s_name, variable_data, addr, passwd, usrname, address, lon, lat, type){
    console.log(type)

    try {
      console.log(type);

      let refPath = '';
      let data = {
          f_name: f_name,
          s_name: s_name,
          passwd: passwd,
          usrname: usrname,
          addr: addr,
          lon: lon,
          lat: lat
      };

      if (type === 'dog-owners') {
          refPath = 'users/dog-owners/';
          data.Pname = variable_data;
      } else {
          refPath = 'users/' + type + '/';
          data.w_length = variable_data;
      }

      const newDataRef = await push(ref(db, refPath), data);
      const newKey = newDataRef.key;

      return newKey;
  } catch (error) {
      console.error("Error writing to database:", error);
      throw error;
  }

}

export default writeToDB