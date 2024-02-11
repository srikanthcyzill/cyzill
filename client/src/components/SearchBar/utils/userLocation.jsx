// Helper method for getLocation() that grabs the user's current position
async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Grabs and returns the user's current location as an object with lat and lng properties
export async function getLocation() {
    try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        return { lat: latitude, lng: longitude };
    } catch (error) {
        // Set default location to Hyderabad, India
        return { lat: 17.3850, lng: 78.4867 };
    }
}

export async function getUserCity(coordinates) {
    const { lat, lng } = coordinates;
    const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
        // Look for the city in the address_components array
        const addressComponents = data.results[0].address_components;
        return addressComponents[3].long_name + ", " + addressComponents[5].short_name;
    }

    // If no city is found, return null
    return null;
}
