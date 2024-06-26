import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, update } from "firebase/database";
import readFromDB from "./readFromDB";
import writeToDB from "./writeToDB";

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

async function moveOwner(ID, type, wLength){

    try {
        
        const owner = await readFromDB(ID, '/', type)
        owner.w_length = wLength
        const refPath = 'users/dog-walkers/' + ID
        await set(ref(db, refPath), owner )
        await update(ref(db, `users/dog-owners/${ID}`), owner)

  } catch (error) {
      console.error("Error writing to database:", error);
      throw error;
  }

}

export default moveOwner