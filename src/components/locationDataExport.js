const dataList = [
    { ID:1, longitude: 10.1234, latitude: 20.5678 },
    { ID: 2, longitude: 30.9876, latitude: 40.4321 },
    { ID: 3, longitude: 50.2468, latitude: 60.1357 },
    { ID: 4, longitude: 70.9876, latitude: 80.2468 },
    { ID: 5, longitude: 90.6543, latitude: 100.9876 }
]

function createMarkers (data) {
    data.forEach(entry => {
        const {ID, longitude, latitude} = entry;
        console.log(`ID: ${ID}, Longitude: ${longitude}, Latitude: ${latitude}`)
    })
}



export default createMarkers