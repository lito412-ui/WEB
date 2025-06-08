/*
 * Mejoras para el menú lateral y buscador de EXAMIS SLUS
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mejorar la funcionalidad del menú lateral para que pueda cerrarse
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main');
    
    // Añadir botón de cierre explícito al menú
    const closeButton = document.createElement('a');
    closeButton.href = '#';
    closeButton.className = 'close-button';
    closeButton.innerHTML = '<i class="fa fa-times"></i> Cerrar menú';
    closeButton.style.display = 'block';
    closeButton.style.padding = '10px 15px';
    closeButton.style.margin = '10px 0';
    closeButton.style.textAlign = 'center';
    closeButton.style.background = 'rgba(255, 255, 255, 0.1)';
    closeButton.style.borderRadius = '4px';
    closeButton.style.color = 'white';
    closeButton.style.fontWeight = 'bold';
    
    // Insertar el botón al principio del menú
    const menuElement = document.getElementById('menu');
    if (menuElement) {
        menuElement.insertBefore(closeButton, menuElement.firstChild);
    }
    
    // Evento para cerrar el menú al hacer clic en el botón
    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.add('inactive');
    });
    
    // Cerrar menú al hacer clic en el contenido principal en móviles
    mainContent.addEventListener('click', function() {
        if (window.innerWidth <= 980) { // Tamaño medio según breakpoints
            sidebar.classList.add('inactive');
        }
    });
    
    // Mejorar la funcionalidad del buscador
    enhanceSearchFunctionality();
});

// Función para mejorar el buscador
function enhanceSearchFunctionality() {
    // Ampliar el array de resultados de búsqueda con todas las páginas y secciones
    const expandedSearchResults = [
        { text: "Inicio", url: "index.html" },
        { text: "Sobre Nosotros", url: "generic.html" },
        { text: "Ganado", url: "ganado.html" },
        { text: "Terrenos", url: "terrenos.html" },
        { text: "Comercio", url: "comercio.html" },
        { text: "Productos", url: "productos.html" },
        { text: "Servicios", url: "servicios.html" },
        { text: "Visitas", url: "visitas.html" },
        { text: "Aceite de Oliva", url: "productos.html#aceite" },
        { text: "Quesos Artesanales", url: "productos.html#quesos" },
        { text: "Leche Fresca", url: "productos.html#leche" },
        { text: "Asesoramiento Técnico", url: "servicios.html#asesoramiento" },
        { text: "Formación", url: "servicios.html#formacion" },
        { text: "Alquiler de Maquinaria", url: "servicios.html#maquinaria" },
        { text: "Visitas Familiares", url: "visitas.html#familiares" },
        { text: "Visitas Educativas", url: "visitas.html#educativas" },
        { text: "Visitas Técnicas", url: "visitas.html#tecnicas" },
        { text: "Contacto", url: "index.html#contacto" },
        { text: "Ubicación", url: "index.html#mapa" },
        { text: "Finca", url: "terrenos.html" },
        { text: "Agricultura Sostenible", url: "generic.html#sostenibilidad" },
        { text: "Innovación", url: "generic.html#innovacion" }
    ];
    
    // Reemplazar la función original de búsqueda
    window.searchSuggestions = function() {
        let input = document.getElementById('query').value;
        let suggestionsBox = document.getElementById('suggestions');
        
        // Limpiar las sugerencias anteriores
        suggestionsBox.innerHTML = "";
        
        if (input.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }
        
        // Filtrar los resultados que coinciden con lo escrito
        let filteredResults = expandedSearchResults.filter(item => 
            item.text.toLowerCase().includes(input.toLowerCase())
        );
        
        // Mostrar las sugerencias si hay resultados
        if (filteredResults.length > 0) {
            suggestionsBox.style.display = "block";
            
            filteredResults.forEach(result => {
                let div = document.createElement('div');
                div.classList.add('suggestion-item');
                div.textContent = result.text;
                div.onclick = () => {
                    window.location.href = result.url;
                };
                suggestionsBox.appendChild(div);
            });
        } else {
            suggestionsBox.style.display = "none";
        }
    };
    
    // Cerrar sugerencias al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#search')) {
            document.getElementById('suggestions').style.display = "none";
        }
    });
    
    // Estilizar el cuadro de sugerencias
    const suggestionsBox = document.getElementById('suggestions');
    if (suggestionsBox) {
        suggestionsBox.style.position = "absolute";
        suggestionsBox.style.width = "100%";
        suggestionsBox.style.zIndex = "1000";
        suggestionsBox.style.display = "none";
    }
}
