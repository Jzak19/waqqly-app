import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get} from "firebase/database";

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



function readFromDB (ID, itemToGrab) {
    return new Promise((resolve, reject) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/dog-walkers/${ID}${itemToGrab}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data);
                resolve(data); // Resolve the promise with the data
            } else {
                console.log("No data available");
                resolve(null); // Resolve with null if no data
            }
        }).catch((error) => {
            console.error(error);
            reject(error); // Reject the promise if there's an error
        });
    });
  
}

export default readFromDB