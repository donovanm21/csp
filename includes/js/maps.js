// Initialize and add the map
function initMap() {
    // The location of Cape Town
    const capetown = { lat: -33.9249, lng: 18.4241 };
    // The map, centered at Cape Town
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: capetown,
    });
    // The marker, positioned at Cape Town
    const marker = new google.maps.Marker({
      position: capetown,
      map: map,
    });
}