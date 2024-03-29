import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  apiKey: 'AIzaSyAXcxbhAdl5YDuR-olC1-mBVlND064Zm5s',
        databaseURL: "https://waqqly-app-default-rtdb.europe-west1.firebasedatabase.app/",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

async function writeToDB(ID, email, f_name, s_name, variable_data, addr, passwd, usrname, address, lon, lat, type){
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
          lat: lat,
          email: email
      };

      if (type === 'dog-owners') {
          refPath = 'users/dog-owners/' + ID;
          data.Pname = variable_data;
      } else {
          refPath = 'users/' + type + '/' + ID;
          data.w_length = variable_data;
          data.jobs = {job: 'job'}
      }

      const newDataRef = await set(ref(db, refPath), data);



  } catch (error) {
      console.error("Error writing to database:", error);
      throw error;
  }

}

export default writeToDB