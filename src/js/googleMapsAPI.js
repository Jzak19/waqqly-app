

async function getLatLng(address) {
    console.log("RECIEVED ADDRESS " + address)
    const apiKey = 'AIzaSyAj76ZZ1LFaj3k5my3MMKSd2lmd9zaYKOs'; // Replace 'YOUR_API_KEY' with your actual API key

    try {
        console.log("LOADED ADDRESS " + address)
        const response = await fetch('http://localhost:5000/coordinates', {
            method: 'POST',
            headers: {  
              'Content-Type': 'no-cors'
            },
            body: address
          }).then(response => response.json())
          .then(data => {
            console.log("DATA fetched from API" + data); 
            return data
          })
          .catch(error => {
            console.error('Error:', error);
          });

          console.log("RESPONSE: " + response)
          return response
    } catch (error) {
        console.log("Error fetching data:", error);
        return null;
    }
}

export default getLatLng