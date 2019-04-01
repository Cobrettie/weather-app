window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/50146111b724c5f42c1206ee8e0de422/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data); // Logs the information into the console
                    const {
                        temperature, // pulling temperature and summary from darksky API
                        summary
                    } = data.currently;

                    // Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                })
        })
    } else {
        /* else statement, that displays when the user does not allow location to be known */
        h1.textContent = "In order to correctly display the weather in your area, we need to determine your location."
    }
});