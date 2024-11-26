function getLocationAndSubmit() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(processPosition, showError);
    } else {
        alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
}

function processPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Utilisation de l'API OpenStreetMap Nominatim pour le géocodage (gratuit)
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            const address = data.display_name || "Adresse non disponible";
            document.getElementById("address").value = address;

            // Soumettre le formulaire après avoir rempli l'adresse
            document.getElementById("contactForm").submit();
        })
        .catch(error => {
            console.error("Erreur lors de la récupération de l'adresse:", error);
            alert("Impossible de récupérer l'adresse.");
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("L'utilisateur a refusé la demande de géolocalisation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Les informations de localisation ne sont pas disponibles.");
            break;
        case error.TIMEOUT:
            alert("La demande de localisation a expiré.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Une erreur inconnue s'est produite.");
            break;
    }
}
