function setProductID(id) {
    localStorage.setItem("productID", id); // Guarda el ID del producto en localStorage
    window.location = "product-info.html"; // Redirige a la página de información del producto
}



// Definición de constantes para los criterios de ordenamiento
const ORDER_ASC_BY_NAME = "AZ";  
const ORDER_DESC_BY_NAME = "ZA"; 
const ORDER_BY_PROD_COUNT = "Cant."; // Ordenar por cantidad vendida

// Variables globales para manejar el estado
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

// Función para ordenar productos según el criterio seleccionado
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        // Ordena por nombre ascendente
        result = array.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === ORDER_DESC_BY_NAME) {
        // Ordena por nombre descendente
        result = array.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        // Ordena por cantidad vendida
        result = array.sort((a, b) => b.soldCount - a.soldCount);
    }
    return result;
}
// Función para mostrar productos en la página
function showProducts(searchTerm = "") {
    let htmlContentToAppend = "";
    for (let product of currentProductsArray) {
        if ((minPrice === undefined || product.cost >= minPrice) &&
            (maxPrice === undefined || product.cost <= maxPrice)) {
            // Filtrar productos por nombre o descripción DESAFIATE
            if (product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)) {
                htmlContentToAppend += `
                <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${product.image}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                                <small class="">${product.soldCount} vendidos</small>
                            </div>
                            <p class="mb-1">${product.description}</p>
                        </div>
                    </div>
                </div>`;
            }
        }
    }
    document.getElementById("product-list").innerHTML = htmlContentToAppend;
}

// Función para obtener los datos de productos desde la API
function fetchProducts(CatID) {
    const url = `https://japceibal.github.io/emercado-api/cats_products/${CatID}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            currentProductsArray = data.products;
            showProducts(); // Mostrar productos iniciales
        });
}

// Función para establecer el ID del producto en el localStorage y redirigir a la página de información del producto
function setProductID(id) {
    localStorage.setItem("id", id);
    window.location = "product-info.html";
}

// Manejo de eventos al cargar la página PARTE 1 SOFI
document.addEventListener("DOMContentLoaded", () => {
    let categoryId = localStorage.getItem('catID');

    if (!categoryId) {
        categoryId = 101; // Usar 101 como predeterminado si no hay ID en el localStorage
        console.warn('No se encontró un categoryId en localStorage. Usando el ID 101 por defecto.');
    }

    fetchProducts(categoryId);
});

// Manejo de eventos de los botones de orden PARTE 2 PAU
document.getElementById('sortAsc').addEventListener('click', () => {
    currentSortCriteria = ORDER_ASC_BY_NAME;
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

document.getElementById('sortDesc').addEventListener('click', () => {
    currentSortCriteria = ORDER_DESC_BY_NAME;
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

document.getElementById('sortByCount').addEventListener('click', () => {
    currentSortCriteria = ORDER_BY_PROD_COUNT;
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

// Manejo de eventos para el filtrado por precio
document.getElementById('rangeFilterCount').addEventListener('click', () => {
    minPrice = parseFloat(document.getElementById('rangeFilterCountMin').value) || undefined;
    maxPrice = parseFloat(document.getElementById('rangeFilterCountMax').value) || undefined;
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

document.getElementById('clearRangeFilter').addEventListener('click', () => {
    minPrice = undefined;
    maxPrice = undefined;
    document.getElementById('rangeFilterCountMin').value = '';
    document.getElementById('rangeFilterCountMax').value = '';
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

// Manejo de eventos para la búsqueda de productos DESAFIATE 
document.getElementById('searchInput').addEventListener('input', () => {
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});


//que "bienvenido, miPerfil" sea un enlace a my-profile.html
const miPerfilBtn = document.getElementById('miPerfil');

//creo evento click
miPerfilBtn.addEventListener('click', function() {
  //lleva a pagina de tu perfil
  window.location.href = 'my-profile.html';
});
