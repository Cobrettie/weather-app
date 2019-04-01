window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.darksky.net/forecast/50146111b724c5f42c1206ee8e0de422/${lat},${long}`;
        })
    } else {
        /* else statement, that displays when the user does not allow location to be known */
        h1.textContent = "In order to correctly display the weather in your area, we need to determine your location."
    }
});