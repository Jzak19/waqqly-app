import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
import readFromDB from "./readFromDB";

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

async function uploadJob(ID, ownerID, trueType){

    try {

        const data = {
            jobStatus: 'unaccepted',
            ownerName: await readFromDB(ownerID, '/usrname', trueType),
  
            Email: await readFromDB(ownerID, '/Email', trueType),
        }

        if (trueType === 'dog-owners') {
            data.Pname = await readFromDB(ownerID, '/Pname', trueType);
        } else {

            data.Pname = await readFromDB(ownerID, '/pets/Pname', trueType);
        }
        const refPath = 'users/dog-walkers/' + ID + '/jobs'
        
        await push(ref(db, refPath), data);




  } catch (error) {
      console.error("Error writing to database:", error);
      throw error;
  }

}

export default uploadJob