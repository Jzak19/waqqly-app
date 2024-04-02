import React from 'react'
import readFromDB from './../../js/readFromDB'
import TandS from '../titleAndSubText'
import Navbar from '../navbar'
import InputBox from '../inputBox'
import createJobsFolder from '../../js/createJobsFolder'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import moveOwner from '../../js/moveOwner'
import JobContainer from '../jobContainer'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, update} from "firebase/database";


import './jobPage.css'
import deactivateUser from '../../js/deactivateUser'
import reActivateUser from '../../js/reActivateUser'

// have a function to check if the user is in dog walkers. If they are, display the page and load jobs. If not, prompt them to enable their dog walker account. Once the button is pressed, an update is sent to create a jobs folder in the owners database. then they are able to proceed and load the page. Dont forget a deactivate button which removes jobs. In order to display the dog owner as a walker on the map, the map Page needs to have another function which appends any dog owners with a jobs folder into the pool of walkers

const firebaseConfig = {
    apiKey: 'AIzaSyAXcxbhAdl5YDuR-olC1-mBVlND064Zm5s',
    databaseURL: "https://waqqly-app-default-rtdb.europe-west1.firebasedatabase.app/",

}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const urlParams = new URLSearchParams(window.location.search);
let type =  urlParams.get('type')
let realType = ''
let key = urlParams.get('key')
console.log(type)
console.log(key)

async function check () {

    if (await readFromDB(key, '/jobs/deactivated', 'dog-walkers') === true) {
        console.log('USER IS DEACTIVATED')
        return false
    }

    if (await readFromDB(key, '/jobs/job', 'dog-walkers') === 'nodata') {
        console.log('user is not actually a walker yet!')
        realType = 'dog-owners'
        return null
    } else {
        console.log('user is a walker!' + await readFromDB(key, '/jobs/job', type))
        return true
    }
}


async function getUserJobs(userId) {
    try {
        const snapshot = await get(child(ref(database), `users/dog-walkers/${userId}/jobs`));
        const jobsData = snapshot.val();
        if (!jobsData) return []; // Return empty array if no jobs found
        const jobsArray = Object.keys(jobsData).map(jobId => {
        const job = jobsData[jobId]

        if(jobId !== 'job' && jobId !== 'deactivated') {
            return {
                id: userId,
                jobId: jobId,
                jobName: job.ownerName,
                petName: job.Pname,
                jobContact: job.Email
              };
        }
        
      });

      return jobsArray.filter(element => element !== undefined);;
    } catch (error) {
      console.error("Error fetching user jobs:", error);
      return [];
    }
  }


  const jobs = await getUserJobs(key)
   

function JobPage () {

    if (key===null) {
        window.location.reload()
    }

    
    let activatetext = 'Activate'

    const navigate = useNavigate();

   

    const [result, setResult] = useState(null);

        useEffect(() => {
            // Assuming fetchData is your asynchronous function
            const fetchData = async () => {
            // Simulating asynchronous database call
            const data = await check();
            setResult(data); // Update the result state with the fetched data
            };

            fetchData(); // Call the asynchronous function
    }, []);

    const [textToShow, settextToShow] = useState('Activate');

        useEffect(() => {
            // Assuming fetchData is your asynchronous function
            const fetchData = async () => {
            // Simulating asynchronous database call
            const data = await check();

            if (data === false) {
                settextToShow('Re-activate Job Page')
            } else {
                settextToShow('Activate'); // Update the result state with the fetched data
            }

            
            };

            fetchData(); // Call the asynchronous function
    }, []);


    
    check()


    async function handleActivate () {
        console.log('activate triggered!')
        await createJobsFolder(key).then(
            await moveOwner(key, realType, formData.w_length).then(setResult(true))
        )
        
    }

    async function deactivateWalker () {
        console.log('PASSING' + key)
        await deactivateUser(key).then(setResult(false))
        settextToShow('Re-activate Job Page')
    }

    async function handleReActivate() {
        console.log('PASSING' + key)
        await reActivateUser(key).then(setResult(true))
    
    }

    const [formData, setFormData] = useState({
        w_length: '10',
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setFormData({
          ...formData,
          [name]: value
        });
      };




    return(
        
        <>

            <div className="bgContainer1">
                {result === true ? (
                    <>  
                        <Navbar/>
                        <TandS title={'Job Page'} subtext={'Here you can view job requests sent by dog owners!'}/>
                        <div className="border-wrapper">
                            <div className="jobBorder">

                                {
                                    jobs.length === 0 ? (

                                        <h5>No jobs to display yet!, come back later and check again!</h5>

                                    ) : (
                                        jobs.map(job => {

                                            return(
                                                <JobContainer walkerID={key} jobID={job.jobId} ownerName={job.jobName} petName={job.petName} Email={job.jobContact}/> 
                                            )
                                            
                                            
                                        })
                                    )
                                    
                                    
                                }
                                
                               
                            </div>
                        </div>

                        <div className="deactivate-wrapper">
                            <p className='deactivateText'>If you want to take a break from work, hit the deactivate button. This removes all your current pending jobs, and means that dog owners cant see you on their maps!</p>
                            <div className="deactivateButton" onClick={deactivateWalker}>Deactivate Jobs</div>
                        </div>
                        

                    </>
                ) : (
                    <>
                        <Navbar/>
                        <TandS title={'Job Page Activation'} subtext={'Uh oh! Looks like you are a dog owner looking to start your dog walking adventure! Inorder to begin, please activate your dog walker account so that other dog owners can see you on their maps!'}/>

                        <div className="wl-wrapper">
                            <form name='wlForm'>

                                <InputBox id={'w_length'} text={'Maximum Walk Duration:'} onChange={handleInputChange} initialValue={'10'}/>


                            </form>
                            
                        </div>
                        

                        <div className="activateButtonWrapper">

                            {textToShow === 'Activate' ? (
                                <>
                                    <div className="activateJobsButton" onClick={handleActivate}>
                                        <div className="activateButtonText">
                                        {textToShow}
                                        </div> 
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="activateJobsButton" onClick={handleReActivate}>
                                        <div className="activateButtonText">
                                        {textToShow}
                                        </div> 
                                    </div>
                                
                                </>
                            )}

                            
                        </div>
                        
                    </>

                    
                )}
            </div>
        </>
        
    )
    
}

export default JobPage