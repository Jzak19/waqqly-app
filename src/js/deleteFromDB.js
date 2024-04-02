import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove} from "firebase/database";

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

async function deleteFromDB (walkerID, jobID, type) {

    if (type === 'accept') {
        try {
            const pathToRemove = 'users/dog-walkers/' + walkerID + '/jobs/'+ jobID 
            await remove(ref(db, pathToRemove)).then(console.log('accepted Job: ' + jobID)
            )}catch{
                console.log('ERROR REMOVING JOB')
            }
    } else {
        try {
            const pathToRemove = 'users/dog-walkers/' + walkerID + '/jobs/'+ jobID 
            await remove(ref(db, pathToRemove)).then(console.log('declined Job: ' + jobID)
            )}catch{
                console.log('ERROR REMOVING JOB')
            }
    }
    
    
}

export default deleteFromDB