import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

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



async function readFromDB() {
  const dbRef = ref(getDatabase())
  const snapshot = await get(child(dbRef, 'users/dog-walkers'))

  if (snapshot.exists()) {
    return Object.keys(snapshot.toJSON())

  } else {
    console.log("No data available");
  }
}

export default readFromDB