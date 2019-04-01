window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");



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
                        summary,
                        icon
                    } = data.currently;

                    // Set DOM Elements from the API
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // Formula for Celsius from Farenheit
                    let celsius = (temperature - 32) * (5 / 9);

                    // Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    // Change termperature to Celsius from Farennheit onClick
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "Farenheit") {
                            temperatureSpan.textContent = "Celsius";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "Farenheit";
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    })
                });
        });
    } else {
        /* else statement, that displays when the user does not allow location to be known */
        h1.textContent = "In order to correctly display the weather in your area, we need to determine your location."
    }

    // define function, add icon and iconID
    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});