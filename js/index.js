document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//que "bienvenido, miPerfil" sea un enlace a my-profile.html
const miPerfilBtn = document.getElementById('miPerfil');

//creo evento click
miPerfilBtn.addEventListener('click', function() {
  //lleva a pagina de tu perfil
  window.location.href = 'my-profile.html';
});

//desde el menu de cerrar sesión, crea un enlace a login.html
const cerrarSesion = document.getElementById('cerrarSesion');

//creo un evento click


/* Aca hay problema, porque ya no tenemos un boton cerrar sesion */
/* cerrarSesionBtn.addEventListener('click', function()

{
    window.location.href = 'login.html';
}); */


