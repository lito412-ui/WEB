function initMap() {
    var location = { lat: 36.6775, lng: -5.6969 };  // Reemplaza por tus coordenadas
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
// Array con las opciones disponibles para la búsqueda
const searchResults = [
    "Ganado",
    "Terrenos",
    "Contacto",
    "Servicios",
    "Visita",
    "Cita",
    "Información",
    "Sobre Nosotros",   
    "Comercio"
];

// Función para filtrar los resultados a medida que se escribe
function searchSuggestions() {
    let input = document.getElementById('query').value;
    let suggestionsBox = document.getElementById('suggestions');

    // Limpiar las sugerencias anteriores
    suggestionsBox.innerHTML = "";

    if (input.length === 0) return;

    // Filtrar los resultados que coinciden con lo escrito
    let filteredResults = searchResults.filter(result => result.toLowerCase().includes(input.toLowerCase()));

    // Mostrar las sugerencias si hay resultados
    filteredResults.forEach(result => {
        let div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = result;
        div.onclick = () => {
            document.getElementById('query').value = result;
            suggestionsBox.innerHTML = ''; // Limpiar las sugerencias al seleccionar uno
        };
        suggestionsBox.appendChild(div);
    });
}