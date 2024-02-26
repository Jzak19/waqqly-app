

async function getLatLng(address) {

    const apiKey = 'AIzaSyAj76ZZ1LFaj3k5my3MMKSd2lmd9zaYKOs'; // Replace 'YOUR_API_KEY' with your actual API key

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
                

            return [lat, lng]
        } else {
            console.log("Unable to geocode address.");
            return null;
        }
    } catch (error) {
        console.log("Error fetching data:", error);
        return null;
    }
}

export default getLatLng