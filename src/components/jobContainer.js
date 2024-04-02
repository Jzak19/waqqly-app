import React from "react";
import deleteFromDB from "../js/deleteFromDB";

import './jobContainer.css'


function JobContainer({walkerID, jobID, ownerName, petName, Email}) {

    function acceptJob () {
        deleteFromDB(walkerID, jobID, 'accept')
        window.location.reload()
    }

    function declineJob () {
        deleteFromDB(walkerID, jobID, 'decline')
        window.location.reload()
    }

    return(
        <div className="jobDiv">

            <div className="ownerInfo">
                <h3 className="jobID">Job ID: {jobID}</h3>
                <h3 className="jobOwnerName">Name: {ownerName}</h3>
                <h3 className="jobOwnerPet">Pet Name: {petName}</h3>
                <h3 className="jobOwnerContact">Contact: {Email}</h3>
            </div>

            <div className="button-wrapper">
                <div className="acceptJobButton" onClick={acceptJob}>Accept Job</div>
                <div className="declineJobButton" onClick={declineJob}>Decline Job</div>
            </div>
            
        </div>
    )
    
}


export default JobContainer